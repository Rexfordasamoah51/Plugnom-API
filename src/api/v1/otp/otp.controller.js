const moment = require("moment");

const user = require("../users/users.entity");

const otpGenerator = require("otp-generator");
const otpmodel = require("../otp/otp.entity");

// This func allow to add minutes to date
function AddMinutesToDate(date, minutes) {
  return new Date(date.getTime() + minutes * 60000);
}

// This function manage the sms sending
exports.sendsms = async (req, res) => {
  if (!req.body.phone) {
    res.status(400).send({ error: "Phoen number field can not be empty" });
  }
  if (!req.body.type) {
    res.status(400).send({ error: "Type field can not be empty" });
  }

  const otp = otpGenerator.generate(6, {
    upperCase: false,
    specialChars: false,
    alphabets: false,
  });
  req.body.otp = otp;
  req.body.expiration_time = AddMinutesToDate(new Date(), 10);

  try {
    await otpmodel.createOtp(req.body).then((result) => {
      res.status(201).send({ result });
    });
    await otpmodel.sendSms(
      req.body.phone,
      `${otp} is your Poddin verification code`
    );
  } catch (err) {
    res.status(404).send({ error: err });
  }
};
