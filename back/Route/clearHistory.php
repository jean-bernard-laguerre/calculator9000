<?php

    include_once '../Class/Database.php';
    header("Access-Control-Allow-Origin: *");

    $response = array(
        'status' => 'error',
        'message' => 'Invalid request method'
    );

    if ($_SERVER['REQUEST_METHOD'] == 'GET') {

        $database = new Database();
        $response = array(
            'status' => 'success',
            'message' => 'Operations cleared successfully',
            'data' => $database->clearOperations()
        );
    }

    echo json_encode($response);
?>