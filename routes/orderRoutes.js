const express = require("express");
const { getCartById } = require("../Controllers/cart");
const { placeOrder } = require("../Controllers/order");
const { authVerify } = require("../Controllers/user");
const router = express.Router();

router.post("/", authVerify, getCartById, placeOrder);

module.exports = router;
