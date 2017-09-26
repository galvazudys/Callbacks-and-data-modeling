const faker = require('faker');

var data_model_array = {
  db: [
    { name: 'Mr. Josefa Wyman', id: 'ee9d6b8d-4aa5-4f1e-853e-c1e0783bb68d' },
    { name: 'Hillary Hettinger', id: 'fa58fbff-5b95-4a1a-8d71-097191a3a532' },
    { name: 'Conrad Effertz', id: '7260faba-c3e8-45b8-add8-1dc0d1b65fac' },
    { name: 'Grayce Dietrich', id: 'ac871240-931e-4283-b792-17c49c3930ab' },
    { name: 'Henriette Cummerata', id: 'c0bbd2ec-9fef-40b6-abab-69902011f169' },
    { name: 'Angelo Reichert', id: '233763ec-bd43-48fb-a27b-baa1e60ed065' },
    { name: 'Murphy Rosenbaum', id: '519e717b-38aa-4f19-b54c-66d0e4964277' },
    { name: 'Dee Olson', id: '476d59ae-0712-4d47-9a74-0f0d3df00822' },
    { name: 'Chance Denesik', id: '9377822d-08fa-4d6b-aadf-e7c9ff1b556b' },
    { name: 'Ellen Smith Sr.', id: '30d5cde0-5677-4317-8af8-68c06d790bcb' },
    { name: 'Madge Pagac', id: '405cc310-76eb-4f84-849b-fa22f7974834' },
    { name: 'Kiley Schiller', id: 'e7bd2bf3-c61d-4aa5-838e-d19b92d7cf8d' },
    { name: 'Madaline Bartoletti', id: '268bc8a1-a38a-4125-9da0-9cc5a8cf9d94' },
    { name: 'Franz Hartmann', id: 'dacbb149-bfaa-46c4-8448-ccba8b6f97f9' },
    { name: 'Jennifer Renner', id: 'dc1d20c0-7f0d-4708-8b7d-5f78e007ee16' },
    { name: 'Felton Schumm', id: 'fc4a9067-ecbb-42fe-9b4d-4ccfe1f62902' },
    { name: 'Dennis Hintz', id: '14245ac2-d216-4710-9eb1-7e7ec5700333' }
  ],

  create(new_object) {
    let id = faker.random.uuid();
    if (
      !this.db.find(x => {
        if (x.id === id) {
          return true;
        }
      })
    ) {
      this.db.push({ name: new_object, id: id });
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
    this.db.splice(userIndex, 1, { name: new_value, id: entry_id });
  },
  remove(entry_id) {
    const userIndex = this.db.find((user, index) => {
      return user.id === entry_id ? index : null;
    });
    this.db.splice(userIndex, 1);
  }
};

var data_model_object = {
  db: {
    'ee9d6b8d-4aa5-4f1e-853e-c1e0783bb68d': { name: 'Mr. Josefa Wyman' },
    'fa58fbff-5b95-4a1a-8d71-097191a3a532': { name: 'Hillary Hettinger' },
    '7260faba-c3e8-45b8-add8-1dc0d1b65fac': { name: 'Conrad Effertz' },
    'ac871240-931e-4283-b792-17c49c3930ab': { name: 'Grayce Dietrich' },
    'c0bbd2ec-9fef-40b6-abab-69902011f169': { name: 'Henriette Cummerata' },
    '233763ec-bd43-48fb-a27b-baa1e60ed065': { name: 'Angelo Reichert' },
    '519e717b-38aa-4f19-b54c-66d0e4964277': { name: 'Murphy Rosenbaum' },
    '476d59ae-0712-4d47-9a74-0f0d3df00822': { name: 'Dee Olson' },
    '9377822d-08fa-4d6b-aadf-e7c9ff1b556b': { name: 'Chance Denesik' },
    '30d5cde0-5677-4317-8af8-68c06d790bcb': { name: 'Ellen Smith Sr.' },
    '405cc310-76eb-4f84-849b-fa22f7974834': { name: 'Madge Pagac' },
    'e7bd2bf3-c61d-4aa5-838e-d19b92d7cf8d': { name: 'Kiley Schiller' },
    '268bc8a1-a38a-4125-9da0-9cc5a8cf9d94': { name: 'Madaline Bartoletti' },
    'dacbb149-bfaa-46c4-8448-ccba8b6f97f9': { name: 'Franz Hartmann' },
    'dc1d20c0-7f0d-4708-8b7d-5f78e007ee16': { name: 'Jennifer Renner' },
    'fc4a9067-ecbb-42fe-9b4d-4ccfe1f62902': { name: 'Felton Schumm' },
    '14245ac2-d216-4710-9eb1-7e7ec5700333': { name: 'Dennis Hintz' }
  },

  create(new_Object) {
    let id = faker.random.uuid();
    for (let key in this.db) {
      while (key === id) {
        id = faker.random.uuid();
        return id;
      }
    }
    this.db[id] = { name: new_Object };
  },
  read(entry_id){
      const promise = new Promise((resolve,reject)=>{
          const data = this.db[entry_id];
          if(data){
              resolve(data);
          }else{
              reject();
          }
      })

      return promise;
  },
  update(entry_id,newValue){
    if(this.db[entry_id]){
        this.db[entry_id] = {name:newValue}
    }else{
        throw new Error('this user do not exist');
    }
  },
  remove(entry_id){
      if(this.db[entry_id]){
          delete this.db[entry_id];
      }else{
        throw new Error('this user do not exist');        
      }
  }
};


