'use strict';

var express = require('express');
var router = express.Router();
var data_model_array = require('../models/arrayModel.js');
var array_db = require('../array_db');
var user_schema = require('../models/schema/userSchema');
var arrayModelCreator = require('../models/arrayModelCreator');
data_model_array.setDb(array_db);

var User = arrayModelCreator('user', user_schema);

router.get('/', function (req, res, next) {
  User.readAll(function (error, result) {
    console.log('bla');
    res.render('homePage', { result: result });
  });
});

module.exports = router;