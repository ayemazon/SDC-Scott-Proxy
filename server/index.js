require('newrelic');
const express = require('express');
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
const PORT = 8080;
app.use(cors());

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
      res.status(400).json(err.errno)
    })
})

app.listen(PORT, () => {
  console.log(`visit http://ec2-3-14-147-96.us-east-2.compute.amazonaws.com:${PORT}`);
});