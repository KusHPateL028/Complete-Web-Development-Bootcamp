const mongoose=require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/Bookhouse",{useNewUrlParser: true});

function getNextSequenceValue(sequenceName){
    var sequenceDocument = db.counters.findAndModify({
       query:{_id: sequenceName },
       update: {$inc:{sequence_value:1}},
       new:true
    });
    return sequenceDocument.sequence_value;
 }

var book = mongoose.Schema({ 
    title:String,
    img:String,
    price:String,
    desc:String,
    category:String,
    info1:String,
    info2:String,
    info3:String
});
var Book = mongoose.model('book', book);

module.exports=Book;