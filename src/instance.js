const axios = require("axios");

const instance = axios.create({
  baseURL: 'http://localhost:2310/api/v1/',
  timeout: 1000 // 1000ms = 1s
});

module.exports = instance;