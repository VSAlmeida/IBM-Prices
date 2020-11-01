const axios = require('axios');
require('dotenv').config();

const api = axios.create({
  baseURL: 'https://api.softlayer.com/rest/v3.1/',
  auth: {
    username: process.env.SL_USER,
    password: process.env.SL_PASS,
  },
});

module.exports = api;
