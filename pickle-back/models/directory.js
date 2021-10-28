const { DataTypes } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const Directory = sequelize.define(
    "Directory",
    {
      name: {
        type: DataTypes.STRING("100"),
        allowNull: false,
      },
      order: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    }
  );
  Directory.associate = (db) => {
    db.Directory.belongsTo(db.User);
    db.Directory.hasMany(db.Post);
  };
  return Directory;
};

// https://blog.daum.net/question0921/539
// id: {
//     type: DataTypes.UUID,
//         defaultValue: DataTypes.UUIDV4,
//         primaryKey: true,
//
// },
