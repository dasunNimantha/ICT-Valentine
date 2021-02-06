const jwt = require('jsonwebtoken');

const requireAuth = (req,res,next)=>{
    const token = req.cookies.jwt;

    if(token){
            jwt.verify(token,'HimunThathuwaKethalaHiruwa',(err,decodedToken)=>{
               if(err){
                console.log(err);
                res.redirect('/adminLogin');
               } else{
                   next();
               }
            })
    } else{
        res.redirect('/adminLogin');
    }
}

module.exports = {requireAuth};