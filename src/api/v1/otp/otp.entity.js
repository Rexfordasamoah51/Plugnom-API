const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const config = require("../../../config/env.config");
const client = require("messagebird")(config.authToken);
const moment = require("moment");

//Setup mongos schema
const otpSchema = new Schema(
  {
    phone: {
      type: String,
      required: [true, "please provide your moblie number"],
      unique: [true, "this mobile number is already registered"],
    },
    otp: {
      type: String,
      required: [true, "please provide the otp"],
    },
    expiration_time: {
      type: Date,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: { createdAt: "created_at" } }
);

// Ensure virtual fields are serialised.
otpSchema.set("toJSON", {
  virtuals: true,
});

//create our model with the schema
const Otp = mongoose.model("OTP", otpSchema);

exports.sendSms = async (phone, message) => {
  return new Promise((resolve, reject) => {
    var params = {
      originator: "Poddin",
      recipients: phone,
      body: message,
    };
    client.messages.create(params, (err, response) => {
      if (err) {
        reject(err.errors[0].description);
      } else {
        resolve(err);
      }
      console.log(response);
    });
  });
};

exports.createOtp = async (data) => {
  if (await Otp.findOne({ phone: data.phone })) {
    let startDate = moment(data.created_at).format("YYYY-MM-DD HH:mm:ss");
    var remainingDate = moment(Date.now()).diff(startDate);
    console.log(remainingDate);
    throw `Code has been sent a day `;
  } else {
    const otp = new Otp(data);
    return otp.save();
  }
};

exports.findByPhone = async (phone) => {
  if (await Otp.findOne({ phone: phone })) {
    return true;
  }
  return false;
};
