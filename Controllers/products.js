const Product = require('../models/productModel')

const getProducts = async (req, res) => {
    try {
        const products = await Product.find({})
        res.json(products)
    } catch (err) {
        res.status(404).json({ success: 404, message: `Error:${err.message}` })
    }

}

const getProductById = async (req, res) => {
    const productID = req.params.id
    try {
        const product = await Product.findById(productID)
        res.json(product)
    } catch (err) {
        res.status(404).json({ success: 404, message: `Error:${err.message}` })
    }
}

module.exports = { getProducts, getProductById }