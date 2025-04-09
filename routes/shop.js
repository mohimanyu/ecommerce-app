const path = require("path");

const express = require("express");

// const shopController = require("../controllers/fileBased/shop");
const shopController = require("../controllers/dbBased/shop");

const router = express.Router();

router.get("/", shopController.getIndex);

router.get("/products", shopController.getProducts);

router.get("/products/:productId", shopController.getProduct);

router.get("/cart", shopController.getCart);

router.post("/cart", shopController.postCart);

router.post("/delete-item", shopController.deleteCartItem);

router.get("/orders", shopController.getOrders);

router.post("/create-order", shopController.postOrder);

router.get("/checkout", shopController.getCheckout);

module.exports = router;
