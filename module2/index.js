const express = require('express');
const Datastore = require('nedb');
const app = express();
app.listen(3000, () => console.log('listening at 3000'));
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

const database = new Datastore('database.db');
database.loadDatabase();
// database.insert({ name: 'Roland', status: 'alive' });
// database.insert({ name: 'Katja', status: '❤' });

app.get('/api', (request, response) => {
  database.find({}, (err, data) => {
    if (err) {
      response.end();
      return;
    }
    response.json(data);
  });
});

app.post('/api', (request, response) => {
  console.log(request.body);
  const data = request.body;
  const timestamp = Date.now();
  data.timestamp = timestamp;
  // database.push(data);
  database.insert(data);
  // response.json({
  //   status: 'success',
  //   timestamp: timestamp,
  //   latitude: data.lat,
  //   longitude: data.lon
  // });
  response.json(data);
});
