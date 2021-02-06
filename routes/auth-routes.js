const router = require('express').Router();
const passport = require('passport');


// auth login

router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']  
}));

// callback redirect 
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    
    res.redirect('/profile');
});

router.get('/logout',(req,res)=>{
    req.logout();
    res.redirect("/");
})


module.exports = router;