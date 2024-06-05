<?php
session_start();

if (!isset($_SESSION['cart'])) {
    $_SESSION['cart'] = array();
}

$action = $_POST['action'];
$productId = $_POST['product_id'];

if ($action == 'add') {
    if (!in_array($productId, $_SESSION['cart'])) {
        $_SESSION['cart'][] = $productId;
    }
} elseif ($action == 'remove') {
    if (($key = array_search($productId, $_SESSION['cart'])) !== false) {
        unset($_SESSION['cart'][$key]);
    }
}

echo json_encode($_SESSION['cart']);
?>
