const { Router } = require('express');

const router = require('express').Router();

const authCheck = (req, res, next) => {
    if (!req.user) {
    
        res.redirect('/auth/google');
    } else if(req.user.isRegistered == false){
        res.redirect('/register');
        
    } else {
        next();
    }
};


router.get('/',authCheck,(req,res)=>{
    res.render('profile',{user:req.user});
}) 


router.get("/home",(req,res)=>{
    res.render("/")
})


module.exports = router;