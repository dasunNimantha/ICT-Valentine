const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./keys');
const express = require('express');
const User = require('../models/User');
const router = express.Router();

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});


passport.use(
    new GoogleStrategy({
        // options for google strategy
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: '/auth/google/redirect'
    }, (accessToken, refreshToken, profile, done) => {


          // check user existance

       User.findOne({googleID:profile.id}).then((currentUser)=>{
            if (currentUser){
                console.log("User Exists");
                done(null,currentUser);
         
            } else {
                new User({
                    username: profile.displayName,
                    googleID: profile.id,
                    userEmail: profile._json.email,
                    userPhotoLink: profile._json.picture,
                    isRegistered : false,
                    matched: false
                
                }).save().then((newUser) => {
                    console.log('new user created' + newUser);
                    done(null,newUser);
                })
    
            }
       })
 

    })
);

module.exports = router;