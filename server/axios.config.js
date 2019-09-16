const http = require('http');
module.exports = {
  baseURL: process.env.SERVICE_URL,
  method: 'get',
  timeout: 5000,
  httpAgent: new http.Agent({ keepAlive: true })
}