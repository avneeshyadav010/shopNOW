const { Schema, model} = require('mongoose');

const productSchema = new Schema({
    products: {
        type: Object,
        required: true
    }
});

const product = model('product', productSchema)

module.exports = product