const mongoose=require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/Bookhouse",{ useNewUrlParser: true});

var blog_comment = mongoose.Schema({  
    cmt:String,    
    first_name:String,
    last_name:String,
    email:String,
    blog_id:String
});
var Blog_Comment = mongoose.model('blog_comment', blog_comment);

module.exports=Blog_Comment;