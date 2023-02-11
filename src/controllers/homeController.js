const homeRouter = require('express').Router();

homeRouter.get('/', (req, res)=> {
    res.render('home/home');
});

homeRouter.get('/404', (req, res)=> {
    res.render('home/404')
})

module.exports = homeRouter;