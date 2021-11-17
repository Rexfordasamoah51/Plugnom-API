const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const config = require("../../../config/env.config");

//Setup mongos schema
const userSchema = new Schema(
  {
    full_name: {
      type: String,
      required: [true, "please provide your full name"],
    },
    username: {
      type: String,
      required: true,
      unique: [true, "please provide a unique username"],
      minlength: [8, "minimum username length is 8"],
      maxlength: [8, "maximum username length is 8"],
    },

    phone: {
      type: String,
      required: [true, "please provide your moblie number"],
      unique: [true, "this mobile number is already registered"],
    },
    pin: {
      type: String,
      required: [true, "please provde a pin"],
    },
    account_type: {
      type: String,
      required: true,
      enum: ["Personal", "Business"],
    },
    country: {
      type: String,
      required: [true, "please provide your country"],
      default: "Nigeria",
    },
    gender: {
      type: String,
      required: [true, "please provide your gender"],
      enum: ["Male", "Female"],
    },
    token: {
      type: String,
    },
    permissionLevel: {
      type: Number,
    },
  },
  { timestamps: { createdAt: "created_at" } }
);

userSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
userSchema.set("toJSON", {
  virtuals: true,
});

userSchema.findById = function (cb) {
  return this.model("Users").find({ id: this.id }, cb);
};

//create our model with the schema
const User = mongoose.model("Users", userSchema);

//createUser
exports.createUser = async (userData) => {
  if (await User.findOne({ phone: userData.phone })) {
    throw "Phone Number " + userData.phone + " is already taken";
  }

  if (await User.findOne({ username: userData.username })) {
    throw "Username " + userData.username + " is already taken";
  }
  const user = new User(userData);
  return user.save();
};

//Find user from the database using id
exports.findById = (id) => {
  return User.findById(id).then((result) => {
    result = result.toJSON();
    delete result._id;
    delete result.__v;
    return result;
  });
};

exports.patchUser = (id, userData) => {
  return User.findOneAndUpdate(
    {
      _id: id,
    },
    userData
  );
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
      });
  });
};

exports.removeById = (userId) => {
  return new Promise((resolve, reject) => {
    User.deleteMany({ _id: userId }, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(err);
      }
    });
  });
};

exports.findByEmail = (email) => {
  return User.find({ email: email });
};

exports.findByPhone = (phone) => {
  return User.find({ phone: phone });
};
