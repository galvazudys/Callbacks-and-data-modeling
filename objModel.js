const faker = require('faker');

var data_model_object = {
  db: {},
  schema: {},
  name: '',
  setSchema(schema) {
    this.schema = schema;
  },
  setDb(db) {
    this.db = db;
  },
  readAll(callback) {
    callback(null, this.db);
  },
  create(new_Object, callback) {
    this.validate(new_Object, this.schema, (error, result) => {
      if (error) {
        throw new Error(error.message);
      } else {
        let id = faker.random.uuid();
        for (let key in this.db) {
          while (key === id) {
            id = faker.random.uuid();
            return id;
          }
        }
        this.db[id] = result;
        callback({ message: 'success' });
      }
    });
  },
  read(entry_id) {
    const promise = new Promise((resolve, reject) => {
      const data = this.db[entry_id];
      if (data) {
        resolve(data);
      } else {
        reject({ message: 'Error  occurred while injecting data' });
      }
    }).catch(err => {
      return { message: err };
    });

    return promise;
  },
  update(entry_id, newValue, callback) {
    this.validate(newValue, this.schema, (error, result) => {
      if (error) {
        throw new Error(error.message);
      } else {
        if (this.db[entry_id]) {
          this.db[entry_id] = result;
          callback({ message: 'success' });
        } else {
          throw new Error('this user do not exist');
        }
      }
    });
  },
  remove(entry_id, callback) {
    if (this.db[entry_id]) {
      delete this.db[entry_id];
      callback({ message: 'success' });
    } else {
      throw new Error('this user do not exist');
    }
  },
  validate: function(obj, schema, callback) {
    if (arguments.length == 3) {
      //check or all arguments are passed
      if (typeof obj === typeof schema && !Array.isArray(obj)) {
        //check or is object passed to argument

        //check or have extra properties allowed in schema
        if (
          schema.extra_properties === false &&
          Object.keys(obj).length !== Object.keys(schema).length - 1
        ) {
          return callback(
            {
              message: 'Invalid obj,extra properties not allow in schema.'
            },
            null
          );
        }
        for (let key in schema) {
          if (key !== 'extra_properties') {
            if (obj[key] === '' && schema[key].required) {
              return callback(
                {
                  message: `${key} field is required`
                },
                null
              );
            }
            if (typeof schema[key].type() !== typeof obj[key]) {
              return callback(
                {
                  message: `incorrect value type ${key.type},expected ${schema[
                    key
                  ].type()} and got ${typeof obj[key]}`
                },
                null
              );
            }
            if (typeof schema[key].type() === typeof obj[key]) {
              continue;
            }
          }
        }
        return callback(null, obj);
      } else {
        callback(
          {
            message: 'Have to be object passed as argument'
          },
          null
        );
      }
    } else {
      throw new Error('Need pass arguments obj and schema');
    }
  },
  search(searchTerm, callback) {
    let results = [];
    for (var key in this.db) {
      if (this.db.hasOwnProperty(key)) {
        const element = this.db[key];
        for (var i in element) {
          let result = JSON.stringify(element[i])
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
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
