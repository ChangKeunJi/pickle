const { DataTypes } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      url: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      thumbnail: {
        type: DataTypes.TEXT,
      },
      title: {
        type: DataTypes.STRING(100),
      },
      desc: {
        type: DataTypes.STRING(200),
      },
      favicon: {
        type: DataTypes.TEXT,
      },
      author: {
        type: DataTypes.STRING(100),
      },
      favorite: {
        type: DataTypes.BOOLEAN,
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
