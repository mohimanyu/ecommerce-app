const Sequelize = require("sequelize");
// const mysql = require("mysql2");

const sequelize = new Sequelize("nodejs-ecommerce-app", "root", "mysql@2025", {
    dialect: "mysql",
    host: "localhost",
});

// pool helps to run multiple queries simultaneously
// const pool = mysql.createPool({
//     host: "localhost",
//     user: "root",
//     database: "nodejs-ecommerce-app",
//     password: "mysql@2025",
// });

module.exports = sequelize;
// module.exports = pool.promise();
