<?php
header('Content-Type: application/json; charset=utf-8');
include('../../db.php');

//Prepare connection to database
try {
    $pdo = new PDO("mysql:host=$db[host];dbname=$db[dbname];port=$db[port];charset=$db[charset]", $db['username'], $db['password']);
} catch(PDOException $e) {
    echo "Database connection failed";
    exit;
}

//Prepare SQL command template
$sql = 'INSERT INTO `events` (`title`, `year`, `month`, `date`, `start_time`, `end_time`, `description`)
VALUES (:title, :year, :month, :date, :start_time, :end_time, :description)';

$statement = $pdo->prepare($sql);
$statement->bindValue(':title', $_POST['title'], PDO::PARAM_STR);
$statement->bindValue(':year', $_POST['year'], PDO::PARAM_INT);
$statement->bindValue(':month', $_POST['month'], PDO::PARAM_INT);
$statement->bindValue(':date', $_POST['date'], PDO::PARAM_INT);
$statement->bindValue(':start_time', $_POST['start_time'], PDO::PARAM_STR);//10:00
$statement->bindValue(':end_time', $_POST['end_time'], PDO::PARAM_STR);
$statement->bindValue(':description', $_POST['description'], PDO::PARAM_STR);
//Auto Increment so no need to insert id

if ($statement->execute()) {
    $id = $pdo->lastInsertId();
    $sql = 'SELECT `title`, `start_time` FROM `events` WHERE `id`=:id';
    $statement = $pdo->prepare($sql);
    $statement->bindValue(':id', $id, PDO::PARAM_INT);
    $statement->execute();
    $event = $statement->fetch(PDO::FETCH_ASSOC);//return the array of the latest entity from query

    $event['start_time']= substr($event['start_time'], 0, 5); //trim the sec, e.g. 10:10:00 -> 10:10

    echo json_encode($event);//frontend jquery needs to read json
}