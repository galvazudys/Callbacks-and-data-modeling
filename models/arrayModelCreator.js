const data_model_array = require('./arrayModel');

function modelOfArray(name, schema) {
  const new_obj = Object.create(data_model_array);
  new_obj.name = name;
  new_obj.setSchema(schema);
  return new_obj;
}

module.exports = modelOfArray;
