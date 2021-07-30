const Wishlist = require('../models/wishlistModel')
const { extend, concat } = require('lodash')

const getWishlistById = async (req, res, next) => {
    try {
        const wishlist = await Wishlist.findById(req.userID)
        if (!wishlist) {
            const newWishlist = new Wishlist({
                _id: req.userID,
            })
            let userWishlist = await newWishlist.save()
            req.wishlist = userWishlist
        } else {
            req.wishlist = wishlist
        }
        next()

    } catch (err) {
        res.status(400).json(`Error: ${err.message}`)
    }
}


const getWishlistItems = async (req, res, next) => {
    const { wishlist } = req

    try {
        await wishlist.populate('items.product').execPopulate()
        return res.json({ userWishlist: wishlist.items })

    } catch (err) {
        res.status(400).json(`Error: ${err.message}`)
    }
}

const addToWishlist = async (req, res, next) => {
    let { wishlist, product } = req

    try {
        if (!wishlist.items.id(product._id)) {
            const newProduct = {
                _id: product._id,
                product: product._id
            }

            let updatedWishlist = extend(wishlist, { ...wishlist, items: concat(wishlist.items, newProduct) })
            await updatedWishlist.save()
            await updatedWishlist.populate('items.product').execPopulate()
            res.json({ success: true, response: wishlist.items })
        }
        else {
            res.json({ success: false, message: 'Already in wishlist' })
        }


    } catch (err) {
        res.status(400).json(`Message: ${err.message}`)
    }
}

const deleteItemFromWishlist = async (req, res) => {
    const { wishlist, product } = req

    try {
        await wishlist.items.id(product._id).remove()
        await wishlist.save()
        await wishlist.populate('items.product').execPopulate()
        res.json({ userWishlist: wishlist.items })
    } catch (err) {
        res.status(400).json(`Message: ${err.message}`)
    }
}



module.exports = { getWishlistById, getWishlistItems, addToWishlist, deleteItemFromWishlist }