const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const connectToMongo = require("./dbConnect");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const cartRoutes = require("./routes/cartRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const orederRoutes = require("./routes/orderRoutes");
const { handleError, routeNotFound } = require("./errorMiddlerware");

dotenv.config();
connectToMongo();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/cart", cartRoutes);
app.use("/wishlist", wishlistRoutes);
app.use("/user", userRoutes);
app.use("/products", productRoutes);
app.use("/order", orederRoutes);
app.get("/", (req, res) => res.send("API is running..."));

app.use(routeNotFound);
app.use(handleError);

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}...`
  )
);
