const express = require('express')
const router = express.Router()
const { authVerify } = require('../Controllers/user')
const { getWishlistById, getWishlistItems, addToWishlist, deleteItemFromWishlist } = require('../Controllers/wishlist')
const { findProductById } = require('../Controllers/params')



router.param('productID', findProductById)

router.get('/', authVerify, getWishlistById, getWishlistItems)
router.post('/:productID', authVerify, getWishlistById, addToWishlist)
router.delete('/:productID', authVerify, getWishlistById, deleteItemFromWishlist)


module.exports = router