<?php
header('Content-Type: text/html; charset=utf-8');

$login = $_REQUEST["login"];
$pass = $_REQUEST["pass"];
$other = "natahiko";

$result = password_hash($pass, PASSWORD_DEFAULT);
$result = password_hash($result+$login, PASSWORD_DEFAULT);
$result = password_hash($result+$other, PASSWORD_DEFAULT);
$result = password_hash($result, PASSWORD_DEFAULT);
$result = password_hash($result, PASSWORD_DEFAULT);

echo $result;
?>