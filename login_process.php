<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Connect to database
    $conn = new mysqli('localhost', 'root', '', 'your_database');
    
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $sql = "SELECT * FROM users WHERE username='$username'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        if (password_verify($password, $user['password'])) {
            $_SESSION['username'] = $username;
            header('Location: dashboard.php');
            exit();
        } else {
            echo "Invalid credentials.";
        }
    } else {
        echo "No user found.";
    }

    $conn->close();
}
?>

<!-- login.html included here for the form -->
<?php include('login.html'); ?>
