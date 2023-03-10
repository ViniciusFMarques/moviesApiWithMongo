const express = require('express');

require('express-async-errors');

const routes = require('./routes');

const connect = require('./database/index');

const PORT = 3000;

const app = express();

connect();

app.use(express.json());

app.use(routes);

app.use((error, request, response, next) => {
  console.log(error);
  response.sendStatus(500);
})

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
