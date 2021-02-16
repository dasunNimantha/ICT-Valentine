const router = require('express').Router();
const bodyParser = require('body-parser');
const Admin = require('../models/Admin');
const passport = require('passport');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

router.use(bodyParser.json()) // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true }))


const maxAge = 24 * 60 * 60;
const cerateToken = (id) =>{
    return jwt.sign({id},keys.jwt.jwtToken ,{
        expiresIn:maxAge
    });
}

router.post('/dashboard',async(req,res)=>{

    try{
        const admin = await Admin.login(req.body.username,req.body.password); 
        const token = cerateToken(admin._id);
        res.cookie('jwt',token,{ httpOnly:true,maxAge:maxAge*1000});
        res.redirect("/dashboard")
    }

    catch(err){
        console.log(err);
    }


       
})

module.exports = router;