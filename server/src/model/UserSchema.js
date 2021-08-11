const mongoose  = require('mongoose')

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
    },
    familyName: String,
    givenName: String,
    googleId: String,
    imageUrl: String,
    name: String
})

const UserModal = new mongoose.model('user', UserSchema);

module.exports = UserModal;