


const axios = require('axios');
const is20mockUrl = require('../../../config/env.config')['20imockUrl'];
const bearer = require('../../../config/env.config')['bearer']

const instance = axios.create({
  baseURL: is20mockUrl,
  headers: { 'Authorization': `Bearer ${bearer}` }
});


exports.listDomain = async (req, res) => {
  try {
    const response = await instance.get('/domain');
    res.status(200).send(response.data);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

exports.searchDomain = async (req, res) => {
  try {
    const response = await instance.get(`domain-search/${req.body.name}`)
    res.status(200).send(response.data);
  } catch (e) {
    res.status(500).send({ error: error.message })
  }
}

exports.verifyDomain = async (req, res) => {
  try {
    const response = await instance.get(`domainVerification`)
    res.status(200).send(response.data);
  } catch (e) {
    res.status(500).send({ error: error.message })
  }
}