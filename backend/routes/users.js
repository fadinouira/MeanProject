const express = require('express');
const User = require("../models/user");
const router = express.Router();
const bcrypt = require('bcrypt');

router.post("/signup",(req,res,next)=> {
  bcrypt.hash(req.body.password,10)
  .then(hash => {
    const user = new User({
      email : req.body.email,
      password : hash,
      name : req.body.name,
      age : req.body.age
    });
    user.save()
    .then(result => {
      res.status(201).json({
        message : "user added successfully !",
        result : result
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error : err
      });
    });
  });
});


module.exports = router ;
