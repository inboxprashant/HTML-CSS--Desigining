<?php

//process.php
if ($_SERVER["REQUEST_METHOD"] == "POST") {//Check it is comming from a form

	$user_name = filter_var($_POST["user_name"], FILTER_SANITIZE_STRING); //set PHP variables like this so we can use them anywhere in code below
	$user_email = filter_var($_POST["user_email"], FILTER_SANITIZE_EMAIL);
	$user_message = filter_var($_POST["user_message"], FILTER_SANITIZE_STRING);

	if (empty($user_name)){
		die("Please enter your name");
	}
	if (empty($user_email) || !filter_var($u_email, FILTER_VALIDATE_EMAIL)){
		die("Please enter valid email address");
	}
		
	if (empty($user_message)){
		die("Please enter text");
	}	
	
	//print output text
	print "Hello " . $user_name . "!, we have received your message and email ". $user_email;
	print "We will contact you very soon!";
}
//Open a new connection to the MySQL server
	//see https://www.sanwebe.com/2013/03/basic-php-mysqli-usage for more info
	$mysqli = new mysqli('localhost', 'root','', 'details');
	
	//Output any connection error
	if ($mysqli->connect_error) {
		die('Error : ('. $mysqli->connect_errno .') '. $mysqli->connect_error);
	}	
	
	$statement = $mysqli->prepare("INSERT INTO  details (user_name, user_email, user_message) VALUES(?, ?, ?)"); //prepare sql insert query
	//bind parameters for markers, where (s = string, i = integer, d = double,  b = blob)
	$statement->bind_param('sss', $user_name, $user_email, $user_message); //bind values and execute insert query
	
	if($statement->execute()){
		print "Hello !, your message has been saved!";
	}else{
	print $mysqli->error; //show mysql error if any
	}

?>