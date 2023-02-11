const handlebars = require('express-handlebars');

function setViewEngine(app){
    app.engine('hbs', handlebars.engine({
        extname: 'hbs',
    }));
    app.set('view engine', 'hbs'),
    app.set('views', './src/views');
};

module.exports = setViewEngine;

