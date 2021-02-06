const router = require('express').Router();
const User = require('../models/User');
const {requireAuth} = require('../middleware/authMiddleware');

let registeredCount=0;
let matchedCount=0;
let unmatchedCount=0;
let siteVisitorsCount=0;

            
router.get('/',requireAuth,function(req,res){
    
    User.find({},(err,result)=>{
        let objectCount = result.length;
        registeredCount= objectCount;
        var users = [];

        for(var i=0;i<objectCount;i++){
            users[i]=result[i];

            if(result[i].matched == true){
                matchedCount++;
            } else {
                unmatchedCount++;
            }
            
        }


        res.render("dashboard",{registeredCount,matchedCount,unmatchedCount,siteVisitorsCount,users});

        registeredCount=0;
        matchedCount=0;
        unmatchedCount=0;
    })
    
    
    
})

module.exports = router;