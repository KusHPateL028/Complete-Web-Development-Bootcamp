const mongoose=require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/Bookhouse",{ useNewUrlParser: true});

var contact = mongoose.Schema({     
    name:String,
    email:String,
    subject:String,
    msg:String
});
var Contact = mongoose.model('Contact', contact);

module.exports=Contact;