<?php


$conn = mysqli_connect('localhost', 'root', '', 'ajaxcrash');

if ($_POST['name']) {
    $name = mysqli_real_escape_string($conn, $_POST['name']);

    echo 'Your name is ' . $_POST['name'];
    $query = "Insert into ajax(name) values('$name')";
    if (mysqli_query($conn, $query)) {
        echo '\n User inserted successfully...';
    } else {
        echo '\n Error: ' . mysqli_error($conn);
    }
}