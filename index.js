const express = require('express');
const path = require('path');
const chat = require('./message')
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://Itsme:nirmit2212@cluster0.j6ww2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
const app= express();


//Body parser
app.use(express.json());
app.use(express.urlencoded( { extended : false }));


app.post('/', async(req,res)=> {
    const record = req.body;
    console.log(record);
    const response = await chat.create(record);
    res.send("ok");
    res.end();
    

})
app.get('/', async(req,res)=>{
    //res.send('Hello World!!');
    res.json(await chat.find({}))
});


//gets all members
//app.get('/api/members',(req,res)=> res.json(members));
//set static folder
app.use(express.static(path.join(__dirname,'public')))


const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(PORT))


