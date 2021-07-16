const mongoUrl = require('./env.config')['apiEndpoint'];
const appConfig = {
  port: process.env.PORT || 5050
};

const dbConfig = {
  mongoUrl: process.env.MONGO_URL || mongoUrl
};

const logConfig = {
  level: process.env.LOG_LEVEL || 'debug'
};

module.exports = {
  appConfig,
  dbConfig,
  logConfig
}
