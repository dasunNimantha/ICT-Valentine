const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const passport = require('passport');
const User = require('../models/User');
const multer = require("multer");
const { Router } = require('express');


router.use(bodyParser.json()) // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true }))
router.use(passport.session());


const authCheck = (req, res, next) => {
    if (!req.user) {
        res.redirect('/auth/google');
    }
    else {
        next();
    }
};


router.get('/',authCheck,(req,res)=>{
    res.render('register');
})


// var idForImage;
// const storage = multer.diskStorage({
//     destination:'./public/uploads',
//     filename : function(req,file,cb){
//         cb(null,idForImage+".jpg");
//     }
// });

// const upload = multer({
//     storage:storage
// }).single('profileImage')


// router.post('/uploadimage',(req,res)=>{
//     idForImage = req.user.googleID;
//     upload(req,res,(err)=>{
//         if(err){
//             console.log(err);
//         } else{
//             console.log('Image uploaded')
            
//         }
//     })
// })

router.post('/submit-form',authCheck,async(req,res)=>{
    const newUser = await User.findOne({googleID: req.user.googleID});
    if(req.body.realname){
        newUser.realName = req.body.realname;    
    }

    if(req.body.age){
        newUser.age = req.body.age;    
    }

    if(req.body.gender1){
        newUser.gender = req.body.gender1;
    }

   

    if(req.body.songs){
        newUser.songs = req.body.songs;  
    }

    if(req.body.singers){
       
        newUser.singers = req.body.singers;    
    }

    if(req.body.movies){
        newUser.movies = req.body.movies;    
    }

    if(req.body.actors){
        newUser.actors = req.body.actors;    
    }

    if(req.body.actresses){
        newUser.actresses = req.body.actresses;    
    }

    if(req.body.books){
        newUser.books = req.body.books;    
    }

    if(req.body.crush){
        newUser.crush = req.body.crush;    
    }

    if(req.body.foods){
        newUser.foods = req.body.foods;
    }

    newUser.save();
    res.send('test');

})




module.exports = router;