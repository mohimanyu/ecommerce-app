const Sequelize = require("sequelize");

const sequelize = require("../../util/database");

const OrderItem = sequelize.define("orderItem", {
    id: {
        type: Sequelize.INTEGER,
        notNull: true,
        autoIncrement: true,
        primaryKey: true,
    },
    quantity: Sequelize.INTEGER,
});

module.exports = OrderItem;
