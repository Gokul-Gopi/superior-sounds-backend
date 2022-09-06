const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderItemSchema = mongoose.Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },

  quantity: {
    type: Number,
  },
});

const orderSchema = mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  products: [orderItemSchema],
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
