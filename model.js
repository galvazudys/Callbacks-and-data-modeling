const faker = require("faker");
const db = require("./array_db");
const objDb = require("./objects_db");
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

  create(new_object, callBack) {
    let id = faker.random.uuid();
    if (
      !this.db.find(x => {
        if (x.id === id) {
          return true;
        }
      })
    ) {
      const weHaveData = this.db.push({ name: new_object, id: id });
      console.log(weHaveData);
      callBack({ message: "success" });
    } else {
      while (
        db.find(x => {
          if (x.id === id) {
            return true;
          }
        })
      ) {
        id = faker.random.uuid();
        return id;
      }
      this.db.push({ name: new_object, id: id });
      callBack({ message: "success" });
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
    });
    return promise;
  },
  update(entry_id, new_value) {
    const userIndex = this.db.find((user, index) => {
      return user.id === entry_id ? index : null;
    });
    this.db.splice(userIndex, 1, {
      name: new_value,
      id: entry_id
    });
  },
  remove(entry_id) {
    const userIndex = this.db.find((user, index) => {
      return user.id === entry_id ? index : null;
    });
    this.db.splice(userIndex, 1);
  }
};

var data_model_object = {
  db: objDb,

  create(new_Object) {
    let id = faker.random.uuid();
    for (let key in this.db) {
      while (key === id) {
        id = faker.random.uuid();
        return id;
      }
    }
    this.db[id] = {
      name: new_Object
    };
  },
  read(entry_id) {
    const promise = new Promise((resolve, reject) => {
      const data = this.db[entry_id];
      if (data) {
        resolve(data);
      } else {
        reject();
      }
    });

    return promise;
  },
  update(entry_id, newValue) {
    if (this.db[entry_id]) {
      this.db[entry_id] = {
        name: newValue
      };
    } else {
      throw new Error("this user do not exist");
    }
  },
  remove(entry_id) {
    if (this.db[entry_id]) {
      delete this.db[entry_id];
    } else {
      throw new Error("this user do not exist");
    }
  }
};



data_model_array.read("87be3db8-fc75-4996-aa49-8f94ed5f8d9a").then((d)=>{console.log(d)});
