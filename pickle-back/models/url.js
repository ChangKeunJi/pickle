const { DataTypes } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const Url = sequelize.define(
    "Url",
    {
      url: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      thumbnail: {
        type: DataTypes.TEXT,
      },
      title: {
        type: DataTypes.STRING(20),
      },
      content: {
        type: DataTypes.STRING(50),
      },
      favicon: {
        type: DataTypes.STRING(200),
      },
      author: {
        type: DataTypes.STRING(50),
      },
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    }
  );
  Url.associate = (db) => {
    db.Url.belongsTo(db.User);
    db.Url.hasMany(db.Category);
  };
  return Url;
};
