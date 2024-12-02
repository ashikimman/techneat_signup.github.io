<?php
// Database configuration
$host = 'localhost';
$db = 'form_data';
$user = 'root';
$pass = ''; // Replace with your MySQL password

// Create connection
$conn = new mysqli($host, $user, $pass, $db);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if form is submitted
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = $conn->real_escape_string($_POST['username']);
    $password = md5($_POST['password']); // Password should match MD5 encryption in the database

    // Fetch user data
    $sql = "SELECT * FROM user_info WHERE username='$username' AND password='$password'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // Fetch user details
        $row = $result->fetch_assoc();
    } else {
        echo "Invalid username or password.";
        exit;
    }
} else {
    echo "Unauthorized access!";
    exit;
}
?>