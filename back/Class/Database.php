<?php

    Class Database {
        private $database;

        function __construct() {
            $this->database = new PDO('mysql:host=localhost;dbname=calculator9000;charset=utf8', 'root', '');
        }

        function saveOperation($operation, $result) {
            $query = $this->database->prepare('INSERT INTO operations (operation) VALUES (:operation, :result)');
            $query->bindParam(':operation', $operation);
            $query->bindParam(':result', $result);
            return $query->execute();
        }
    }
?>