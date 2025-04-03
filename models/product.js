const fs = require("fs");
const { cartPath, productsPath } = require("../util/customPaths");
const { getProductsFromFile } = require("../util/getProductFromFile");

const MIN_ID = 1;
const MAX_ID = 1000;

module.exports = class Product {
    constructor(id, title, imageUrl, price, description) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
    }

    save() {
        getProductsFromFile(productsPath, (products) => {
            if (this.id) {
                const existingProductIndex = products.findIndex(
                    (prod) => prod.id === this.id
                );
                products[existingProductIndex] = this;
                fs.writeFile(productsPath, JSON.stringify(products), (err) => {
                    if (err) {
                        console.log(err);
                    }
                });
            } else {
                this.id = Math.floor(
                    Math.random() * (MAX_ID - MIN_ID + 1) + MIN_ID
                ).toString();
                products.push(this);
                fs.writeFile(productsPath, JSON.stringify(products), (err) => {
                    console.log(err);
                });
            }
        });
    }

    static deleteById(id) {
        getProductsFromFile(cartPath, (cartProducts) => {
            const productExistsInCart = cartProducts.products.find(
                (prod) => prod.id === id
            );
            // deleting from cart first
            if (productExistsInCart) {
                const updatedCartProducts = cartProducts.products.filter(
                    (prod) => prod.id !== id
                );
                getProductsFromFile(productsPath, (products) => {
                    const productPrice = products.find(
                        (prod) => prod.id === id
                    ).price;
                    const updatedCartTotalPrice =
                        cartProducts.totalPrice -
                        productPrice * productExistsInCart.qty;
                    const updatedCart = {
                        products: updatedCartProducts,
                        totalPrice: updatedCartTotalPrice,
                    };
                    fs.writeFile(
                        cartPath,
                        JSON.stringify(updatedCart),
                        (err) => {
                            console.log(err);
                        }
                    );
                    // delete from products
                    const filteredProducts = products.filter(
                        (prod) => prod.id !== id
                    );
                    fs.writeFile(
                        productsPath,
                        JSON.stringify(filteredProducts),
                        (err) => {
                            if (err) {
                                console.log(err);
                                return;
                            }
                        }
                    );
                });
            }
        });
    }

    static fetchAll(cb) {
        getProductsFromFile(productsPath, cb);
    }

    static findById(id, cb) {
        getProductsFromFile(productsPath, (products) => {
            const product = products.find((prod) => prod.id === id);
            cb(product);
        });
    }
};
