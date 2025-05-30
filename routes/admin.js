const path = require("path");

const express = require("express");

// const adminController = require("../controllers/fileBased/admin");
const adminController = require("../controllers/dbBased/admin");

const router = express.Router();

// /admin/add-product => GET
router.get("/add-product", adminController.getAddProduct);

// /admin/product => GET
router.get("/products", adminController.getProducts);

// /admin/add-product => POST
router.post("/add-product", adminController.postAddProduct);

// admin/edit-product => GET
router.get("/edit-product/:productId", adminController.getEditProduct);

// admin/edit-product => POST
router.post("/edit-product", adminController.postEditProduct);

// admin/delete-product => DELETE
router.post("/delete-product", adminController.deleteProduct);

module.exports = router;
