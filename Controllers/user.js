const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const bcrypt = require('bcrypt')
dotenv.config()

const signUpHandler = async (req, res) => {
    const userDetails = req.body
    try {
        const user = new User({
            firstName: userDetails.firstName,
            lastName: userDetails.lastName,
            email: userDetails.eMail,
            password: userDetails.pwd
        })

        await user.save()

        const token = jwt.sign({ userID: user._id }, process.env.Key)
        res.status(201).json({ name: user.firstName, token })

    } catch (err) {
        res.status(401).json({ message: err.message })
    }
}

const loginHandler = async (req, res) => {
    try {
        const { eMail, password } = req.body;

        const user = await User.findOne({ email: eMail })
        if (!user) {
            throw new Error("User doesn't exist !")
        }

        const verifyPasssword = await bcrypt.compare(password, user.password)
        if (!verifyPasssword) {
            throw new Error('Invalid e-Mail or password!')
        }

        const token = jwt.sign({ userID: user._id }, process.env.Key)
        res.json({ user: { name: user.firstName, token } })

    } catch (err) {
        return res.status(401).json({ message: err.message })
    }
}

const authVerify = (req, res, next) => {
    const key = process.env.Key
    const token = req.headers.authorization.split(',')[0]

    try {
        const decoded = jwt.verify(token, key)
        req.userID = decoded.userID
        next()

    } catch (err) {
        res.status(401).json({ Message: err.Message })
        console.log(err.message)
    }
}


module.exports = { signUpHandler, loginHandler, authVerify }