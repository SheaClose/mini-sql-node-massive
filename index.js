const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const massive = require('massive');
const ctrl = require('./controller');
require('dotenv').config();
const CONNECTION_STRING = process.env.CONNECTION_STRING;

massive(CONNECTION_STRING)
  .then(db => {
    db.init_db().then(() => {
      db.new_planes().then(() => app.set('db', db));
    });
  })
  .catch(err => console.log(err));

app.use(bodyParser.json());
app.use(cors());

app.get('/planes', ctrl.getPlanes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
