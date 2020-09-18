<?php
//for read data from mysql
// include('../db.php');

// try {
//     $pdo = new PDO("mysql:host=$db[host];dbname=$db[dbname];port=$db[port];charset=$db[charset]", $db['username'], $db['password']);
// } catch(PDOException $e) {
//     echo "Database connection failed";
//     exit;
// }

$days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
$dates = [];
for($i = 1; $i <= 31; $i++){
    $dates[] = $i; //this is the push syntax
}
$dates[] = null;
$dates[] = null;
$dates[] = null;
$dates[] = null;
?>