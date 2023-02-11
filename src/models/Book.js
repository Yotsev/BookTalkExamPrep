const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: 2,
    },
    author: {
        type: String,
        required: true,
        minLength: 5,
    },
    image: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return value.startsWith('http://') || value.startsWith('https://');
            },
            message: 'Invalid image Url',
        }
    },
    review: {
        type: String,
        required: true,
        minLength: 10,
    },
    genre: {
        type: String,
        required: true,
        minLength: 3,
    },
    stars: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    wishList: {
        type: [mongoose.Types.ObjectId],
        ref: 'User',
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
})