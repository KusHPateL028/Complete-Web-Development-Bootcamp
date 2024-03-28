const mongoose=require("mongoose")
const bcrypt = require("bcrypt")

mongoose.connect("mongodb://127.0.0.1:27017/Bookhouse",{ useNewUrlParser: true});

var logincollection = mongoose.Schema({     
    name:String,
    email:String,
    pwd:String
});

logincollection.pre('save',async function(next){
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.pwd,salt)
        this.pwd = hashedPassword;
        next() 
    }catch(error){
        next(error)
    }
})

var LoginCollection = mongoose.model('LoginCollection',logincollection);

module.exports=LoginCollection;