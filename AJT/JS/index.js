const express = require("express");
const path = require("path");
const fs = require('fs')
const bcrypt = require("bcrypt");
const multer = require("multer");
const cors = require('cors');
const formidable = require('formidable');
const app = express();
const bodyparser = require('body-parser');
const author_Data = require('./fetchAuthorData.js'); 
const Author = require('./Author.js');
const blog_Data = require('./fetchBlogData.js');
const Blog = require('./Blog.js');
const book_Data = require('./fetchBookData.js');
const Book = require('./Book.js');
const LoginCollection = require('./LoginCollection.js');
const img = require('./img.js');
const Contact = require('./Contact');
const Blog_Comment = require('./Blog_Comment.js');
const Book_Review = require('./Book_Review.js');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
const port=3000; 
const hostname="127.0.0.1";















app.set('view engine','ejs');
app.set('views', path.join(__dirname, '../HTML'));
app.use(express.static( path.join(__dirname,'../../AJT')));

app.get('/',(req,res)=>{
    res.status(200).render('CreateAccount.ejs',{err:email_err});
});

let username_err = false;
let email_err = false;
let pwd_err = false;

app.get('/Login',(req,res)=>{
    res.status(200).render('Login.ejs', {err1:username_err,err2:email_err,err3:pwd_err});
});

function getRandomItem(arr, num) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    
    return shuffled.slice(0, num);
}

app.post('/CreateAccount',async(req,res)=>{
    globalThis.myData = new LoginCollection({name:req.body.name,email:req.body.email,pwd:req.body.pwd});
    globalThis.checking = await LoginCollection.findOne({ email: myData.email })
    if(checking===null){
        globalThis.random_book = getRandomItem(books_data,3);
        globalThis.random_author = getRandomItem(authors_data,1);
        myData.save().then(()=>{
            res.status(200).render('Home.ejs' , {name:myData.name , author:random_author , book:random_book , data:books_data});
        }).catch(()=>{
            res.status(400).send("item was not saved to the databs");
        });
    }
    else{
        if (checking.email === myData.email || checking.name === myData.name) {
            email_err=true;
            let msg = "* User already exists"
            res.render('CreateAccount.ejs',{msg:msg,err:email_err})
        }
        else{
            myData.save().then(()=>{
                res.status(200).render('Home.ejs' , {name:myData.name , author:random_author , book:random_book , data:books_data});
            }).catch(()=>{
                res.status(400).send("item was not saved to the databs");
            });
        }
    }
    email_err=false;
    
});

app.post('/Login',async(req,res)=>{
    globalThis.myData = new LoginCollection(req.body);
    globalThis.checking = await LoginCollection.findOne({ name: myData.name })
    if(checking===null){ 
        username_err=true;
        let msg ='* Invalid Username';
        res.render('Login.ejs' , {msg:msg,err1:username_err,err2:email_err,err3:pwd_err});
        
    }
    else if (checking.email === myData.email && checking.name === myData.name) {
        globalThis.random_book = getRandomItem(books_data,3);
        globalThis.random_author = getRandomItem(authors_data,1);
        bcrypt.compare(myData.pwd,checking.pwd,(err,data)=>{
            if(!data){
                pwd_err=true;
                msg ='* Wrong Password';
                res.render('Login.ejs' , {msg:msg,err1:username_err,err2:email_err,err3:pwd_err});
            }
            if(data){
                res.status(200).render('Home.ejs'  ,{name:myData.name , author:random_author , book:random_book , data:books_data});
            }
        });
        pwd_err=false;
    }
    else{
        if(checking.email!= myData.email){
            email_err=true;
            msg ='* Invalid E-mail';
            res.render('Login.ejs' , {msg:msg,err1:username_err,err2:email_err,err3:pwd_err});
        }
    }
    email_err = false;
    username_err = false;
    pwd_err = false;
    
}); 

app.get('/Home',async (req,res)=>{
    globalThis.random_author = getRandomItem(authors_data,1);
    globalThis.random_book = getRandomItem(books_data,3);
    res.status(200).render('Home.ejs',{name:myData.name , author:random_author , book:random_book , data:books_data});
});

book_Data().then((data) => {
    globalThis.books_data=data;
})
.catch((err) => {
    console.error('Error fetching data:', err);
});

app.get('/Book',async (req,res)=>{
    res.status(200).render('Book.ejs',{name:myData.name , data:books_data});
});

app.get('/About_Book',async (req,res)=>{
    let id = req.query.id;
    var about_book = await Book.findOne({ _id: id });
    res.status(200).render('About_Book.ejs',{name:myData.name , data:about_book});
});

app.post('/About_Book' , async(req,res)=>{
    var reviewData = new Book_Review(req.body);
    reviewData.save().then(()=>{
        res.status(200).render('Thanx.ejs' , {name:myData.name});
    }).catch(()=>{
        res.status(400).send("item was not saved to the databs");
    });
});

author_Data().then((data) => {
    globalThis.authors_data=data;
})
.catch((err) => {
    console.error('Error fetching data:', err);
});

app.get('/Author',async(req,res)=>{
    res.status(200).render('Author.ejs',{name:myData.name , data:authors_data});
});

app.get('/About_Author',async (req,res)=>{
    let id = req.query.id;
    var about_author = await Author.findOne({ _id: id });
    var about_book = await Book.find({author:about_author.title})
    res.status(200).render('About_Author.ejs',{name:myData.name , author_data:about_author , book_data:about_book});
});

blog_Data().then((data) => {
    globalThis.blogs_data=data;
})
.catch((err) => {
    console.error('Error fetching data:', err);
});

app.get('/Blog',async (req,res)=>{
    res.status(200).render('Blog.ejs',{name:myData.name , data:blogs_data});
});

app.get('/About_Blog',async (req,res)=>{
    globalThis.id = req.query.id;
    globalThis.prev=0,next=0;
    globalThis.index = blogs_data.findIndex(obj => obj._id==id);
    globalThis.arr=Object.keys(blogs_data)
    globalThis.length=arr.length;
    globalThis.blogs_cmt = await Blog_Comment.find({blog_id:id});
    if(index==0){
        prev=length-1;
        next=index+1;
    }
    else if(index==(length-1)){
        next=0;
        prev=index-1;
    }
    else{
        prev=index-1;
        next=index+1;
    }
    globalThis.about_blog = await Blog.findOne({ _id: id })
    res.status(200).render('About_Blog.ejs',{name:myData.name , data:about_blog , prev:blogs_data[prev] , next:blogs_data[next] , blog_cmt:blogs_cmt});
});

app.post('/About_Blog' , async(req,res)=>{
    var commentData = new Blog_Comment(req.body);
    commentData.save().then(()=>{
        res.status(200).render('About_Blog.ejs',{name:myData.name , data:about_blog , prev:blogs_data[prev] , next:blogs_data[next] , blog_cmt:blogs_cmt});
    }).catch(()=>{
        res.status(400).send("item was not saved to the databs");
    });
});

app.get('/Contact',(req,res)=>{
    res.status(200).render('Contact.ejs',{name:myData.name});
});

app.post('/Contact' , async(req,res)=>{
    var contactData= new Contact(req.body);
    contactData.save().then(()=>{
        res.status(200).render('Thanx.ejs' , {name:myData.name});
    }).catch(()=>{
        res.status(400).send("item was not saved to the databs");
    });
});

app.get('/Thanx',(req,res)=>{
    res.status(200).render('Thanx.ejs',{name:myData.name});
});

var Storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads')
    },
    filename:(req,file,cb)=>{
        console.log(file);
        cb(null,file.originalname);
    }
})
var upload  = multer({
    storage:Storage,
}).single('testImage');

app.post('/Home',upload,async (req,res)=>{
    
    const newImage = new img({
        profile_pic:{
            data:req.file.filename,
            contentType:'image/*',
        }
    })
    await newImage.save().then(()=>{
        res.status(200).render('Home.ejs' , {name:myData.name , author:random_author , book:random_book , data:books_data});
    }).catch(()=>{
        res.status(400).send("item was not saved to the databs");
    });
})

app.listen(port, () => {
    console.log(`The application started successfully on port http://${hostname}:${port}/`);
})