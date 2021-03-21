const exp = require('express') ;
const bodeyParser = require('body-parser') ;

const app = exp();

app.use(bodeyParser.json());

app.use((req,res,next)=> {
  res.setHeader('Access-Control-Allow-Origin',"*");
  res.setHeader('Access-Control-Allow-Headers',"Origin,X-Requested-With,Content-Type,Accept");
  res.setHeader('Access-Control-Allow-Methods','GET , POST , PATCH , DELETE , OPTIONS');

  next();

});


app.post('/api/posts',(req,res,next)=> {
  const post = req.body ;
  console.log(post);
  res.status(201).json({
    message : "post added succesfully"
  });
})

app.get('/api/posts',(req,res,next)=> {
  const post = {
    id : "1",
    title : "fedi",
    content : "hey"
  }
  const post1 = {
    id : "2",
    title : "akrem",
    content : "hey fedi your server is perfect"
  }
  const post2 = {
    id : "3",
    title : "ghassen",
    content : "this server is sooo good !"
  }

  const posts = [];

  posts.push(post);
  posts.push(post1);
  posts.push(post2);

  res.status(200).json({
    message : "result from server:",
    posts: posts
  });

});

module.exports = app;
