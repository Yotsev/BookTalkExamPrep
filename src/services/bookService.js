const Book = require('../models/Book');

exports.createBook = async (book) => {
    await Book.create(book);
};

exports.getAllBooks = async ()=>{
    return await Book.find({}).lean();
};

//Or like that
// async function getAll(){

// }

// module.exports = {
//     getAll
// }