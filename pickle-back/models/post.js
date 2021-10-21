const { DataTypes } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      thumbnail: {
        type: DataTypes.STRING,
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
  Post.associate = (db) => {
    db.Post.belongsTo(db.User);
    db.Post.belongsToMany(db.Directory, { through: "DirPost" });
  };
  return Post;
};
