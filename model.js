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
      new_object.id = id;
      this.db.push(new_object);
      callBack({ message: "success" });
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
    callback({ message: success, value: new_value });
  },
  remove(entry_id, callback) {
    const userIndex = this.db.find((user, index) => {
      return user.id === entry_id ? index : null;
    });
    const confirm = this.db.splice(userIndex, 1);
    callback({ message: `user ${confirm[0]} have been removed` });
  }
};

data_model_array.remove("87be3db8-fc75-4996-aa49-8f94ed5f8d9a", x => {
  console.log(x);
});
data_model_array.create(
  {
    user: { name: "stepas", userName: "skerdykas" },
    email: "Lisandro40@gmail.com",
    age: 51,
    location: "Andorra",
    hobies: "input",
    image: "http://lorempixel.com/640/480"
  },
  e => {
    console.log(data_model_array.db, e);
  }
);

var data_model_object = {
  db: objDb,

  create(new_Object, callback) {
    let id = faker.random.uuid();
    for (let key in this.db) {
      while (key === id) {
        id = faker.random.uuid();
        return id;
      }
    }
    this.db[id] = new_Object;
    callback({ message: "success" });
  },
  read(entry_id) {
    const promise = new Promise((resolve, reject) => {
      const data = this.db[entry_id];
      if (data) {
        resolve(data);
      } else {
        reject({ message: "Error  occurred while injecting data" });
      }
    }).catch(err => {
      return { message: err };
    });

    return promise;
  },
  update(entry_id, newValue, callback) {
    if (this.db[entry_id]) {
      this.db[entry_id] = newValue;
      callback({ message: "success" });
    } else {
      throw new Error("this user do not exist");
    }
  },
  remove(entry_id, callback) {
    if (this.db[entry_id]) {
      delete this.db[entry_id];
      callback({ message: "success" });
    } else {
      throw new Error("this user do not exist");
    }
  }
};

data_model_array
  .read("87be3db8-fc75-4996-aa49-8f94ed5f8d9a")
  .then(d => {
    console.log(d);
  })
  .catch(err => {
    console.log(err);
  });
