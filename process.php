<?php

// Check for get variable
if (isset($_GET['name'])) {
    echo 'GET Processing...';
    echo 'YOUR NAME IS ' . $_GET['name'];
}


// Check for post variable
if (isset($_POST['name'])) {
    echo 'POST Processing...';
    echo 'YOUR NAME IS ' . $_POST['name'];
}