const mongoose = require('mongoose');
const Schema = mongoose.Schema


const cartItemsSchema = mongoose.Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
    },

    quantity: {
        type: Number,
    }

})


const cartSchema = mongoose.Schema({
    _id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },

    items: [cartItemsSchema]

}, { timestamps: true })


const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart;