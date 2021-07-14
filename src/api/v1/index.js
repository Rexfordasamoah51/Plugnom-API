const router = require('express').Router();


const usersRoutes  = require('./users')
const healthcheckRoutes = require('./healthcheck');

//health checker
router.use('/healthcheck', healthcheckRoutes);
router.use('/users', usersRoutes)


module.exports = router;
