const router = require("express").Router();
const AuthUserMiddleware = require("./authorization.entity");
const AuthorizationController = require("./authorization.controller");
const AuthValidationMiddleware = require("./authorization.validation");

router.post("/", [
  AuthUserMiddleware.hasAuthValidFields,
  AuthUserMiddleware.isPinAndUserMatch,
  AuthorizationController.login,
]);

router.post("/refresh", [
  AuthValidationMiddleware.validJWTNeeded,
  AuthValidationMiddleware.verifyRefreshBodyField,
  AuthValidationMiddleware.validRefreshNeeded,
  AuthorizationController.login,
]);

module.exports = router;
