const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/fileBased/error");
const sequelize = require("./util/database");
const Product = require("./models/usingDatabase/product");
const User = require("./models/usingDatabase/user");
const Cart = require("./models/usingDatabase/cart");
const CartItem = require("./models/usingDatabase/cartItem");
const Order = require("./models/usingDatabase/order");
const OrderItem = require("./models/usingDatabase/orderItem");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// only executes in case of incoming request
app.use((req, res, next) => {
    User.findByPk(1)
        .then((user) => {
            req.user = user;
            next();
        })
        .catch((err) => {
            console.log(err);
        });
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });

sequelize
    // use force: true to override the tables
    // .sync({ force: true })
    .sync()
    .then(() => {
        return User.findByPk(1);
    })
    .then((user) => {
        if (!user) {
            return User.create({
                name: "Travis",
                email: "travislead@gmail.com",
            });
        }
        return user;
    })
    .then((user) => {
        user.createCart();
    })
    .then(() => {
        app.listen(3000);
    })
    .catch((err) => {
        console.log(err);
    });

// app.listen(3000);
