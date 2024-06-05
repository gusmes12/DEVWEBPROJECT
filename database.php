<?php
$servername = "localhost";
$username = "root";
$password = "Inter2010@";
$dbname = "camping_store";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}
?>
