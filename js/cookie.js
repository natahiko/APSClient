function get_cookie(cookie_name) {
    var results = document.cookie.match('(^|;) ?' + cookie_name + '=([^;]*)(;|$)');

    if (results)
        return (unescape(results[2]));
    else
        return null;
}

function delete_cookie(cookie_name) {
    var cookie_date = new Date();  // Текущая дата и время
    cookie_date.setTime(cookie_date.getTime() - 1);
    document.cookie = cookie_name += "=; expires=" + cookie_date.toGMTString();
}

function set_cookie(name, value, exp_y, exp_m, exp_d, path, domain, secure) {
    var cookie_string = name + "=" + escape(value);

    if (exp_y) {
        var expires = new Date(exp_y, exp_m, exp_d);
        cookie_string += "; expires=" + expires.toGMTString();
    }

    if (path)
        cookie_string += "; path=" + escape(path);

    if (domain)
        cookie_string += "; domain=" + escape(domain);

    if (secure)
        cookie_string += "; secure";

    document.cookie = cookie_string;
}

function validate(email) {
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (reg.test(email) == false) {
        $("#uncorect").show();
        $("#uncorect").html("Uncorrect email. Check it and try again!");
        $("#reg_email").css('background-color', '#fabfc4');
        return false;
    }
    return true;
}

function validPass(pass) {
    if (pass.length < 8)
        return false;
    if (pass == pass.toLowerCase() && pass == pass.toUpperCase())
        return false;
    if (/^[a-zA-Z\u00C0-\u00ff]+$/.test(pass))
        return false;
    return true;
}

function validName(name) {
    if (/^[a-zA-Z\u00C0-\u00ff]+$/.test(name))
        return false;
    return true;
}