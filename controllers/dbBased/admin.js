const { Where } = require("sequelize/lib/utils");
const Product = require("../../models/usingDatabase/product");
const { getProductDetails } = require("../../util/getProductDetails");

exports.getAddProduct = (req, res, next) => {
    res.render("admin/edit-product", {
        pageTitle: "Add Product",
        path: "admin/add-product",
        product: null,
    });
};

exports.postAddProduct = (req, res, next) => {
    const productDetails = getProductDetails(req);
    // const product = new Product(
    //     productDetails.id,
    //     productDetails.title,
    //     productDetails.imageUrl,
    //     productDetails.price,
    //     productDetails.description
    // );
    // product
    //     .save()
    //     .then(() => {
    //         res.redirect("/");
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     });
    req.user
        .createProduct({
            title: productDetails.title,
            imageUrl: productDetails.imageUrl,
            price: productDetails.price,
            description: productDetails.description,
        })
        .then(() => {
            res.redirect("/admin/products");
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.getEditProduct = (req, res, next) => {
    const productId = req.params.productId;
    // Product.findById(productId, (product) => {
    //     if (!product) {
    //         return res.redirect("/");
    //     }
    //     res.render("admin/edit-product", {
    //         product: product,
    //         pageTitle: "Edit Product",
    //         path: "admin/admin-products",
    //     });
    // });
    Product.findByPk(productId).then((product) => {
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
    // const product = new Product(
    //     productDetails.id,
    //     productDetails.title,
    //     productDetails.imageUrl,
    //     productDetails.price,
    //     productDetails.description
    // );
    Product.findByPk(productDetails.id)
        .then((product) => {
            product.title = productDetails.title;
            product.imageUrl = productDetails.imageUrl;
            product.price = productDetails.price;
            product.description = productDetails.description;
            return product.save();
        })
        .then(() => {
            res.redirect("/admin/products");
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.deleteProduct = (req, res, next) => {
    const productId = req.body.id;

    Product.destroy({
        where: {
            id: productId,
        },
    })
        .then(() => {
            res.redirect("/admin/products");
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.getProducts = (req, res, next) => {
    // Product.fetchAll((products) => {
    //     res.render("admin/products", {
    //         prods: products,
    //         pageTitle: "Admin Products",
    //         path: "admin/products",
    //     });
    // });

    // Product.findAll()
    req.user
        .getProducts()
        .then((products) => {
            res.render("admin/products", {
                prods: products,
                pageTitle: "Admin Products",
                path: "admin/products",
            });
        })
        .catch((err) => {
            console.log(err);
        });
};
