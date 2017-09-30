const data_model_array = require('./arrayModel.js');
const data_model_object = require('./objModel');
const objDb = require('./objects_db');
const array_db = require('./array_db');
const user_schema = require('./schema/userSchema');

data_model_array.setDb(array_db);

data_model_object.setDb(objDb);
data_model_object.setSchema(user_schema);

function modelOfArray(name, schema) {
  const new_obj = Object.create(data_model_array);
  new_obj.name = name;
  new_obj.setSchema(schema);
  return new_obj;
}

function modelOfObj(name, schema) {
  const new_obj = Object.create(data_model_object);
  new_obj.name = name;
  new_obj.setSchema(schema);
  return new_obj;
}

const User_Obj = modelOfObj('user', user_schema);
const User = modelOfArray('user', user_schema);
