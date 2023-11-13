const mongoose = require('mongoose');

mongoose
    //.connect('mongodb+srv://hiroad:mittmap@hiroad.nbzij.mongodb.net/test', { useNewUrlParser: true })
    .connect('mongodb+srv://hiroad:mittmaps@hiroad.gwedg.mongodb.net/hiroad', { useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error', e.message)
    });

const db = mongoose.connection;

module.exports = db;