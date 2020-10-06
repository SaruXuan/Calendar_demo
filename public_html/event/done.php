<?php
header('Content-Type: application/json; charset=utf-8');
include('../../db.php');
include('../HttpStatusCode.php');

//Prepare connection to database
try {
    $pdo = new PDO("mysql:host=$db[host];dbname=$db[dbname];port=$db[port];charset=$db[charset]", $db['username'], $db['password']);
} catch(PDOException $e) {
    echo "Database connection failed";
    exit();
}

//Prepare SQL command template
$sql = 'UPDATE `events` SET `done`=:done WHERE `id`=:id';

$statement = $pdo->prepare($sql);
$statement->bindValue(':done', $_POST['done'],PDO::PARAM_INT);
$statement->bindValue(':id', $_POST['id'],PDO::PARAM_INT);
//Auto Increment so no need to insert id

if ($statement->execute()) {
    $sql = 'SELECT `done`, `id` FROM `events` WHERE `id`=:id';
    $statement = $pdo->prepare($sql);
    $statement->bindValue(':id', $_POST['id'], PDO::PARAM_INT);
    $statement->execute();
    $event = $statement->fetch(PDO::FETCH_ASSOC);//return the array of the latest entity from query

    echo json_encode($event);//frontend jquery needs to read json
}