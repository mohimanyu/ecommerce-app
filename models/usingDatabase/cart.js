const Sequelize = require("sequelize");

const sequelize = require("../../util/database");

const Cart = sequelize.define("cart", {
    id: {
        type: Sequelize.INTEGER,
        notNull: true,
        autoIncrement: true,
        primaryKey: true,
    },
});

module.exports = Cart;
