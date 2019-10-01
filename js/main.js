$(document).ready(function () {
    $("#workpage").hide();
    $("#register").hide();
    $("#uncorect").hide();
    $("#randomer").hide();
});
URL = "http://localhost:8080/random";

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
    if(login==""){
        $("#reg_log").css('background-color','#fabfc4');
        return;
    }
    var pass = $("#reg_pass").val();
    var cpass = $("#reg_conf").val();
    if(pass=="" || cpass==""){
        $("#uncorect").show();
        $("#uncorect").html("Plese enter all fields!");
        return;
    }
    var name = $("#reg_name").val();
    if(name=="" || !validateName(name)){
        $("#reg_name").css('background-color','#fabfc4');
        return;
    }
    var surname = $("#reg_last").val();
    if(surname==""){
        $("#reg_last").css('background-color','#fabfc4');
        return;
    }
    var gmail = $("#reg_email").val();
    if(gmail==""){
        $("#reg_email").css('background-color','#fabfc4');
        return;
    }
    if(!validate(gmail)){
        return;
    }
    if(pass!=cpass || !validPass(pass))
        return;
    $.ajax('http://localhost:8080/register',{
        'data': "{\"username\":\""+login+"\", \"password\":\""+pass+"\", \"name\":\""+name+"\", \"surname\":\""+surname+"\", \"email\":\""+gmail+"\"}",
        'type': 'POST',
        'dataType': 'json',
        'processData': false,
        'contentType': 'application/json',
        'mimeType': 'application/json',
        success: function (data, status) {
            if(status=="success"){
                showLogin();
                $("#uncorect").show();
                $("#uncorect").html("You registered success. Login to start!");
                $("#uncorect").removeClass("alert-danger");
                $("#uncorect").addClass("alert-success");
            }
        },
        error:function (data, status) {
            $("#uncorect").show();
            $("#uncorect_text").html("<strong>Warning!</strong> User with such login already exist! Or another mistake happens");
        }
    });
}
function doLogin() {
    var login = $("#login_log").val();
    var pass = $("#login_pass").val();
    if(login=="" || pass=="") {
        $("#uncorect").show();
        $("#uncorect_text").html("<strong>Warning!</strong> Uncorect login or password");
        return;
    }
    var data = JSON.stringify({username: login, password: pass});
    $.ajax('http://localhost:8080/login',{
        'data': "{\"username\":\""+login+"\", \"password\":\""+pass+"\"}",
        'type': 'POST',
        'dataType': 'json',
        'processData': false,
        'contentType': 'application/json',
        'mimeType': 'application/json',
        success: function (data, status) {
            if(status=="success"){
                set_cookie("username",login);
                $("#workpage").show();
                $("#randomer").hide();
                $("#loginpage").hide();
                $("#login_log").val("");
                $("#login_pass").val("");
            }
        },
        error:function (data, status) {
            $("#uncorect").show();
            $("#uncorect_text").html("<strong>Warning!</strong> Uncorect login or password");
            $("#login_pass").val("");
        }
    });
}
function sendRandomRequest() {
    start = $("#min").val();
    end = $("#max").val();
    if(start=="") {
        $("#min").css('background-color', '#fabfc4');
        return;
    }
    if(end=="") {
        $("#max").css('background-color', '#fabfc4');
        return;
    }
    $.post(URL, {start: start, end: end, username: get_cookie("username")}, function (data, status) {
        if(status!="success") {
            alert("There are some problems happens! Please, try again");
            $("#randomer").hide();
            return;
        }
        let array = JSON.parse("["+data+"]");
        $("#randomer").show();
        $("#randomer").empty();
        for(let i=0; i<array.length; i++) {
            $("#randomer").append("<option>"+array[i]+"</option>")
        }
    });
}

function logout(){
    $("#workpage").hide();
    $("#randomer").hide();
    $("#loginpage").show();
    delete_cookie("username");
    showLogin();
}
$("#reg_log").keyup(function () {
    $("#reg_log").css('background-color','transparent');
});
$("#reg_name").keyup(function () {
    var name = $("#reg_name").val();
    if(!validName(name)){
        $("#uncorect").show();
        $("#uncorect").removeClass("alert-danger");
        $("#uncorect").addClass("alert-warning");
        $("#uncorect").html("<strong>Advise! </strong>Real name and surname can't contains number or characters!");
        $("#reg_name").css('background-color','#fadfcc');
        return;
    }
    $("#reg_name").css('background-color','transparent');
});
$("#reg_last").keyup(function () {
    var name = $("#reg_last").val();
    if(!validName(name)){
        $("#uncorect").show();
        $("#uncorect").removeClass("alert-danger");
        $("#uncorect").addClass("alert-warning");
        $("#uncorect").html("<strong>Advise! </strong>Real name and surname can't contains number or characters!");
        $("#reg_last").css('background-color','#fadfcc');
        return;
    }
    $("#reg_last").css('background-color','transparent');
});
$("#reg_email").keyup(function () {
    $("#reg_email").css('background-color','transparent');
    closeErrAlert();
});
$("#max").keyup(function () {
    $("#max").css('background-color','transparent');
});
$("#min").keyup(function () {
    $("#min").css('background-color','transparent');
});
function closeErrAlert(){
    $("#uncorect").hide();
    $("#uncorect").removeClass("alert-success");
    $("#uncorect").removeClass("alert-warning");
    $("#uncorect").addClass("alert-danger");
}
$("#login_log").keyup(function () {
    closeErrAlert();
});
$("#login_pass").keyup(function () {
    closeErrAlert();
});
$("#reg_conf").keyup(function () {
    closeErrAlert();
    pass = $("#reg_pass").val();
    conf = $("#reg_conf").val();
    if(pass==conf)
        $("#reg_conf").css('background-color','transparent');
    else
        $("#reg_conf").css('background-color','#fabfc4');
});
$("#reg_pass").keyup(function () {
    closeErrAlert();
    pass = $("#reg_pass").val();
    conf = $("#reg_conf").val();
    if(!validPass(pass)){
        $("#uncorect").show();
        $("#uncorect").removeClass("alert-danger");
        $("#uncorect").addClass("alert-warning");
        $("#uncorect").html("<strong>Advise! </strong>Good password should have at least 8 characters, one Uppercase letter and a symbol!");
        $("#reg_pass").css('background-color','#fadfcc');
    } else{
        $("#reg_pass").css('background-color','#dffae3');
    }
    if(conf=="") return;
    if(pass==conf)
        $("#reg_conf").css('background-color','transparent');
    else
        $("#reg_conf").css('background-color','#fabfc4');
});