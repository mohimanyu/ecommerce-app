const Product = require("../../models/usingDatabase/product");
// const Cart = require("../../models/usingDatabase/cart");

exports.getProducts = (req, res, next) => {
    // Product.fetchAll()
    //     .then(([rows, fieldData]) => {
    //         res.render("shop/product-list", {
    //             prods: rows,
    //             pageTitle: "Products",
    //             path: "/products",
    //         });
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     });
    // Product.findAll()
    //     .then((products) => {
    //         res.render("shop/product-list", {
    //             prods: products,
    //             pageTitle: "Products",
    //             path: "/products",
    //         });
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     });
    Product.fetchAll()
        .then((products) => {
            res.render("shop/product-list", {
                prods: products,
                pageTitle: "Products",
                path: "/products",
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    // Product.findById(prodId)
    //     .then(([product]) => {
    //         res.render("shop/product-detail", {
    //             product: product[0],
    //             pageTitle: "Product Details",
    //             path: "/product",
    //         });
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     });
    // Product.findByPk(prodId)
    Product.findById(prodId)
        .then((result) => {
            res.render("shop/product-detail", {
                product: result,
                pageTitle: "Product Details",
                path: "/product",
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.getIndex = (req, res, next) => {
    // Product.fetchAll()
    //     .then(([rows, fieldData]) => {
    //         res.render("shop/index", {
    //             prods: rows,
    //             pageTitle: "Shop",
    //             path: "/",
    //         });
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     });
    // Product.findAll()
    Product.fetchAll()
        .then((products) => {
            res.render("shop/index", {
                prods: products,
                pageTitle: "Shop",
                path: "/",
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.getCart = (req, res, next) => {
    req.user
        .getCart()
        .then((cart) => {
            return cart
                .getProducts()
                .then((products) => {
                    console.log(products);
                    res.render("shop/cart", {
                        prods: products,
                        path: "/cart",
                        pageTitle: "Your Cart",
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        })
        .catch((err) => {
            console.log(err);
        });
    // Cart.fetchAll((products) => {
    //     res.render("shop/cart", {
    //         prods: products,
    //         path: "/cart",
    //         pageTitle: "Your Cart",
    //     });
    // });
};

exports.postCart = (req, res, next) => {
    const productId = req.body.productId;
    let fetchedCart;
    let newQuantity = 1;
    req.user
        .getCart()
        .then((cart) => {
            fetchedCart = cart;
            return cart.getProducts({ where: { id: productId } });
        })
        .then((products) => {
            let product;
            if (products.length > 0) {
                product = products[0];
            }
            if (product) {
                const oldQuantity = product.cartItem.quantity;
                newQuantity = oldQuantity + 1;
                return product;
            }
            return Product.findByPk(productId);
        })
        .then((product) => {
            return fetchedCart.addProduct(product, {
                through: { quantity: newQuantity },
            });
        })
        .then(() => {
            res.redirect("/cart");
        })
        .catch((err) => {
            console.log(err);
        });
    // Product.findById(productId, (product) => {
    //     Cart.addProduct(productId, product.price);
    // });
};

exports.deleteCartItem = (req, res, next) => {
    const prodId = req.body.productId;
    req.user
        .getCart()
        .then((cart) => {
            return cart.getProducts({ where: { id: prodId } });
        })
        .then((products) => {
            const product = products[0];
            return product.cartItem.destroy();
        })
        .then(() => {
            res.redirect("/cart");
        })
        .catch((err) => {
            console.log(err);
        });
    // const prodPrice = req.body.productPrice;
    // Cart.deleteProduct(prodId, prodPrice);
    // res.redirect("/cart");
};

exports.getOrders = (req, res, next) => {
    req.user
        .getOrders({ include: ["products"] })
        .then((orders) => {
            res.render("shop/orders", {
                path: "/orders",
                pageTitle: "Your Orders",
                orders: orders,
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.postOrder = (req, res, next) => {
    let fetchedCart;
    req.user
        .getCart()
        .then((cart) => {
            fetchedCart = cart;
            return cart.getProducts();
        })
        .then((products) => {
            return req.user
                .createOrder()
                .then((order) => {
                    return order.addProducts(
                        products.map((product) => {
                            product.orderItem = {
                                quantity: product.cartItem.quantity,
                            };
                            return product;
                        })
                    );
                })
                .catch((err) => {
                    console.log(err);
                });
        })
        .then(() => {
            return fetchedCart.setProducts(null);
        })
        .then(() => {
            res.redirect("/orders");
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.getCheckout = (req, res, next) => {
    res.render("shop/checkout", {
        path: "/checkout",
        pageTitle: "Checkout",
    });
};
