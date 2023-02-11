const router = require('express').Router();

const homeRouter = require('./controllers/homeController');

router.use('/', homeRouter);

module.exports = router;