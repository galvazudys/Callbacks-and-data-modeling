const express = require('express');
const router = express.Router();
const data_model_array = require('../models/arrayModel.js');
const array_db = require('../array_db');
const user_schema = require('../models/schema/userSchema');
const arrayModelCreator = require('../models/arrayModelCreator');
data_model_array.setDb(array_db);

const User = arrayModelCreator('user', user_schema);

router.get('/', (req, res, next) => {
  User.readAll((error, result) => {
    console.log('bla')
    res.render('homePage', { result: result });
  });
});

module.exports = router;
