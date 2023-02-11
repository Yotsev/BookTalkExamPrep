const config = {
    production: {
        PORT: 5000,
        DB_URI: 'mongodb://127.0.0.1:27017/bookTalks',
        SECRET: '22f06f5c1de6d92016ddcfcdd4a4c64e940a6528',
    },
    development: {
        PORT: 3000,
        DB_URI: 'mongodb://127.0.0.1:27017/bookTalks',
        SECRET: 'f7c5cbc03473be1335185bf67144a7604b7ee93a',
    }
};

module.exports = config[process.env.NODE_ENV || 'development'];