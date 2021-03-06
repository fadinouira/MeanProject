const jwt = require('jsonwebtoken');
module.exports = (req,res,next) => {
  try{
    const token = req.headers.authorization.split(" ")[1];
    var decodedToken = jwt.verify(token, "mythicalshadows1996");
    req.userData = {
      email : decodedToken.email ,
      id: decodedToken.id
    };
    next();
  } catch (err) {
    res.status(401).json({
      message : "Auth Failed"
    });
  }
};
