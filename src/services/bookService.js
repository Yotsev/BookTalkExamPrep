const { findById } = require('../models/Book');
const Book = require('../models/Book');

exports.createBook = async (book) => {
    await Book.create(book);
};

exports.getAllBooks = async ()=>{
    return await Book.find({}).lean();
};

exports.getBookById = async (id)=>{
    return await Book.findById(id).populate('owner', 'wishList').lean();
};

exports.wishlistBook = async (bookId, user_id) => {
    const book = await Book.findById(bookId);
    
    if (book.wishList.includes(user_id)) {
        throw new Error(`Can't wishlist twice`);
    }

    book.wishList.push(user_id);
    await book.save();
};

exports.bookEdit = async (id, book) => {
    await Book.findByIdAndUpdate(id, book, {runValidators: true});
};

exports.bookDelete = async(id)=> {
    await Book.findByIdAndDelete(id);
}

//Or like that
// async function getAll(){

// }

// module.exports = {
//     getAll
// }