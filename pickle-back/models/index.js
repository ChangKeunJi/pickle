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

// sequelize.sync({ force: true });

const user = require("./user")(sequelize, Sequelize);
const post = require("./post")(sequelize, Sequelize);
const directory = require("./directory")(sequelize, Sequelize);

db.User = user;
db.Post = post;
db.Directory = directory;

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
