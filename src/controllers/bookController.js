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
        return res.status(400).render('book/create', { error: getErrorMessage(err), book });
    }

    res.redirect('/book/catalog');
});

//Get Details Page
bookRouter.get('/:id/details', async (req, res) => {
    let isWished, isAuthor;
    const isRegistered = req.user;

    const book = await bookService.getBookById(req.params.id);

    if (!book) {
        return res.redirect(404, '/404');
    }

    if (isRegistered) {
        isAuthor = book.owner._id == req.user._id;
        isWished = book.wishList.includes(req.params._id);
    }

    res.render('book/details', { book, isRegistered, isAuthor, isWished });
});

//Get Wishlist Page TODO: the wish filed to be removed
bookRouter.get('/:id/wishlist', isAuthenticated, async (req, res) => {
    const book = await bookService.getBookById(req.params.id);
    const user = req.user;

    if (!book) {
        return res.redirect('/404');
    }

    if (!user) {
        return res.redirect('/404');
    }

    try {
        if (book.owner._id == req.user._id) {
            throw new Error(`Can't withlist your own book`);
        }

        await bookService.wishlistBook(book._id, user._id);

        res.locals.isWished = true

        res.redirect(`/book/${req.params.id}/details`);
    } catch (err) {
        console.log(err);
        return res.status(400).render(`book/details`, { error: getErrorMessage(err), book });
    }
});

//Get Edit Page
bookRouter.get('/:id/edit', isAuthenticated, async (req, res) => {
    const book = await bookService.getBookById(req.params.id);
    res.render('book/edit', {book});
});

bookRouter.post('/:id/edit', isAuthenticated, async (req, res)=> {
    const book = {
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        stars: Number(req.body.stars),
        image: req.body.image,
        review: req.body.review,
    };

    console.log(book);

    await bookService.bookEdit(req.params.id, book);

    res.redirect(`/book/${req.params.id}/details`);

});

bookRouter.get('/:id/delete', isAuthenticated, async (req, res)=> {
    await bookService.bookDelete(req.params.id);

    res.redirect('/book/catalog');
});

module.exports = bookRouter;