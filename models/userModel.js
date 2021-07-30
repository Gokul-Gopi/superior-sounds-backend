const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        required: 'Firstname is required'
    },

    lastName: {
        type: String,
        trim: true,
    },

    email: {
        type: String,
        trim: true,
        unique: true,
        required: 'e-mail is required',
    },

    password: {
        type: String,
        trim: true,
        validate: {
            validator: function (v) {
                return v.length > 7 && /\d+/.test(v)
            },
            message: props => `Minimum 8 characters long and must contain a number`
        },
        required: 'Password is required',
    },

}, { timestamps: true })



userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

const user = mongoose.model('User', userSchema)

module.exports = user;