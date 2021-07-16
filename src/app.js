let express = require('express');
let app = express();
const middleware = require('./app.middleware');
const apiV1 = require('./api/v1');
const db = require('./db');

// create db connection
db.createDbConnection();
let dbConnection = db.getDbConnection();
dbConnection.on('error', db.onError);
dbConnection.once('open', db.onSuccess);

// express middleware
middleware.setMiddleware(app);


app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  res.header('Access-Control-Expose-Headers', 'Content-Length');
  res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
  if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
  } else {
      return next();
  }
});

// api configuration
app.use('/api/v1/', apiV1);

// additional routes
app.use('*', (req, res) => {
  res.status(404).send('Endpoint not found');
});

// app.use((err, req, res, next) => {
//   if (res.headersSent) {
//     return next(err)
//   } else {
//     res.status(500).send('Something went wrong!')
//   }
// });

module.exports = app;
