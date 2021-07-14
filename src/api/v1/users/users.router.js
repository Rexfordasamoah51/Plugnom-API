const router = require('express').Router();
const UsersController = require('./users.controller');

router.post('/', [
  UsersController.insert
]);

router.get('/', [
  UsersController.list
]);

router.get('/:userId', [
  UsersController.getById
]);

router.patch('/:userId', [
  UsersController.patchById
]);

router.delete('/:userId', [
  UsersController.removeById
]);

module.exports = router;