const faker = require("faker");

// const fs = require('fs');
// const newobj={};
// db.forEach((item,index)=>{
//   newobj[item.id] = item;
// })

// console.log(objDb);

// fs.writeFile('./objects_db.js', JSON.stringify(newobj, null, 2) , 'utf-8',()=>{console.log('success')})

// outputs: "Marks, Dean Sr."

var data_model_array = {
  db: [],
  schema: {},
  name:'',
  setSchema(schema) {
    this.schema = schema;
  },
  setDb(db) {
    this.db = db;
  },
  readAll(callback){
    callback(null,this.db)
  },
  create(new_object, callBack) {
    this.validate(new_object,this.schema,(error,result)=>{
      if(error){
        throw new Error(error.message)
      }else{
        let id = faker.random.uuid();
        if (
          !this.db.find(x => {
            if (x.id === id) {
              return true;
            }
          })
        ) {
          result.id = id;
          this.db.push(result);
          callBack(null, { message: "success" });
        } else {
          while (
            this.db.find(x => {
              if (x.id === id) {
                return true;
              }
            })
          ) {
            id = faker.random.uuid();
            return id;
          }
          this.db.push({ name: result, id: id });
          callBack(null, { message: "success" });
        }
      }
    });

  },
  read(entry_id) {
    const promise = new Promise((resolve, reject) => {
      const data = this.db.find(user => {
        return user.id === entry_id;
      });
      if (data) {
        resolve(data);
      } else {
        reject();
      }
    }).catch(err => {
      return { message: err };
    });
    return promise;
  },
  update(entry_id, new_value, callback) {
    this.validate(new_value,this.schema,(error,result)=>{
      if(error){
        throw new Error(error.message)
      }else{
        const userIndex = this.db.find((user, index) => {
          return user.id === entry_id ? index : null;
        });
        result.id = entry_id;
        this.db.splice(userIndex, 1,result);
        callback(null, { message: success, value: result });
      }
    });

  },
  remove(entry_id, callback) {
    const userIndex = this.db.find((user, index) => {
      return user.id === entry_id ? index : null;
    });
    const confirm = this.db.splice(userIndex, 1);
    callback(null, { message: `user have been removed`, object: confirm });
  },
  validate:function(obj, schema, callback) {
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
              message: "Invalid obj,extra properties not allow in schema."
            },
            null
          );
        }
        for (let key in schema) {
          if (key !== "extra_properties") {
            if (obj[key] === "" && schema[key].required) {
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
            message: "Have to be object passed as argument"
          },
          null
        );
      }
    } else {
      throw new Error("Need pass arguments obj and schema");
    }
  }

};

module.exports = data_model_array;
