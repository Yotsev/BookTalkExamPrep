const authRouter = require('express').Router();
const authService = require('../services/authService');
const { getErrorMessage } = require('../utils/errorParser');


//Get Profile Page
authRouter.get('/profile', (req, res)=> {
    res.render('auth/profile');
});

//Get Reguster Page
authRouter.get('/register', (req, res) => {
    res.render('auth/register');
});

//Post Register Page
authRouter.post('/register', async (req, res) => {
    const { username, email, password, repeatPassword } = req.body;

    try {
        const token = await authService.register(username, email, password, repeatPassword);

        res.cookie('auth', token);
        res.redirect('/');
    } catch (err) {
        return res.status(400).render('auth/register', {error: getErrorMessage(err)});
    }
});

//Get Login Page
authRouter.get('/login', (req, res) => {
    res.render('auth/login');
});

//Post Login Page
authRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await authService.login(email, password);
        
        res.cookie('auth', token);
        res.redirect('/');
    } catch (err) {
        return res.status(404).render('auth/login', { error: getErrorMessage(err) });
    }
});

//Get Logut Page
authRouter.get('/logout', (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');
});

module.exports = authRouter;