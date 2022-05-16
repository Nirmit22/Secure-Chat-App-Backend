const mongoose = require('mongoose');

const chatuserschema = new mongoose.Schema({
    chatid: String,
    chatname: String,
    userids: Array,
    admins: Array,
    date: {type: Object , default: new Date()},
    lastmessage: String,
    lastmessagetime: Object
})

const model = mongoose.model('chatusersmodel', chatuserschema)
module.exports = model