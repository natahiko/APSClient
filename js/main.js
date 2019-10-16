$(document).ready(function () {
    $("#workpage").hide();
    $("#register").hide();
    $("#uncorect").hide();
    $("#randomer").hide();
    $("#randomPict").hide();
});
URL = "http://localhost:8080/";

function showRegister() {
    $("#register").show();
    $("#login").hide();
    closeErrAlert();
}

function showLogin() {
    $("#login").show();
    $("#register").hide();
    closeErrAlert();
}

function doRegistration() {
    var login = $("#reg_log").val();
    if (login == "") {
        $("#reg_log").css('background-color', '#fabfc4');
        return;
    }
    var pass = $("#reg_pass").val();
    var cpass = $("#reg_conf").val();
    if (pass == "" || cpass == "") {
        $("#uncorect").show();
        $("#uncorect").html("Plese enter all fields!");
        return;
    }
    var name = $("#reg_name").val();
    if (name == "" || !validName(name)) {
        $("#reg_name").css('background-color', '#fabfc4');
        return;
    }
    var surname = $("#reg_last").val();
    if (surname == "") {
        $("#reg_last").css('background-color', '#fabfc4');
        return;
    }
    var gmail = $("#reg_email").val();
    if (gmail == "") {
        $("#reg_email").css('background-color', '#fabfc4');
        return;
    }
    if (!validate(gmail)) {
        return;
    }
    if (pass != cpass || !validPass(pass))
        return;
    $.ajax(URL + 'register', {
        'data': "{\"username\":\"" + login + "\", \"password\":\"" + pass + "\", \"name\":\"" + name + "\", \"surname\":\"" + surname + "\", \"email\":\"" + gmail + "\"}",
        'type': 'POST',
        'dataType': 'json',
        'processData': false,
        'contentType': 'application/json',
        'mimeType': 'application/json',
        success: function (data, status) {
            if (status == "success") {
                showLogin();
                showSucceessErr("You registered success. Login to start!");
            }
        },
        error: function (data) {
            $("#uncorect").html("<strong>Warning!</strong> User with such login already exist!");
            $("#uncorect").show();
        }
    });
}

function doLogin() {
    var login = $("#login_log").val();
    var pass = $("#login_pass").val();
    if (login == "" || pass == "") {
        $("#uncorect").show();
        $("#uncorect").html("<strong>Warning!</strong> Uncorect login or password");
        return;
    }
    var data = JSON.stringify({username: login, password: pass});
    $.ajax(URL + 'login', {
        'data': "{\"username\":\"" + login + "\", \"password\":\"" + pass + "\"}",
        'type': 'POST',
        'dataType': 'json',
        'processData': false,
        'contentType': 'application/json',
        'mimeType': 'application/json',
        success: function (data, status) {
            if (status == "success") {
                set_cookie("username", login);
                $("#workpage").show();
                $("#randomer").hide();
                $("#loginpage").hide();
                $("#login_log").val("");
                $("#login_pass").val("");
            }
        },
        error: function (data, status) {
            $("#uncorect").show();
            $("#uncorect").html("<strong>Warning!</strong> Uncorect login or password");
            $("#login_pass").val("");
        }
    });
}

function sendRandomRequest() {
    start = $("#min").val();
    end = $("#max").val();
    if (start == "") {
        $("#min").css('background-color', '#fabfc4');
        return;
    }
    if (end == "") {
        $("#max").css('background-color', '#fabfc4');
        return;
    }
    if(end-start>1000)
        $("#randomer").hide();
    $("#randomPict").show();
    $.ajax({
        url: URL+'random?start='+start+'&end='+end+'&username='+get_cookie("username"),
        type: "POST",
        timeout: 3000,
        success: function(data) {
            $("#randomer").empty();
            $("#randomer").text(data);
            $("#randomPict").hide();
            $("#randomer").show();
        },
        error: function(err) {
                alert(err["error"]);
        }
    });
    /*
    $.post(URL+'random', {start: start, end: end, username: get_cookie("username")}, function (data, status) {
        if (status != "success") {
            alert("There are some problems happens! Please, try again");
            $("#randomer").hide();
            return;
        }
        let array = JSON.parse("[" + data + "]");
        $("#randomer").show();
        $("#randomer").empty();
        for (let i = 0; i < array.length; i++) {
            $("#randomer").append("<option>" + array[i] + "</option>")
        }
    });*/
}

function logout() {
    $("#workpage").hide();
    $("#randomer").hide();
    $("#loginpage").show();
    delete_cookie("username");
    showLogin();
}

function showWarningErr(mess) {
    $("#uncorect").show();
    $("#uncorect").removeClass("alert-danger");
    $("#uncorect").addClass("alert-warning");
    $("#uncorect").html(mess);
}

function closeErrAlert() {
    $("#uncorect").hide();
    $("#uncorect").removeClass("alert-success");
    $("#uncorect").removeClass("alert-warning");
    $("#uncorect").addClass("alert-danger");
}

function showSucceessErr(mess) {
    $("#uncorect").show();
    $("#uncorect").html(mess);
    $("#uncorect").removeClass("alert-danger");
    $("#uncorect").addClass("alert-success");
}


function showAllUsers() {
    $.get(URL+'getAllUsers', function (data, status) {
        $("#modal_title").html("All users of our system");
        if(data.length==0){
            $("#allUserInfo").html("Users not finded!");
            $("#myModal").modal("show");
            return;
        }
        $("#allUserInfo").html("");
        for(let i=0; i<data.length; i++){
            $("#allUserInfo").append("<div class='oneuserInall'><p><span class='login'>"+data[i]["username"]+"</span> (<span class='name'>"+data[i]["name"]+" "+data[i]["surname"]+"</span>)</p>" +
                "<p class='gmail'>"+data[i]["email"]+"</p><hr></div>");
        }
        $("#myModal").modal("show");
    });
}
function getAllRequests() {
    $.get(URL+'getAllRequests', {username: get_cookie("username")}, function (data, status) {
        $("#modal_title").html("Your last requests, "+get_cookie("username")+": ");
        if(data.length==0){
            $("#allUserInfo").html("This User has no requests!");
            $("#myModal").modal("show");
            return;
        }
        $("#allUserInfo").html("<table class='requestTable'>");
        $("#allUserInfo").append("<tr><th>Min: </th><th>Max: </th><th>Amount: </th><th>Date: </th></tr>");
        for(let i=0; i<data.length; i++){
            //TODO
            data[i]["amount"] = data[i]["end"] - data[i]["start"];
            data[i]["date"] = "23.03.2000";
            $("#allUserInfo").append("<tr><td>"+data[i]["start"]+"</td><td>"+data[i]["end"]+"</td>" +
                "<td>"+data[i]["amount"]+"</td><td>"+data[i]["date"]+"</td></tr>");
        }

        $("#allUserInfo").append("</table>");
        $("#myModal").modal("show");
    });
}

