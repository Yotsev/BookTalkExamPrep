const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true,'Username is rerequired'],
        minLength: [4,'Username must be at least 5 characters long'],
    },
    email: {
        type: String,
        required: [true,'Email is rerequired'],
        minLength: [10, 'Email must be at least 10 characters long'],
    },
    password: {
        type: String,
        required: [true,'Password is rerequired'],
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;