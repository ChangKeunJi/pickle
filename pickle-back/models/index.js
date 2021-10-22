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
// 에러가 날 때 mysql 터미널에 접근한뒤, 직접 foreign key가 있는 테이블을 강제로 삭제해줘야 한다.
// https://stackoverflow.com/questions/11100911/cant-drop-table-a-foreign-key-constraint-fails

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

// https://jetalog.net/83
// const driver = () => {
//
//   sequelize.sync().then(() => {
//
//     console.log('초기화 완료.');
//
//   }).catch((err) => {
//
//     console.error('초기화 실패');
//
//     console.error(err);
//
//   });
//
// };
//
// driver();
