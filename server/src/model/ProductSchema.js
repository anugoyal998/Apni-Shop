const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
    },
    url: String,
    detailUrl: String,
    title: {
        shortTitle: String,
        longTitle: String,
    },
    price:{
        mrp: String,
        cost: String,
        discount: String,
    }, 
    description: String,
    discount: String,
    tagline: String,
})

const ProductModel = new mongoose.model('Product',ProductSchema);

module.exports = ProductModel;