const express = require('express');
const morgan = require("morgan");
const proxy = require('express-http-proxy');
const cors = require('cors');
const path = require('path');
const url = require('url');

const sparksPaths = ['/products', 'products/:productId'];
const derricksPaths = ['/product/:id'];
const scottsPaths = ['/product/pricing/:id'];
const juansPaths = []

const app = express();
const PORT = 3300;
app.use(cors());

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "../", "public")));
app.use('/static', express.static(path.join(__dirname, "../", "public")));
app.use('/:id', express.static(path.join(__dirname, "../", "public")));

app.use(scottsPaths, proxy('http://localhost:3030'));
app.use(derricksPaths, proxy('http://localhost:3005'));
app.use(sparksPaths, proxy('http://localhost:3000'));
app.use(juansPaths, proxy('http://localhost:8080'));

app.listen(PORT, () => {
  console.log(`visit http://localhost:${PORT}`);
});