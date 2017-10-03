'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var faker = require('faker');

var data_model_array = {
  db: [],
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
  create: function create(new_object, callBack) {
    var _this = this;

    this.validate(new_object, this.schema, function (error, result) {
      if (error) {
        throw new Error(error.message);
      } else {
        (function () {
          var id = faker.random.uuid();
          if (!_this.db.find(function (x) {
            if (x.id === id) {
              return true;
            }
          })) {
            result.id = id;
            _this.db.push(result);
            callBack(null, { message: 'success' });
          } else {
            while (_this.db.find(function (x) {
              if (x.id === id) {
                return true;
              }
            })) {
              id = faker.random.uuid();
            }
            _this.db.push({ name: result, id: id });
            callBack(null, { message: 'success' });
          }
        })();
      }
    });
  },
  read: function read(entry_id) {
    var _this2 = this;

    var promise = new Promise(function (resolve, reject) {
      var data = _this2.db.find(function (user) {
        return user.id === entry_id;
      });
      if (data) {
        resolve(data);
      } else {
        reject();
      }
    }).catch(function (err) {
      return { message: err };
    });
    return promise;
  },
  update: function update(entry_id, new_value, callback) {
    var _this3 = this;

    this.validate(new_value, this.schema, function (error, result) {
      if (error) {
        throw new Error(error.message);
      } else {
        var userIndex = _this3.db.find(function (user, index) {
          return user.id === entry_id ? index : null;
        });
        result.id = entry_id;
        _this3.db.splice(userIndex, 1, result);
        callback(null, { message: success, value: result });
      }
    });
  },
  remove: function remove(entry_id, callback) {
    var userIndex = this.db.find(function (user, index) {
      return user.id === entry_id ? index : null;
    });
    var confirm = this.db.splice(userIndex, 1);
    callback(null, { message: 'user have been removed', object: confirm });
  },

  validate: function validate(obj, schema, callback) {
    if (arguments.length == 3) {
      //check or all arguments are passed
      if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === (typeof schema === 'undefined' ? 'undefined' : _typeof(schema)) && !Array.isArray(obj)) {
        //check or is object passed to argument

        //check or have extra properties allowed in schema
        if (schema.extra_properties === false && Object.keys(obj).length !== Object.keys(schema).length - 1) {
          callback({
            message: 'Invalid obj,extra properties not allow in schema.'
          }, null);
        }
        for (var key in schema) {
          if (key !== 'extra_properties') {
            if (obj[key] === '' && schema[key].required) {
              callback({
                message: key + ' field is required'
              }, null);
            }
            if (_typeof(schema[key].type()) !== _typeof(obj[key])) {
              callback({
                message: 'incorrect value type ' + key.type + ',expected ' + schema[key].type() + ' and got ' + _typeof(obj[key])
              }, null);
            }
            if (_typeof(schema[key].type()) === _typeof(obj[key])) {
              continue;
            }
          }
        }
        callback(null, obj);
      } else {
        callback({
          message: 'Have to be object passed as argument'
        }, null);
      }
    } else {
      throw new Error('Need pass arguments obj and schema');
    }
  },
  search: function search(name, callback) {
    var matches = this.db.filter(function (item) {
      return Object.keys(item).some(function (key) {
        var value = JSON.stringify(item[key]).toLowerCase().includes(name.toLowerCase());
        return value;
      });
    });
    callback(null, matches);
  }
};

module.exports = data_model_array;