const express = require('express');
const multer = require('multer');

const Post = require('../models/post');
const checkAuth = require('../middleware/ckeck');
const router = express.Router();

const MIME_TYPE_MAP = {
  'image/png' : 'png',
  'image/jpeg' : 'jpeg',
  'image/jpg' : 'jpg'
}

const storage = multer.diskStorage({
  destination: (req,file,cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype] ;
    var error = new Error("invalid type");
    if(isValid) {
      error = null ;
    }
    cb(error,"backend/images");
  },
  filename: (req,file,cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const text = MIME_TYPE_MAP[file.mimetype];
    cb(null,name + '-' + Date.now() + '.' + text);
  }
});

router.post("",checkAuth,multer({storage : storage}).single("image"),(req,res,next)=> {
  const url = req.protocol + '://' + req.get("host") ;
  const post = new Post({
    title : req.body.title,
    content : req.body.content,
    imagePath : url + "/images/" + req.file.filename
  }) ;
  post.save().then(result => {
    res.status(201).json({
      message : "post added succesfully",
      post : {
        id : result._id,
        title : result.title,
        content : result.content,
        imagePath : result.imagePath
      }
    });
  });

})



router.put("/:id",checkAuth,multer({storage : storage}).single("image"), (req, res, next) => {
  const url = req.protocol + '://' + req.get("host") ;
  let post ;
  if(req.body.imagePath != ""){

    post = new Post({
      _id: req.params.id,
      title: req.body.title,
      content: req.body.content,
      imagePath : req.body.imagePath
    });
  }
  else {
    post = new Post({
      _id: req.params.id,
      title: req.body.title,
      content: req.body.content,
      imagePath : url + "/images/" + req.file.filename
    });
  }

  Post.updateOne({ _id: req.params.id }, post).then(result => {
    console.log(result);
    res.status(200).json({ message: "Update successful!" });
  });
});

router.get('',(req,res,next)=> {
  console.log(req.query);
  const pageSize = +req.query.pageSize ;
  const currentPage = +req.query.currentPage ;
  const postQuery = Post.find() ;
  let fetchedPosts;
  if(pageSize && currentPage) {
    postQuery
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize);
  }

  postQuery
    .then(documents => {
      fetchedPosts = documents ;
      return Post.countDocuments();
    })
      .then(count => {
        res.status(200).json({
          message : "result from server:",
          posts: fetchedPosts,
          maxPages : count
        });
      })
    .catch();
});



router.delete('/:id',checkAuth,(req,res,next) => {
  Post.deleteOne({_id : req.params.id}).then(()=>{
    res.status(200).json({message : 'Post deleted !'});
  });

});

module.exports = router ;
