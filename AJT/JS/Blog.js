const mongoose=require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/Bookhouse",{ useNewUrlParser: true});

var blog = mongoose.Schema({ 
    name:String,    
    title:String,
    img:String,
    quote:String,
    info1:String,
    info2:String,
    info3:String,
    info4:String,
    desc:String
});
var Blog = mongoose.model('blog', blog);

module.exports = Blog;