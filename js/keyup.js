$("#reg_log").keyup(function () {
    $("#reg_log").css('background-color', 'transparent');
});
$("#reg_name").keyup(function () {
    closeErrAlert();
    var name = $("#reg_name").val();
    if (!validName(name)) {
        showWarningErr("<strong>Advise! </strong>Real name and surname can't contains number or characters!");
        return;
    }
    $("#reg_name").css('background-color', 'transparent');
});
$("#reg_last").keyup(function () {
    closeErrAlert();
    var name = $("#reg_last").val();
    if (!validName(name)) {
        showWarningErr("<strong>Advise! </strong>Real name and surname can't contains number or characters!");
        $("#reg_last").css('background-color', '#fadfcc');
        return;
    }
    $("#reg_last").css('background-color', 'transparent');
});

$("#reg_email").keyup(function () {
    $("#reg_email").css('background-color', 'transparent');
    closeErrAlert();
});
$("#max").keyup(function () {
    $("#max").css('background-color', 'transparent');
});
$("#min").keyup(function () {
    $("#min").css('background-color', 'transparent');
});

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
    if (pass == conf)
        $("#reg_conf").css('background-color', 'transparent');
    else
        $("#reg_conf").css('background-color', '#fabfc4');
});
$("#reg_pass").keyup(function () {
    closeErrAlert();
    pass = $("#reg_pass").val();
    conf = $("#reg_conf").val();
    if (!validPass(pass)) {
        showWarningErr("<strong>Advise! </strong>Good password should have at least 8 characters, one Uppercase letter and a symbol!");
        $("#reg_pass").css('background-color', '#fadfcc');
    } else {
        $("#reg_pass").css('background-color', '#dffae3');
    }
    if (conf == "") return;
    if (pass == conf)
        $("#reg_conf").css('background-color', 'transparent');
    else
        $("#reg_conf").css('background-color', '#fabfc4');
});