const express = require('express')
const router = express.Router()
const user = require('./userdb')
const jwt = require('jsonwebtoken')

router.post("/login", async (req,res)=> {
    const {email , password} = req.body;
    if(!email  || !password)
        return res.json({message: "Invalid credentials"});
    const userE = await user.findOne({email : email});
    if(userE) 
    {
        if(userE.password === password)
        {
            chats = userE.chats
            userid = userE.userid
            //res.json(userE)
            const payload = {
                email,
                chats,
                userid
            };
            const token = jwt.sign(payload, "secret")//, {expiresIn: "1d"}, (err,token)=>{
            //     if(err) console.log(err)
            //     else{
            //         //res.cookie("jwt", token);
            //         //return res.json(token)

            //         //res.send("Hello")
            //         return res.json({
            //             message: "User logged in",
            //             token: token
            //     });
            //     }
            // })

            res.json({"token":token})
        }
        else{

            return res.json({message: "Incorrect Pasword"});
        }
    }
    else{
        return res.json({message: "Invalid credentials"});
    }

    res.end()
})

router.post("/signup", async (req,res)=>{
    const {email , password} = req.body;
    if(!email  || !password)
        return res.json({message: "Invalid credentials"});
    
    const userExists = await user.findOne({email : email});
    console.log(userExists);

    if(userExists) return res.json({ message: "User already exists"})
    else{
        const record = req.body;
        await user.create(record);
        res.json({message: "Registration Successful"})
    }
    res.json(req.body)
    res.end()

})

module.exports = router;


