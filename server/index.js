require('newrelic');
const express = require('express');
// const morgan = require("morgan");
const cors = require('cors');
const path = require('path');
const url = require('url');
const axios = require('axios');
const config = require('./axios.config.js')

const sparksPaths = ['/products', 'products/:productId'];
const derricksPaths = ['/product/:id'];
const scottsPaths = ['/product/pricing/:id'];
const juansPaths = []

const app = express();
const PORT = 3300;
app.use(cors());

// app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "../", "public"), {maxAge: 30000}));
app.use('/static', express.static(path.join(__dirname, "../", "public"), {maxAge: 30000}));
app.use('/:id', express.static(path.join(__dirname, "../", "public"), {maxAge: 30000}));

app.get(scottsPaths, (req, res) => {
  let originalUrl = req.originalUrl;
  config.url = originalUrl;
  axios(config)
    .then(function(response) {
      res.set({'Cache-Control': 'max-age=30000'}).status(200).json(response.data)
    })
    .catch(function (err) {
      res.status(400).send(err)
    })
})

// app.use(scottsPaths, proxy('http://localhost:3030', {
//   proxyReqPathResolver: function (req) {
//     return req.baseUrl;
//   }
// }));
// app.use(derricksPaths, proxy('http://localhost:3005'));
// app.use(sparksPaths, proxy('http://localhost:3000'));
// app.use(juansPaths, proxy('http://localhost:8080'));

app.listen(PORT, () => {
  console.log(`visit http://localhost:${PORT}`);
});