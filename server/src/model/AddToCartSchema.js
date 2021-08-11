const mongoose = require('mongoose')

const AddToCartSchema = new mongoose.Schema({
    googleId: String,
    id: String,
    url: String,
    detailUrl: String,
    title: {
        shortTitle: String,
        longTitle: String,
    },
    price: {
        mrp: String,
        cost: String,
        discount: String,
    },
    description: String,
    discount: String,
    tagline: String,
    cnt: Number,
})

const AddToCartModal = new mongoose.model('Cart', AddToCartSchema);

module.exports = AddToCartModal;