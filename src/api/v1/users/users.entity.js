const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Setup mongos schema
const userSchema = new Schema({
  organizationName: String,
  fullName: String,
  email: String,
  country: String,
  telephone: String,
  password: String,
  permissionLevel: Number
})

//create our model with the schema
const User = mongoose.model('Users', userSchema);

//createUser
exports.createUser = (userData) => {
  const user = new User(userData);
  return user.save();
};

//Find user from the database using id
exports.findById = (id) => {
  return User.findById(id)
    .then((result) => {
      result = result.toJSON();
      delete result._id;
      delete result.__v;
      return result;
    });
};


exports.patchUser = (id, userData) => {
  return User.findOneAndUpdate({
    _id: id
  }, userData);
};

exports.list = (perPage, page) => {
  return new Promise((resolve, reject) => {
    User.find()
      .limit(perPage)
      .skip(perPage * page)
      .exec(function (err, users) {
        if (err) {
          reject(err);
        } else {
          resolve(users);
        }
      })
  });
};

exports.removeById = (userId) => {
  return new Promise((resolve, reject) => {
      User.deleteMany({_id: userId}, (err) => {
          if (err) {
              reject(err);
          } else {
              resolve(err);
          }
      });
  });
};