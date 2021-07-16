const router = require('express').Router();
const UsersController = require('./users.controller');
const PermissionMiddleware = require('../authorization/authorization.permission');
const ValidationMiddleware = require('../authorization/authorization.validation');
const config = require('../../../config/env.config');

const ADMIN = config.permissionLevels.ADMIN;
const PAID = config.permissionLevels.PAID_USER;
const FREE = config.permissionLevels.NORMAL_USER;

router.post('/', [
  UsersController.insert

]);

router.get('/', [
  ValidationMiddleware.validJWTNeeded,
  PermissionMiddleware.minimumPermissionLevelRequired(PAID),
  UsersController.list
]);


router.get('/:userId', [
  ValidationMiddleware.validJWTNeeded,
  PermissionMiddleware.minimumPermissionLevelRequired(FREE),
  PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
  UsersController.getById
]);

router.patch('/:userId', [
  ValidationMiddleware.validJWTNeeded,
  PermissionMiddleware.minimumPermissionLevelRequired(FREE),
  PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
  UsersController.patchById
]);
router.delete('/:userId', [
  ValidationMiddleware.validJWTNeeded,
  PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
  UsersController.removeById
]);

module.exports = router;