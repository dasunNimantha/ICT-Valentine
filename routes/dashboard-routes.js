const router = require('express').Router();
const User = require('../models/User');
const cookieParser = require('cookie-parser');
const {requireAuth} = require('../middleware/authMiddleware');

let registeredCount=0;
let matchedCount=0;
let unmatchedCount=0;
let siteVisitorsCount=0;

            
router.get('/',requireAuth,function(req,res){
    
    User.find({},(err,result)=> {
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


router.get('/user/:code',requireAuth,async(req,res)=>{
   const reqUser = await User.findOne({googleID:req.params.code});

   
   if(reqUser){

    User.find({matched:'false'},(err,result)=>{
        let totalUsers = result.length;
        let suggestCount=0;
        suggestArray = [];
        for(var j=0;j<totalUsers;j++){
            if((result[j].gender!=reqUser.gender) &&(result[j].userEmail !=reqUser.userEmail)){
                suggestArray[j]=result[j];
                suggestCount++;
            }
        }
        
        res.render('app-profile',{reqUser,suggestCount,suggestArray});
        
    })
     

   } else {
       console.log("User not exists on the database")
   }
})

router.get('/match/:code',requireAuth,async(req,res)=>{
   console.log(req.params.code);
   res.send("updated user "+req.params.code); 
});



module.exports = router;