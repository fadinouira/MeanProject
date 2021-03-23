const express = require('express');
const Post = require('../models/post');

const router = express.Router();

router.post('',(req,res,next)=> {
  const post = new Post({
    title : req.body.title,
    content : req.body.content
  }) ;
  post.save().then(result => {
    console.log(result._id);
    res.status(201).json({
      message : "post added succesfully",
      id : result._id
    });
  });

})



router.put("/:id", (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  });
  console.log(post);
  Post.updateOne({ _id: req.params.id }, post).then(result => {
    console.log(result);
    res.status(200).json({ message: "Update successful!" });
  });
});

router.get('',(req,res,next)=> {
  Post.find()
    .then(documents => {
      res.status(200).json({
        message : "result from server:",
        posts: documents
      });
    })
    .catch();
});

router.delete('/:id',(req,res,next) => {
  Post.deleteOne({_id : req.params.id}).then(()=>{
    res.status(200).json({message : 'Post deleted !'});
  });

});

module.exports = router ;
