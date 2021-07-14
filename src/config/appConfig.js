const appConfig = {
  port: process.env.PORT || 5050
};

const dbConfig = {
  mongoUrl: process.env.MONGO_URL || 'mongodb+srv://plg-user1:!=4Wkaky7GCJ@b7@cluster0.an7gk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
};

const logConfig = {
  level: process.env.LOG_LEVEL || 'debug'
};

module.exports = {
  appConfig,
  dbConfig,
  logConfig
}
