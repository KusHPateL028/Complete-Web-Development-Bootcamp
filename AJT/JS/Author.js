const mongoose=require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/Bookhouse",{ useNewUrlParser: true});

var author = mongoose.Schema({     
    title:String,
    img:String,
    quote:String,
    info1:String,
    info2:String,
    info3:String,
    desc1:String,
    desc2:String,
    copy_sold:String,
    book:String,
    award:String
});
var Author = mongoose.model('author', author);

module.exports=Author;