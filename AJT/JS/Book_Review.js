const mongoose=require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/Bookhouse",{ useNewUrlParser: true});

var book_review = mongoose.Schema({  
    write:String,    
    name:String,
    email:String
});
var Book_Review = mongoose.model('book_review', book_review);

module.exports=Book_Review;