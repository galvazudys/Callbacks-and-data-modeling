const data_model_array = require('./models/arrayModel.js');
const data_model_object = require('./models/objModel');
const objDb = require('./objects_db');
const array_db = require('./array_db');
const user_schema = require('./models/schema/userSchema');
const arrayModelCreator = require('./models/arrayModelCreator');
const objModelCreator = require('./models/objModelCreator');

// Set Db
data_model_array.setDb(array_db);
data_model_object.setDb(objDb);

const User = arrayModelCreator('user', user_schema);

User.readAll((error, result) => {
  console.log(result);
});
