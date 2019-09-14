$(document).ready(function () {
    $("#workpage").hide();
    $("#register").hide();
    $("#uncorect").hide();
});
URL = "http://localhost:5000";

function showRegister() {
    $("#register").show();
    $("#login").hide();
}
function showLogin() {
    $("#login").show();
    $("#register").hide();
}
function doRegistration() {
    //TODO
    showLogin();
}
function doLogin() {
    login = $("#login_log").val();
    pass = $("#login_pass").val();
    if(login=="" || pass=="") {
        $("#uncorect").show();
        return;
    }
    //TODO
    $("#loginpage").hide();
    $("#workpage").show();
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
        alert("Data: " + data + "\nStatus: " + status);
    });
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