const mongoose=require("mongoose")
const bcrypt = require("bcrypt")

mongoose.connect("mongodb://127.0.0.1:27017/Bookhouse",{ useNewUrlParser: true});

var img = mongoose.Schema({     
    img:{
        data:Buffer,
        contentType:String
    }
});


var img = mongoose.model('img',img);

module.exports=img;