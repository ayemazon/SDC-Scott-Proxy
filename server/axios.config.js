const http = require('http');
module.exports = {
  baseURL: 'http://localhost:3030/',
  method: 'get',
  timeout: 5000,
  httpAgent: new http.Agent({ keepAlive: true })
}