<?php
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
$sql = 'DELETE FROM `events` WHERE id=:id';

$statement = $pdo->prepare($sql);
$statement->bindValue(':id', $_POST['id'], PDO::PARAM_INT);
$statement->execute();
?>