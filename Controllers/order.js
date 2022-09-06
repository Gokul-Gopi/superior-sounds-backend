const Cart = require("../models/cartModel");
const Order = require("../models/orderModel");

const placeOrder = async (req, res) => {
  const cart = req?.cart;
  const userId = req?.userID;

  try {
    const orderedItems = cart.items.map((item) => {
      return { product: item.product, quantity: item.quantity };
    });
    const newOrder = new Order({
      user: userId,
      products: orderedItems,
    });
    await newOrder.save();
    await Cart.deleteOne({ _id: cart?._id });

    return res.json({ status: true, message: "Order placed" });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ status: false, message: error.Message });
  }
};

module.exports = { placeOrder };
