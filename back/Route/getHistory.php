<?php

    include_once '../Class/Database.php';
    header("Access-Control-Allow-Origin: *");

    $response = array(
        'status' => 'error',
        'message' => 'Invalid request method'
    );

    if($_SERVER['REQUEST_METHOD'] == 'GET') {

        $database = new Database();
        $response = array(
            'status' => 'success',
            'message' => 'Operations retrieved successfully',
            'data' => $database->getOperations()
        );
    }

    echo json_encode($response);
?>