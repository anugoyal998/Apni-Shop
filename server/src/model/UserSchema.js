const mongoose  = require('mongoose')

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
    },
    uid: {
        type: String,
        unique: true,
    }
})

const UserModal = new mongoose.model('user', UserSchema);

module.exports = UserModal;