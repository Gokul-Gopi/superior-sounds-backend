const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        require: 'Name is required'
    },

    type: {
        type: String,
        required: 'type is required',
    },

    price: {
        type: Number,
        required: 'price is required',
    },

    description: {
        type: String,
        required: 'Description is required'
    },

    rating: {
        type: Number,
        required: 'rating is required',
    },

    isBestSeller: {
        type: Boolean,
        required: 'BestSeller is required'
    },

    inStock: {
        type: Boolean,
        required: 'Stock is required'
    },

    fastDelivery: {
        type: Boolean,
        required: 'FastDElivery is required'
    },

    image: {
        type: String,
        required: 'Image is required'
    }

}, { timestamps: true })


const Product = mongoose.model('Product', productSchema)

module.exports = Product;