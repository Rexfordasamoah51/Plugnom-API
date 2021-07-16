/* eslint-disable no-unused-vars */

const crypto = require('crypto');
const user = require('../users/users.entity');


exports.insert =  (req, res) => {

  let salt = crypto.randomBytes(16).toString('base64');
  let hash = crypto.createHmac('sha512', salt)
    .update(req.body.password)
    .digest("base64");
  req.body.password = salt + "$" + hash;
  req.body.permissionLevel = 1;
  user.createUser(req.body)
    .then((result) => {
      res.status(201).send({ id: result._id });
    }).catch((e) => res.status(400).send({ error: e }));
};

exports.getById = (req, res) => {
  user.findById(req.params.userId).then((result) => {
    res.status(200).send(result);
  });
};

exports.patchById = (req, res) => {
  if (req.body.password) {
    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
    req.body.password = salt + "$" + hash;
  }
  user.patchUser(req.params.userId, req.body).then((result) => {
    res.status(204).send({});
  });
};

exports.list = (req, res) => {
  let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
  let page = 0;
  if (req.query) {
    if (req.query.page) {
      req.query.page = parseInt(req.query.page);
      page = Number.isInteger(req.query.page) ? req.query.page : 0;
    }
  }
  user.list(limit, page).then((result) => {
    res.status(200).send(result);
  })
};

exports.removeById = (req, res) => {
  user.removeById(req.params.userId)
    .then((result) => {
      res.status(204).send({});
    });
};