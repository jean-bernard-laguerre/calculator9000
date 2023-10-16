<?php

    include_once '../Class/Database.php';

    $response = array(
        'status' => 'error',
        'message' => 'Invalid request method'
    );

    if($_SERVER['REQUEST_METHOD'] == 'POST') {

        $data = json_decode(file_get_contents('php://input'), true);

        $operation = $data['operation'];
        $result = $data['result'];

        $database = new Database();
        if ($database->saveOperation($operation, $result)){
                $response = array(
                'status' => 'success',
                'message' => 'Operation saved successfully'
            );
        }
    }
    echo json_encode($response);
?>