const { DataTypes } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const Directory = sequelize.define(
    "Directory",
    {
      name: {
        type: DataTypes.STRING("30"),
        allowNull: false,
      },
      _id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      order: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    }
  );
  Directory.associate = (db) => {
    db.Directory.belongsTo(db.User);
    db.Directory.belongsToMany(db.Post, { through: "DirPost" });
  };
  return Directory;
};
