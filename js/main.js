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
}
function showLogin() {
    $("#login").show();
    $("#register").hide();
}
function doRegistration() {
    var login = $("#reg_log").val();
    var pass = $("#reg_pass").val();
    var cpass = $("#reg_conf").val();
    if(pass!=cpass)
        return;
    var name = $("#reg_name").val();
    var surname = $("#reg_last").val();
    var gmail = $("#reg_email").val();
    $.post("http://localhost:8080/user", {login: login, pass: pass, name: name, surname: surname,
        gmail: gmail}, function (data, status){
        if(status!="200"){
            alert("Something is wrong. Try again!");
            return;
        }
        showLogin();
    });
}
function doLogin() {
    var login = $("#login_log").val();
    var pass = $("#login_pass").val();
    if(login=="" || pass=="") {
        $("#uncorect").show();
        return;
    }
    $.post("http://localhost:8080/user", {login: login, pass: pass}, function (data, status){
        if(status!="200"){
            $("#login_pass").val("");
            $("#uncorect").show();
            return;
        }
        $("#loginpage").hide();
        $("#workpage").show();
        document.cookie['login'] = login;
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
    $.post(URL, {start: start, end: end}, function (data, status) {
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
    showLogin();
}

$("#max").keyup(function () {
    $("#max").css('background-color','transparent');
});
$("#min").keyup(function () {
    $("#min").css('background-color','transparent');
});
$("#login_log").keyup(function () {
    $("#uncorect").hide();
});
$("#login_pass").keyup(function () {
    $("#uncorect").hide();
});
$("#reg_conf").keyup(function () {
    pass = $("#reg_pass").val();
    conf = $("#reg_conf").val();
    if(pass==conf)
        $("#reg_conf").css('background-color','transparent');
    else
        $("#reg_conf").css('background-color','#fabfc4');
});
$("#reg_pass").keyup(function () {
    pass = $("#reg_pass").val();
    conf = $("#reg_conf").val();
    if(conf=="") return;
    if(pass==conf)
        $("#reg_conf").css('background-color','transparent');
    else
        $("#reg_conf").css('background-color','#fabfc4');
});