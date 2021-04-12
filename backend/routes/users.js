const express = require('express');
const User = require("../models/user");
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user = require('../models/user');

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

router.post('/login',(req,res,next) => {
  User.findOne({email : req.body.email})
    .then(user => {
      if(!user) {
        console.log("wrong email");
        return res.status(401).json({
          message: "Email do not exist"
        });
      }
      else {
        return bcrypt.compare(req.body.password,user.password);
      }
    })
    .then(result => {
      if(!result){
        console.log("wrong pass");
        return res.status(401).json({
          message : "wrong password !"
        });
      }
      const token = jwt.sign(
        {
        email : user.email,
        id : user._id
        },
        "ksjdlkqjdaz_èçe_akejjh&éké&àskdjlksqjlkdqjs" ,
        {
          expiresIn : "1h"
        }
      );
      res.status(200).json({
        message : "connected",
        token,
        expiresIn : "1h"
      })

    })
    .catch(err => {
      console.log("auth failed");
      return res.status(401).json({
        message : "auth failed !"
      });
    })
});


module.exports = router ;
