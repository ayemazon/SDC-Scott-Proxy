require('newrelic');
const express = require('express');
const cors = require('cors');
const path = require('path');
const axios = require('axios');
const config = require('./axios.config.js')

const NodeCache = require('node-cache');
const myCache = new NodeCache({stdTTL: 3000});

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
  myCache.get(req.params.id, (err, value) => {
    if (err) {
      console.log(err);
      throw err;
    } else {
      if (value == undefined) {
        let originalUrl = req.originalUrl;
        config.url = originalUrl;
        axios(config)
          .then(function(response) {
            myCache.set(req.params.id, response.data, (err, success) => {
              res.set({'Cache-Control': 'max-age=30000'}).status(200).json(response.data)
            })
          })
          .catch(function (err) {
            res.status(400).json(err.errno)
          })
      } else {
        res.set({'Cache-Control': 'max-age=30000'}).status(200).json(response.data)
      }
    }
  })

})

app.listen(PORT, () => {
  console.log(`visit http://ec2-3-14-147-96.us-east-2.compute.amazonaws.com:${PORT}`);
});