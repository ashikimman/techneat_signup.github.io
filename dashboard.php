<?php
session_start();

// Check if the user is logged in
if (!isset($_SESSION['username'])) {
    header("Location: dashboard.html");
    exit();
}

echo "Welcome, " . $_SESSION['username'] . "! You are logged in.";
// Here, you can add further content for the dashboard.
?>