const router = require('express').Router();
const usersRoutes  = require('./users');
const healthcheckRoutes = require('./healthcheck');
const authRoutes = require('./authorization');


//health checker
router.use('/healthcheck', healthcheckRoutes);
router.use('/users', usersRoutes)
router.use('/login', authRoutes)

module.exports = router;
