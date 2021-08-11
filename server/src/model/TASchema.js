const mongoose = require('mongoose')

const TASchema = new mongoose.Schema({
    googleId: {type: String, unique: true},
    price: Number,
})

const TAModal = new mongoose.model("TotalPrice", TASchema);

module.exports = TAModal;

