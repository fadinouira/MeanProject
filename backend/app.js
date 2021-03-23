const exp = require('express') ;
const bodeyParser = require('body-parser') ;
const mongoose = require('mongoose') ;
const Post = require('./models/post');

const app = exp();

mongoose.connect('mongodb+srv://root:fedifedi@meanapp.38mzd.mongodb.net/MeanDB', {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=> {
  console.log("connected successfully !");
})
.catch(()=> {
  console.log("connection failed !");
})

app.use(bodeyParser.json());

app.use((req,res,next)=> {
  res.setHeader('Access-Control-Allow-Origin',"*");
  res.setHeader('Access-Control-Allow-Headers',"Origin,X-Requested-With,Content-Type,Accept");
  res.setHeader('Access-Control-Allow-Methods','GET , POST , PATCH , DELETE , OPTIONS');

  next();

});


app.post('/api/posts',(req,res,next)=> {
  const post = new Post({
    title : req.body.title,
    content : req.body.content
  }) ;
  post.save();
  console.log(post);
  res.status(201).json({
    message : "post added succesfully"
  });
})

app.get('/api/posts',(req,res,next)=> {
  Post.find()
    .then(documents => {
      res.status(200).json({
        message : "result from server:",
        posts: documents
      });
    })
    .catch();


});

module.exports = app;
