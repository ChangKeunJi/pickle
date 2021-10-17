const { DataTypes } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    "Category",
    {
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      // UserId
      // UrlId
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    }
  );
  Category.associate = (db) => {
    db.Category.belongsTo(db.User);
    db.Category.belongsTo(db.Url);
  };
  return Category;
};
