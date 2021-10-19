const { DataTypes } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const Directory = sequelize.define(
    "Directory",
    {
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      // UserId
      // PostId
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
