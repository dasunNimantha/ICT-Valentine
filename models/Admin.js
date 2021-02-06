const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const passport = require('passport');

const adminSchema = new mongoose.Schema({
    username:String,
    password:String,
});    

adminSchema.statics.login = async function(username,password){
    const admin = await this.findOne({username});
    if(admin){
        const auth = await bcrypt.compare(password,admin.password);
        
        if(auth){
            return admin;
        }
        throw Error("Incorrect Password")
    } 

    throw Error("Invalid Username")
}

module.exports = mongoose.model('Admin', adminSchema)