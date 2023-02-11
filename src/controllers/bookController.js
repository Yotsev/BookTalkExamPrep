const bookRouter = require('express').Router();

const { isAuthenticated } = require('../middlewares/authMiddleware');
const bookService = require('../services/bookService');
const { getErrorMessage } = require('../utils/errorParser');

//Get Catalog Page
bookRouter.get('/catalog', async (req, res) => {
    const books = await bookService.getAllBooks();

    const hasBooks = books.length > 0;

    res.render('book/catalog', { books, hasBooks });
});

//Get Create Page
bookRouter.get('/create', isAuthenticated, (req, res) => {
    res.render('book/create');
});

//Post Create Page
bookRouter.post('/create', isAuthenticated, async (req, res) => {
    const book = {
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        stars: Number(req.body.stars),
        image: req.body.image,
        review: req.body.review,
        owner: req.user._id,
    }

    try {
        await bookService.createBook(book);
    } catch (err) {
        console.log(err);
        return res.status(400).render('book/create', { error: getErrorMessage(err), book });
    }

    res.redirect('/book/catalog');
});

module.exports = bookRouter;