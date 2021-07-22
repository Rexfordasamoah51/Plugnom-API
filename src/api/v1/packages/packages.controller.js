
const axios = require('axios');
const is20mockUrl = require('../../../config/env.config')['apiEndpoint'];



exports.activateDeactivateDomain = () => {
  let response;
  axios.get(`${is20mockUrl}/package/${packageId}/domain/${domainId}`)

}