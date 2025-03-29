const mongoose = require('mongoose');
const {
    Schema
} = mongoose;

const wishlistSchema = new Schema({
    userId: String,
    products: [{
        _id: String,
        productImg: String,
        title: String,
        price: Number,
        prePrice: Number,
        discount: String,
        rating: Number,
        category: String,
        quantity: Number,
        __v: Number
    }]

})

const Wishlist = mongoose.model("Wishlist", wishlistSchema);
module.exports = {
    Wishlist
};