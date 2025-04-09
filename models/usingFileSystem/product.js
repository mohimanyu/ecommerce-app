const fs = require("fs");
const Cart = require("./cart");
const { productsPath } = require("../../util/customPaths");
const { getProductsFromFile } = require("../../util/getProductFromFile");

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
            // for editing existing product
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

    static deleteById(id, cb) {
        getProductsFromFile(productsPath, (products) => {
            const product = products.filter((prod) => prod.id === id);
            const filteredProducts = products.filter((prod) => prod.id !== id);
            fs.writeFile(
                productsPath,
                JSON.stringify(filteredProducts),
                (err) => {
                    if (err) {
                        console.log(err);
                        return;
                    } else {
                        // deleting from cart if product is added
                        Cart.deleteProduct(id, product.price);
                    }
                }
            );
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
