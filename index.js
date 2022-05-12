const express = require('express');
const path = require('path');
const cors = require('cors')
const chat = require('./message')
const user = require('./userdb')
const chatusers = require('./chatusersdb')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
mongoose.connect('mongodb+srv://Itsme:nirmit2212@cluster0.j6ww2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
const app = express();


//Body parser
app.use(express.json());
app.use(express.urlencoded( { extended : false }));
app.use(cors())

//var email, password

app.post('/message',authenticateToken, async(req,res)=> {
    const record = req.body;
    console.log(record);
    const response = await chat.create(record);
    //res.send("ok");
    res.end();
    

})

// app.post('/login', async(req,res)=> {

app.use('/auth', require("./auth"))

// })
app.post('/chat',authenticateToken, async(req,res)=>{
    //res.send('Hello World!!');
    res.json(await chat.find({chatid : req.body.chatid}))
});

app.get('/userchats', authenticateToken, async(req,res)=>{
    const chats = await user.findOne({email : req.user.email }, {chats:1})
    console.log(chats.chats)
    res.json(await chatusers.find({chatid : {$in : chats.chats}}))
    res.end()
} )

app.post('/createchat', authenticateToken, async(req,res)=>{
    

})

function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization']
    const token  = authHeader && authHeader.split(' ')[1] // token has 3 parts. 2nd part has all the info
    if(token == null) return res.sendStatus(401)

    jwt.verify(token, "secret", (err, user)=>{
        if(err) return res.sendStatus(403)
        req.user = user
        next()
    })
}


//gets all members
//app.get('/api/members',(req,res)=> res.json(members));
//set static folder
app.use(express.static(path.join(__dirname,'public')))


const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(PORT))


