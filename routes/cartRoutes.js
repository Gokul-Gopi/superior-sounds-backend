const express = require('express')
const router = express.Router()
const { authVerify } = require('../Controllers/user')
const { getCartById, addToCart, getCartItems, modifyCartItemsQty, deleteItemFromCart } = require('../Controllers/cart')
const { findProductById } = require('../Controllers/params')



router.param('productID', findProductById)

router.get('/', authVerify, getCartById, getCartItems,)
router.post('/:productID', authVerify, getCartById, addToCart)
router.put('/:productID', authVerify, getCartById, modifyCartItemsQty)
router.delete('/:productID', authVerify, getCartById, deleteItemFromCart)


module.exports = router