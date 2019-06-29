const express = require('express');
const morgan = require("morgan");
const proxy = require('express-http-proxy');
const cors = require('cors');
const path = require('path');
const url = require('url');

const app = express();
const PORT = 3333;
app.use(cors());

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "../", "public")));


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, "../", "/public/index.html"));
});

app.listen(PORT, () => {
  console.log(`visit http://localhost:${PORT}`);
});



