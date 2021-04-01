const express = require("express");
const mongoose = require("mongoose");
const app = express();
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
const adminRoutes = require('./routes/admin-routes');
const dashboardRoutes = require('./routes/dashboard-routes')
const register = require('./routes/register');
const passport = require('passport');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const cookieParser = require("cookie-parser");


app.use(cookieSession({
    maxAge:48*60*60*1000,
    keys:[keys.session.cookieKey]
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));
app.use('/dashboard',dashboardRoutes);
app.use('/auth', authRoutes);
app.use('/profile',profileRoutes);
app.use('/admin',adminRoutes);
app.use('/register',register);



mongoose.connect(keys.mongodb.dubURI,()=>{
    console.log("Connected to mongoDb")
});

app.set('view engine','ejs');

app.get("/",async(req,res)=>{
    if (!req.user) {
       res.render("index",{user:req.user});  
    } else if(req.user.isRegistered == false){
        req.logout();
        res.redirect("/");
    }
    else {
        res.render("profile",{user:req.user});
    }
    
});

app.get("/home",(req,res)=>{
    res.render("index",{user:req.user})
})

app.get('/adminLogin',(req,res)=>{
    res.render("admin-login");
})



app.get("*",function(req,res){
    res.render('404');
})




const PORT = 5000;
app.listen(process.env.PORT || PORT, function() {
    console.log("server running on port 5000");
});
