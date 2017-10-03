'use strict';

var data_model_object = require('./objModel');

function modelOfObj(name, schema) {
  var new_obj = Object.create(data_model_object);
  new_obj.name = name;
  new_obj.setSchema(schema);
  return new_obj;
}

module.exports = modelOfObj;