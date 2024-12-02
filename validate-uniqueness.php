<?php
// validate-uniqueness.php

// Simulating the validation logic (replace with actual validation logic)
if (isset($_GET['field']) && isset($_GET['value'])) {
    $field = $_GET['field'];
    $value = $_GET['value'];

    // Example logic (replace with actual check against database)
    $existingValues = ['test@example.com', 'user123']; // Replace with real data

    $response = [
        'unique' => !in_array($value, $existingValues)
    ];

    // Send a JSON response
    header('Content-Type: application/json');
    echo json_encode($response);
    exit;
} else {
    // If parameters are missing, return an error
    header("HTTP/1.1 400 Bad Request");
    echo json_encode(['error' => 'Invalid request']);
    exit;
}
