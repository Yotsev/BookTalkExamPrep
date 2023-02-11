const mongoose = require('mongoose');

const config = require('./config');

async function initDatabase(){
    mongoose.set('strictQuery', false);

    await mongoose.connect(config.DB_URI);

    console.log(`Database is connected...`);
};

module.exports = initDatabase;