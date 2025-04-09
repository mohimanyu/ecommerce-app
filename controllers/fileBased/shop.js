const Product = require("../../models/usingFileSystem/product");
const Cart = require("../../models/usingFileSystem/cart");

exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render("shop/product-list", {
            prods: products,
            pageTitle: "Shop",
            path: "/products",
            hasProducts: products.length > 0,
            activeShop: true,
            productCSS: true,
        });
    });
};

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId, (product) => {
        res.render("shop/product-detail", {
            product: product,
            pageTitle: "Product Details",
            path: "/product",
        });
    });
};

exports.getIndex = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render("shop/index", {
            prods: products,
            pageTitle: "Shop",
            path: "/",
            hasProducts: products.length > 0,
            activeShop: true,
            productCSS: true,
        });
    });
};

exports.getCart = (req, res, next) => {
    Cart.fetchAll((products) => {
        res.render("shop/cart", {
            prods: products,
            path: "/cart",
            pageTitle: "Your Cart",
        });
    });
};

exports.postCart = (req, res, next) => {
    const productId = req.body.productId;
    Product.findById(productId, (product) => {
        Cart.addProduct(productId, product.price);
    });
    res.redirect("/cart");
};

exports.deleteCartItem = (req, res, next) => {
    const prodId = req.body.productId;
    const prodPrice = req.body.productPrice;
    Cart.deleteProduct(prodId, prodPrice);
    res.redirect("/cart");
};

exports.getOrders = (req, res, next) => {
    res.render("shop/orders", {
        path: "/orders",
        pageTitle: "Your Orders",
    });
};

exports.getCheckout = (req, res, next) => {
    res.render("shop/checkout", {
        path: "/checkout",
        pageTitle: "Checkout",
    });
};
