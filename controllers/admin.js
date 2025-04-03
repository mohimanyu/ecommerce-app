const Product = require("../models/product");
const { getProductDetails } = require("../util/getProductDetails");

exports.getAddProduct = (req, res, next) => {
    res.render("admin/edit-product", {
        pageTitle: "Add Product",
        path: "admin/add-product",
        product: null,
    });
};

exports.postAddProduct = (req, res, next) => {
    const productDetails = getProductDetails(req);
    const product = new Product(
        productDetails.id,
        productDetails.title,
        productDetails.imageUrl,
        productDetails.price,
        productDetails.description
    );
    product.save();
    res.redirect("/");
};

exports.getEditProduct = (req, res, next) => {
    const productId = req.params.productId;
    Product.findById(productId, (product) => {
        if (!product) {
            return res.redirect("/");
        }
        res.render("admin/edit-product", {
            product: product,
            pageTitle: "Edit Product",
            path: "admin/admin-products",
        });
    });
};

exports.postEditProduct = (req, res, next) => {
    const productDetails = getProductDetails(req);
    const product = new Product(
        productDetails.id,
        productDetails.title,
        productDetails.imageUrl,
        productDetails.price,
        productDetails.description
    );

    product.save();
    res.redirect("/admin/products");
};

exports.deleteProduct = (req, res, next) => {
    const productId = req.body.id;

    if (productId) {
        Product.deleteById(productId);
    }

    res.redirect("/admin/products");
};

exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render("admin/products", {
            prods: products,
            pageTitle: "Admin Products",
            path: "admin/products",
        });
    });
};
