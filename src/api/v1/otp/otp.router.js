const router = require("express").Router();
const OTPController = require("./otp.controller");
const ValidationMiddleware = require("../authorization/authorization.validation");
const PermissionMiddleware = require("../authorization/authorization.permission");
const config = require("../../../config/env.config");
const USER = config.permissionLevels.NORMAL_USER;

router.post("/", [OTPController.sendsms]);

module.exports = router;
