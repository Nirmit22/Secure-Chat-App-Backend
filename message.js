const mongoose = require('mongoose');

const chatschema = new mongoose.Schema({
    chatid: String,
    userid: String,
    message: String,
    date: {type: Object , default: new Date()}
})

const model = mongoose.model('chatmodel', chatschema)
module.exports = model