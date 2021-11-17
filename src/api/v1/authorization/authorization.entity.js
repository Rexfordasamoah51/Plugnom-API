const user = require("../users/users.entity");
const crypto = require("crypto");

exports.hasAuthValidFields = (req, res, next) => {
  let errors = [];

  if (req.body) {
    if (!req.body.phone) {
      errors.push("Missing phone field");
    }
    if (!req.body.pin) {
      errors.push("Missing pin field");
    }

    if (errors.length) {
      return res.status(400).send({ errors: errors.join(",") });
    } else {
      return next();
    }
  } else {
    return res.status(400).send({ errors: "Missing phone and pin fields" });
  }
};

exports.isPinAndUserMatch = (req, res, next) => {
  user.findByPhone(req.body.phone).then((user) => {
    if (!user[0]) {
      res.status(404).send({});
    } else {
      let pinFields = user[0].pin.split("$");
      let salt = pinFields[0];
      let hash = crypto
        .createHmac("sha512", salt)
        .update(req.body.pin)
        .digest("base64");
      if (hash === pinFields[1]) {
        req.body = {
          userId: user[0]._id,
          pin: user[0].pin,
          permissionLevel: user[0].permissionLevel,
          provider: "pin",
          name: user[0].firstName + " " + user[0].lastName,
        };
        return next();
      } else {
        return res
          .status(400)
          .send({ errors: ["Invalid phone number or pin"] });
      }
    }
  });
};
