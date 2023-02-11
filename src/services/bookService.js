const Book = require('../models/Book');

exports.createBook = async (book) => {
    await Book.create(book);
};