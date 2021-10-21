const { DataTypes } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      email: {
        type: DataTypes.STRING(30),
        allowNull: false,
        // unique: true,
      },
      name: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      snsId: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      provider: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  User.associate = (db) => {
    db.User.hasMany(db.Post);
    db.User.hasMany(db.Directory);
  };
  return User;
};
