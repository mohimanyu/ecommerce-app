const fs = require("fs");
const { cartPath } = require("../../util/customPaths");
const { getProductsFromFile } = require("../../util/getProductFromFile");

module.exports = class Cart {
    static addProduct(id, productPrice) {
        // fetch the previous cart
        fs.readFile(cartPath, (err, fileContent) => {
            let cart = { products: [], totalPrice: 0 };

            if (!err) {
                cart = JSON.parse(fileContent);
            }

            // analyze the cart => find existing product
            const existingProductIndex = cart.products.findIndex(
                (prod) => prod.id === id
            );
            const existingProduct = cart.products[existingProductIndex];

            // structuring the cart
            let updatedProduct;
            if (existingProduct) {
                updatedProduct = { ...existingProduct };
                updatedProduct.qty += 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            } else {
                updatedProduct = { id: id, price: productPrice, qty: 1 };
                cart.products = [...cart.products, updatedProduct];
            }

            cart.totalPrice += +productPrice;

            fs.writeFile(cartPath, JSON.stringify(cart), (err) => {
                console.log(err);
            });
        });
    }

    static deleteProduct(id, productPrice) {
        getProductsFromFile(cartPath, (cart) => {
            const deletedItem = cart.products.find((prod) => prod.id === id);

            // if item present in cart
            if (deletedItem) {
                const updatedTotalPrice = Math.round(
                    cart.totalPrice - deletedItem.qty * productPrice,
                    2
                );
                const filteredCartProducts = cart.products.filter(
                    (prod) => prod.id !== id
                );

                const updatedCart = {
                    products: filteredCartProducts,
                    totalPrice: updatedTotalPrice,
                };

                fs.writeFile(cartPath, JSON.stringify(updatedCart), (err) => {
                    console.log(err);
                });
            }
        });
    }

    static fetchAll(cb) {
        getProductsFromFile(cartPath, cb);
    }
};
