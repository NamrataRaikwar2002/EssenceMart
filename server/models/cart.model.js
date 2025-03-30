const mongoose = require('mongoose');
const {
    Schema
} = mongoose;

const cartSchema = new Schema({
    userId: String,
    products: [{
        _id: String,
        quantity: {
            type: Number,
            default: 1
        },
        productImg: String,
        title: String,
        price: Number,
        prePrice: Number,
        discount: String,
        rating: Number,
        category: String,
    }]
})

const Cart = mongoose.model('Cart', cartSchema);
module.exports = {
    Cart
};