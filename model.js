const faker = require('faker');

const randomName = faker.name.findName();



var data_model_array = {
	db: []
	create(new_object) {
		// assigns a unique ID to each object
		//   once an ID has been used for one object, it can never be used for another
		//   once an object has been given an ID, it can never be given a new one
		// adds the object to db
	},
	read(entry_id) {
		return // object associated with that id
	},
	update(entry_id, new_value) {
		// replace said entry with said value
	},
	remove(entry_id) {
		// remove object with said id
		// this operation must not change other objects' id's
	}
};

var data_model_object = {
	db: // object 
	// ...
}