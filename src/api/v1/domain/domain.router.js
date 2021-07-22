const router = require('express').Router();

const domainController = require('./domain.controller');

router.get('/', domainController.listDomain);
router.get('/:name', domainController.searchDomain)
router.get('/verification', domainController.verifyDomain)

module.exports = router;