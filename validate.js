module.exports = function(obj, schema, callback) {
  if (arguments.length == 3) {
    if (typeof obj === typeof schema && !Array.isArray(obj)) {
      if (Object.keys(obj).length !== Object.keys(schema).length) {
        return callback(
          {
            message:
              "Invalid obj,missing one of keys to a object,please check or submited object keys is not missing"
          },
          null
        );
      }
      for (let key in schema) {
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
};
