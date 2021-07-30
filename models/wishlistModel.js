const mongoose = require('mongoose');
const Schema = mongoose.Schema


const wishlistItemsSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
    },
})

const wishlistSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },

    items: [wishlistItemsSchema]

}, { timestamps: true })


const Wishlist = mongoose.model('Wishlist', wishlistSchema)

module.exports = Wishlist;