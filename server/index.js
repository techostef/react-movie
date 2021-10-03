const express = require('express');

const app = express();
const port = 11345;
const cors = require('cors');
const bodyParser = require('body-parser');
const dummy = require('../src/mocks/dummy.json');
const dummySingle = require('../src/mocks/dummySingle.json');

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: true,
}));

app.use(cors());

app.get('/', async (req, res) => {
  const title = req?.query?.i ?? '';
  const plot = req?.query?.plot ?? '';
  if (title && plot === 'full') {
    res.send(dummySingle);
  } else {
    res.send(dummy);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;
