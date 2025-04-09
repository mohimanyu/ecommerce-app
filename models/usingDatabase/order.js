const Sequelize = require("sequelize");

const sequelize = require("../../util/database");

const Order = sequelize.define("order", {
    id: {
        type: Sequelize.INTEGER,
        notNull: true,
        autoIncrement: true,
        primaryKey: true,
    },
});

module.exports = Order;
