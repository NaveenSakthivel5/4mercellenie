<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Allow cross-origin requests (optional if needed)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    echo "POST request received.\n";

    // Print the received data for debugging
    if (!empty($_POST)) {
        echo "Form data:\n";
        print_r($_POST);  // Display the form data
    } else {
        echo "No POST data received.";
    }
} else {
    echo "Invalid Request Method. Expected POST, but got {$_SERVER["REQUEST_METHOD"]}.";
}
?>
