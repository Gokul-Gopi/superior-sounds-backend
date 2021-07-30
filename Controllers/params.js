const Product = require('../models/productModel')

const findProductById = async (req, res, next, id) => {
    try {
        const product = await Product.findById(id)
        req.product = product
    } catch (err) {
        res.status(400).json({ message: err.message })
        console.log(err.message)
    }

    next()
}

module.exports = { findProductById }