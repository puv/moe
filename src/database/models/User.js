const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    _: {
        username: { type: String, required: true },
        password: { type: String, required: true},
        avatar: { type: String, required: true },
        email: { type: String, required: true },
        invite: { type: String, required: true },
    },
    premium: { type: Boolean, required: true },
});

const User = module.exports = mongoose.model('User', UserSchema);