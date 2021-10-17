const Sequelize = require("sequelize");

const env = process.env.NODE_ENV || "development";
const config = require("../config/config.js")[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

const user = require("./user")(sequelize, Sequelize);
const url = require("./url")(sequelize, Sequelize);
const category = require("./category")(sequelize, Sequelize);

db.User = user;
db.Url = url;
db.Category = category;

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
