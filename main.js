const data_model_arrayl = require("./model.js");
const data_model_object = require("./objModel");
const objDb = require("./objects_db");
const user_schema = require('./schema/userSchema');
const  validate = require('./validate');
const obj = {
    name: 'fkjhkewh',
    userName: "fergeferf" ,
    email: '27492347',
    age: '',
    location: "",
    hobies: "parse",
    imageUrl:'http://lorempixel.com/640/480'
  }

validate(['dwedwed','dwwe','dww'],user_schema,(err,result)=>{
  if(err){
    console.log(err);
  }else{
    console.log(result)
  }
});
// require schema

// model.setschema
// model.setDB
// controller.setmodel
