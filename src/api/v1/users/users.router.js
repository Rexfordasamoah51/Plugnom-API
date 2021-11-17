const router = require("express").Router();
const UsersController = require("./users.controller");
const PermissionMiddleware = require("../authorization/authorization.permission");
const ValidationMiddleware = require("../authorization/authorization.validation");
const config = require("../../../config/env.config");

const ADMIN = config.permissionLevels.ADMIN;
const USER = config.permissionLevels.NORMAL_USER;

router.post("/", [UsersController.insert]);

router.get("/", [
  ValidationMiddleware.validJWTNeeded,
  PermissionMiddleware.minimumPermissionLevelRequired(USER),
  UsersController.list,
]);

router.get("/:userId", [
  ValidationMiddleware.validJWTNeeded,
  PermissionMiddleware.minimumPermissionLevelRequired(USER),
  PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
  UsersController.getById,
]);

router.patch("/:userId", [
  ValidationMiddleware.validJWTNeeded,
  PermissionMiddleware.minimumPermissionLevelRequired(USER),
  PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
  UsersController.patchById,
]);
router.delete("/:userId", [
  ValidationMiddleware.validJWTNeeded,
  PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
  UsersController.removeById,
]);

module.exports = router;
