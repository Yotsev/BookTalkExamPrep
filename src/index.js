//3-rd party modules
const express = require('express');
const cookieParser = require('cookie-parser');

//My modules
const config = require('./configs/config');
const routes = require('./routes');
const { authentication } = require('./middlewares/authMiddleware');
const setViewEngine = require('./configs/viewEngine');
const initDatabase = require('./configs/initDb');

//Config app
const app = express();
setViewEngine(app);

//Middlewares
app.use(express.static('./src/public'));
//app.use('/auth/static', express.static('./src/public')); this should be added if I use the rout
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(authentication);
app.use(routes);

//Start the app and Database
initDatabase()
    .then(() => app.listen(config.PORT, () => console.log(`Server is running on PORT: ${config.PORT}`)))
    .catch(error => console.log(error));