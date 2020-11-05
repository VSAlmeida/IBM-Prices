const axios = require('axios');

const api = axios.create({
  baseURL: 'https://globalcatalog.cloud.ibm.com/api/v1/',
});

module.exports = api;
