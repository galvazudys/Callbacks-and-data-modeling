const faker = require("faker");
const db = require("./array_db");
const user_schema = require('./schema/userSchema');
// const fs = require('fs');
// const newobj={};
// db.forEach((item,index)=>{
//   newobj[item.id] = item;
// })

// console.log(objDb);

// fs.writeFile('./objects_db.js', JSON.stringify(newobj, null, 2) , 'utf-8',()=>{console.log('success')})

// outputs: "Marks, Dean Sr."

var data_model_array = {
  db: db,
  schema: {},
  create(new_object, callBack) {
    let id = faker.random.uuid();
    if (
      !this.db.find(x => {
        if (x.id === id) {
          return true;
        }
      })
    ) {
      new_object.id = id;
      this.db.push(new_object);
      callBack(null,{ message: "success" });
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
      this.db.push({ name: new_object, id: id });
      callBack(null,{ message: "success" });
    }
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
    const userIndex = this.db.find((user, index) => {
      return user.id === entry_id ? index : null;
    });
    new_value.id = entry_id;
    this.db.splice(userIndex, 1, new_value);
    callback(null,{ message: success, value: new_value });
  },
  remove(entry_id, callback) {
    const userIndex = this.db.find((user, index) => {
      return user.id === entry_id ? index : null;
    });
    const confirm = this.db.splice(userIndex, 1);
    callback(null,{ message: `user have been removed` ,object:confirm});
  },

};



module.exports = data_model_array;
