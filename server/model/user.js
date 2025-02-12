const {Schema, model} = require('mongoose'); 

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    cart: {
        type: Array,
    },
    wishList: {
        type: Array
    },
    profilePicture: {
        type: String,
        required: true,
    }
});

const User = model('user', userSchema);

module.exports = User;