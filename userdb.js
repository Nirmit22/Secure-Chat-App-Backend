const mongoose = require('mongoose');

const userschema = new mongoose.Schema({
    userid: String,
    email: String,
    password: String,
    name: String,
    age: String,
    chats: Array,
    date: { type: Date, default: Date.now }
},
//{ typeKey: '$type' }
);

const model = mongoose.model('usermodel', userschema)
module.exports = model