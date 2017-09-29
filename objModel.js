const faker = require('faker')


var data_model_object = {
  db:{},
  schema:{},
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

module.exports = data_model_object;
