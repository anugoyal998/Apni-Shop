const mongoose = require('mongoose')

const TASchema = new mongoose.Schema({
    uid: String,
    ta: String,
})

const TAModal = new mongoose.model("TotalPrice", TASchema);

module.exports = TAModal;

