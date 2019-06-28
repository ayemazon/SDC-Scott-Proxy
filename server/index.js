const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3333;


//creates a virtual path
app.use('/static', express.static('public'));
//app.use(express.static(__dirname + '/../react-client/dist'));



app.use(
  cors(),
  bodyParser.urlencoded({ extended: true }),
  bodyParser.json()
)

app.get('*', (req, res) => {
  res.sendFile(path.resolve('public/index.html'));
});




app.listen(PORT, () => {
  console.log(`visit http://localhost:${PORT}`);
});


