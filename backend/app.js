const exp = require('express') ;
const bodeyParser = require('body-parser') ;
const mongoose = require('mongoose') ;
const postsRoutes = require('./routes/posts')
const app = exp();

mongoose.connect('mongodb+srv://root:fedifedi@meanapp.38mzd.mongodb.net/MeanDB', {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=> {
  console.log("connected successfully !");
})
.catch(()=> {
  console.log("connection failed !");
})

app.use(bodeyParser.json());
app.use(bodeyParser.urlencoded({ extended: false}));

app.use((req,res,next)=> {
  res.setHeader('Access-Control-Allow-Origin',"*");
  res.setHeader('Access-Control-Allow-Headers',"Origin,X-Requested-With,Content-Type,Accept");
  res.setHeader('Access-Control-Allow-Methods','GET , POST , PATCH , DELETE , OPTIONS,PUT');

  next();

});

app.use('/api/posts',postsRoutes);




module.exports = app;
