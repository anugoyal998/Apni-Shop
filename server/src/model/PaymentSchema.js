const mongoose = require('mongoose')

const PaymentSchema = new mongoose.Schema({
    uid: String,
    productId: String,
    url: String,
    title: {
        shortTitle: String,
        longTitle: String,
    },
    price: {
        mrp: String,
        cost: String,
        discount: String,
    },
    discount: String,
    tagline: String,
    razorpay_order_id: String,
    date_and_time: String,
})

const PaymentModal = new mongoose.model('Payment', PaymentSchema);

module.exports = PaymentModal;