<?php
$error = ""; // Initialize an error message variable

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the form data
    $firstName = trim($_POST["firstName"]);
    $lastName = trim($_POST["lastName"]);
    $address = trim($_POST["address"]);
    $phoneNumber = trim($_POST["phoneNumber"]);
    $email = trim($_POST["email"]);
    $username = trim($_POST["username"]);
    $password = trim($_POST["password"]);

    // Hash the password before storing it
    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

    // Database connection
    $conn = new mysqli("localhost", "root", "", "form_data");

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Check if the phone number, email, or username already exists
    $stmt = $conn->prepare("SELECT username, email, phone_number FROM user_info WHERE username = ? OR email = ? OR phone_number = ?");
    $stmt->bind_param("sss", $username, $email, $phoneNumber);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $error = "Username, Email, or Phone Number already exists. Please choose a different one.";
    } else {
        // Prepare and bind to insert the new user
        $stmt = $conn->prepare("INSERT INTO user_info (first_name, last_name, address, phone_number, email, username, password) VALUES (?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("sssssss", $firstName, $lastName, $address, $phoneNumber, $email, $username, $hashedPassword);

        // Execute the query
        if ($stmt->execute()) {
            // Redirect to a success page
            header("Location: success.html");
            exit();
        } else {
            $error = "Error: " . $stmt->error;
        }
    }

    // Close the prepared statement and connection
    $stmt->close();
    $conn->close();
}
?>
