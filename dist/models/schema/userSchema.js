"use strict";

var user_schema = {
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
  image: {
    type: String
  },
  extra_properties: true
};

module.exports = user_schema;