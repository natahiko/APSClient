function getPassHasg(login, pass) {
    //TODO
    return "hash";
    $.get("./php/getPassHash.php",{login: login, pass: pass}, function (data) {
        return data;
    }) ;
}
