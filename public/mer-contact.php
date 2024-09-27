<?php
// Allow access from any origin
header("Access-Control-Allow-Origin: *");
// Allow specific methods
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
// Allow specific headers
header("Access-Control-Allow-Headers: Content-Type");

// Your existing PHP code for sending the email
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['user_name'];
    $email = $_POST['user_email'];
    $phone = $_POST['user_phone'];
    $message = $_POST['message'];
    $writingFor = $_POST['writing-us-for'];

    $to = "naveensakthivel.wings@gmail.com";
    $subject = "New Contact Form Submission from $name";
    $body = "
    Name: $name\n
    Email: $email\n
    Phone: $phone\n
    Writing for: $writingFor\n
    Message: $message\n
    ";
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";

    if (mail($to, $subject, $body, $headers)) {
        echo "Message sent successfully!";
    } else {
        echo "Failed to send the message!";
    }
}
