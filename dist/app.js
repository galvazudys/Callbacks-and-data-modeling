'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _profiles = require('./routes/profiles');

var _profiles2 = _interopRequireDefault(_profiles);

var _home = require('./routes/home');

var _home2 = _interopRequireDefault(_home);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

//routes


app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use((0, _cookieParser2.default)());
app.set('view engine', 'ejs');
app.set('views', _path2.default.join(__dirname, 'views'));
app.use(_express2.default.static(_path2.default.join(__dirname, 'public')));

app.use(_home2.default);
app.use(_profiles2.default);

module.exports = app;