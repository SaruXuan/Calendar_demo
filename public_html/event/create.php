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

//data validation
//title
if (empty($_POST['title'])) {
    //error
    new HttpStatusCode(400, 'Title should not be blank');//create http status object and do things in constructor
}
//time range
//parse 10:15 into [10,15]
$startTime = explode(':', $_POST['start_time']);
$endTime = explode(':', $_POST['end_time']);
if ($startTime[0]>$endTime[0] || ($startTime[0]==$endTime[0] && $startTime[1]>$endTime[1])) {
    //error
    new HttpStatusCode(400, 'Time range error');//create http status object and do things in constructor 
}


//Prepare SQL command template
$sql = 'INSERT INTO `events` (`title`, `year`, `month`, `date`, `start_time`, `end_time`, `description`, `done`)
VALUES (:title, :year, :month, :date, :start_time, :end_time, :description, :done)';

$statement = $pdo->prepare($sql);
$statement->bindValue(':title', $_POST['title'], PDO::PARAM_STR);
$statement->bindValue(':year', $_POST['year'], PDO::PARAM_INT);
$statement->bindValue(':month', $_POST['month'], PDO::PARAM_INT);
$statement->bindValue(':date', $_POST['date'], PDO::PARAM_INT);
$statement->bindValue(':start_time', $_POST['start_time'], PDO::PARAM_STR);//10:00
$statement->bindValue(':end_time', $_POST['end_time'], PDO::PARAM_STR);
$statement->bindValue(':description', $_POST['description'], PDO::PARAM_STR);
$statement->bindValue(':done', 0, PDO::PARAM_INT);
//Auto Increment so no need to insert id

if ($statement->execute()) {
    $id = $pdo->lastInsertId();
    $sql = 'SELECT `title`, `start_time`, `id`, `done` FROM `events` WHERE `id`=:id';
    $statement = $pdo->prepare($sql);
    $statement->bindValue(':id', $id, PDO::PARAM_INT);
    $statement->execute();
    $event = $statement->fetch(PDO::FETCH_ASSOC);//return the array of the latest entity from query

    $event['start_time']= substr($event['start_time'], 0, 5); //trim the sec, e.g. 10:10:00 -> 10:10

    echo json_encode($event);//frontend jquery needs to read json
}