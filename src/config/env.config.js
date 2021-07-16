module.exports = {
  "port": 3600,
  "appEndpoint": "http://localhost:3600",
  "apiEndpoint": "mongodb+srv://plg-user1:!=4Wkaky7GCJ@b7@cluster0.an7gk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  "jwt_secret": "plugnorm!!admintt99",
  "jwt_expiration_in_seconds": 36000,
  "environment": "dev",
  "permissionLevels": {
      "NORMAL_USER": 1,
      "PAID_USER": 4,
      "ADMIN": 2048
  }
};