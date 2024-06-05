<?php
session_start();
include 'database.php';

if (!isset($_SESSION['cart']) || empty($_SESSION['cart'])) {
    echo json_encode([]);
    exit();
}

$cartItems = implode(',', $_SESSION['cart']);
$sql = "SELECT * FROM products WHERE id IN ($cartItems)";
$result = $conn->query($sql);

$cart = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $cart[] = $row;
    }
}

$conn->close();

echo json_encode($cart);
?>
