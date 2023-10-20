<?php

    Class Database {
        private $database;

        function __construct() {
            $this->database = new PDO('mysql:host=localhost;dbname=calculator9000;charset=utf8', 'root', '');
        }

        function saveOperation($operation, $result) {
            $query = $this->database->prepare('INSERT INTO operation (equation, result) VALUES (:operation, :result)');
            $query->bindParam(':operation', $operation);
            $query->bindParam(':result', $result);
            return $query->execute();
        }

        function getOperations() {
            $query = $this->database->prepare('SELECT * FROM operation');
            $query->execute();
            return $query->fetchAll(PDO::FETCH_OBJ);
        }

        function clearOperations() {
            $query = $this->database->prepare('DELETE FROM operation');
            return $query->execute();
        }
    }
?>