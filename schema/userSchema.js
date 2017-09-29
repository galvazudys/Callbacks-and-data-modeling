const user_schema = {
  name: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  location: {
    type: String
  },
  hobies: {
    type: String
  },
  imageUrl: {
    type: String
  }
};

module.exports = user_schema;
