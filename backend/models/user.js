const mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  eamil : {type: String, required : true, unique:true},
  password : {type:String , required : true},
  name : {type: String , required : true },
  age : {type : Number , required : true}
});

userSchema.plugin(unique);

module.exports = mongoose.model('User',userSchema);


