const Cart = require("../models/cartModel");
const { extend, concat } = require("lodash");

const getCartById = async (req, res, next) => {
  try {
    const cart = await Cart.findById(req.userID);
    if (!cart) {
      const newCart = new Cart({
        _id: req.userID,
      });
      let userCart = await newCart.save();
      req.cart = userCart;
    } else {
      req.cart = cart;
    }
    next();
  } catch (err) {
    console.log(err.message);
    res.status(400).json(`Error: ${err.message}`);
  }
};

const getCartItems = async (req, res, next) => {
  const { cart } = req;
  try {
    await cart.populate("items.product").execPopulate();
    return res.json({ userCart: cart.items });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ response: err.message });
  }
};

const addToCart = async (req, res, next) => {
  let { cart, product } = req;

  try {
    if (!cart.items.id(product._id)) {
      const newProduct = {
        _id: product._id,
        product: product._id,
        quantity: 1,
      };

      let updatedCart = extend(cart, {
        ...cart,
        items: concat(cart.items, newProduct),
      });
      await updatedCart.save();
      await updatedCart.populate("items.product").execPopulate();
      return res.json({ success: true, response: cart.items });
    } else {
      return res.json({ success: false, message: "Already in cart" });
    }
    next();
  } catch (err) {
    res.status(400).json(`Message: ${err.message}`);
    console.log(err.message);
  }
};

const modifyCartItemsQty = async (req, res) => {
  const { action } = req.body;
  const { cart, product } = req;
  const productToBeUpdated = cart.items.id(product._id);
  try {
    if (action === "increase") {
      productToBeUpdated.quantity += 1;
    } else if (action === "decrease") {
      productToBeUpdated.quantity -= 1;
    } else {
      productToBeUpdated.quantity += 0;
    }
    await cart.save();
    await cart.populate("items.product").execPopulate();
    return res.json({ userCart: cart.items });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ message: err.message });
  }
};

const deleteItemFromCart = async (req, res) => {
  const { cart, product } = req;
  try {
    await cart.items.id(product._id).remove();
    await cart.save();
    await cart.populate("items.product").execPopulate();
    res.json({ userCart: cart.items });
  } catch (err) {
    res.status(400).json({ message: err.message });
    console.log(err.message);
  }
};

module.exports = {
  getCartById,
  getCartItems,
  addToCart,
  modifyCartItemsQty,
  deleteItemFromCart,
};
