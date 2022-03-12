const express = require('express');
const app = express();
const routes = require('./route/routes');

app.use(express.json());
app.use('/', routes);

app.listen(3000, () => console.log('[INFO] Listening on port 3000'));