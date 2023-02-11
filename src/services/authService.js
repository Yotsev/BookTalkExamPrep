const bcrypt = require('bcrypt');
const User = require('../models/User');
const Book = require('../models/Book');
const jwt = require('../libs/jsonwebtoken');
const config = require('../configs/config');

exports.getUserByEmail = (email)=> User.findOne({email});

exports.getExistingUser = async (username, email) => {
    const existingUser = await User.findOne({$or: [{email}, {username}]});
    
    return existingUser;
};

exports.register = async (username, email, password, repeatPassword) => {
    const passwordLenght = 4;

    const existingUser = await this.getExistingUser(username, email);

    if (existingUser) {
        throw new Error('User exists');
    }

    if (password.length < 4) {
        throw new Error('Password must be at least 4 characters long');
    }

    if (password !== repeatPassword) {
        throw new Error('Password mismatch');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({ username, email, password: hashedPassword });

    return this.login(email, password);
};

exports.login = async (email, password) => {
    const user = await this.getUserByEmail(email);

    if (!user) {
        throw new Error('Invalid email or password');
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        throw new Error('Invalid email or password');
    }

    const payload = {
        _id: user._id,
        email,
        username: user.username,
    };

    const token = await jwt.sign(payload, config.SECRET);

    return token;
};

exports.userBooks = async (user_id) => {
    const books = await Book.find().where('wishList').all([user_id]).lean();

    return books;
};