// const Sequelize = require("sequelize");
// const mysql = require("mysql2");

// const sequelize = new Sequelize("nodejs-ecommerce-app", "root", "mysql@2025", {
//     dialect: "mysql",
//     host: "localhost",
// });

// pool helps to run multiple queries simultaneously
// const pool = mysql.createPool({
//     host: "localhost",
//     user: "root",
//     database: "nodejs-ecommerce-app",
//     password: "mysql@2025",
// });

// module.exports = sequelize;
// module.exports = pool.promise();

// mongoDB
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
    MongoClient.connect(
        "mongodb+srv://mohimanyubharti:kmHBI9lBxBJEBtqU@cluster0.tdaugkd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    )
        .then((client) => {
            _db = client.db();
            callback(client);
        })
        .catch((err) => {
            console.log(err);
        });
};

const getDb = () => {
    if (_db) {
        return _db;
    }
    throw "No database found";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
