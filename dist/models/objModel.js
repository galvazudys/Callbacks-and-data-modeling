'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var faker = require('faker');

var data_model_object = {
  db: {},
  schema: {},
  name: '',
  setSchema: function setSchema(schema) {
    this.schema = schema;
  },
  setDb: function setDb(db) {
    this.db = db;
  },
  readAll: function readAll(callback) {
    callback(null, this.db);
  },
  create: function create(new_Object, callback) {
    var _this = this;

    this.validate(new_Object, this.schema, function (error, result) {
      if (error) {
        throw new Error(error.message);
      } else {
        var id = faker.random.uuid();
        for (var key in _this.db) {
          while (key === id) {
            id = faker.random.uuid();
            return id;
          }
        }
        _this.db[id] = result;
        callback({ message: 'success' });
      }
    });
  },
  read: function read(entry_id) {
    var _this2 = this;

    var promise = new Promise(function (resolve, reject) {
      var data = _this2.db[entry_id];
      if (data) {
        resolve(data);
      } else {
        reject({ message: 'Error  occurred while injecting data' });
      }
    }).catch(function (err) {
      return { message: err };
    });

    return promise;
  },
  update: function update(entry_id, newValue, callback) {
    var _this3 = this;

    this.validate(newValue, this.schema, function (error, result) {
      if (error) {
        throw new Error(error.message);
      } else {
        if (_this3.db[entry_id]) {
          _this3.db[entry_id] = result;
          callback({ message: 'success' });
        } else {
          throw new Error('this user do not exist');
        }
      }
    });
  },
  remove: function remove(entry_id, callback) {
    if (this.db[entry_id]) {
      delete this.db[entry_id];
      callback({ message: 'success' });
    } else {
      throw new Error('this user do not exist');
    }
  },

  validate: function validate(obj, schema, callback) {
    if (arguments.length == 3) {
      //check or all arguments are passed
      if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === (typeof schema === 'undefined' ? 'undefined' : _typeof(schema)) && !Array.isArray(obj)) {
        //check or is object passed to argument

        //check or have extra properties allowed in schema
        if (schema.extra_properties === false && Object.keys(obj).length !== Object.keys(schema).length - 1) {
          return callback({
            message: 'Invalid obj,extra properties not allow in schema.'
          }, null);
        }
        for (var key in schema) {
          if (key !== 'extra_properties') {
            if (obj[key] === '' && schema[key].required) {
              return callback({
                message: key + ' field is required'
              }, null);
            }
            if (_typeof(schema[key].type()) !== _typeof(obj[key])) {
              return callback({
                message: 'incorrect value type ' + key.type + ',expected ' + schema[key].type() + ' and got ' + _typeof(obj[key])
              }, null);
            }
            if (_typeof(schema[key].type()) === _typeof(obj[key])) {
              continue;
            }
          }
        }
        return callback(null, obj);
      } else {
        callback({
          message: 'Have to be object passed as argument'
        }, null);
      }
    } else {
      throw new Error('Need pass arguments obj and schema');
    }
  },
  search: function search(searchTerm, callback) {
    var results = [];
    for (var key in this.db) {
      if (this.db.hasOwnProperty(key)) {
        var element = this.db[key];
        for (var i in element) {
          var result = JSON.stringify(element[i]).toLowerCase().includes(searchTerm.toLowerCase());
          if (result) {
            results.push(this.db[key]);
          }
        }
      }
    }
    callback(null, results);
  }
};

module.exports = data_model_object;