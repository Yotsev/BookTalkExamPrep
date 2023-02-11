const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true,'Title is required'],
        minLength: [2, 'Title must be at least 2 characters'],
    },
    author: {
        type: String,
        required: [true,'Author is required'],
        minLength: [5,'Author must be at least 5 characters'],
    },
    image: {
        type: String,
        required: [true,'Image is required'],
        validate: {
            validator: function (value) {
                return value.startsWith('http://') || value.startsWith('https://');
            },
            message: 'Invalid image Url',
        }
    },
    review: {
        type: String,
        required: [true,'Review is required'],
        minLength: [10,'Review must be at least 10 characters'],
    },
    genre: {
        type: String,
        required: [true,'Genre is required'],
        minLength: [3,'Genre must  be at lest 3 characters'],
    },
    stars: {
        type: Number,
        required: [true, 'Stars is required'],
        min: [1, 'Must be at least 1 star'],
        max: [5, 'Must be max 5 stars'],
    },
    wishList: {
        type: [mongoose.Types.ObjectId],
        ref: 'User',
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;