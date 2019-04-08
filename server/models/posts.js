'use strict';
module.exports = (sequelize, DataTypes) => {
  const post = sequelize.define('posts', {
    categoryId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    text: DataTypes.STRING,
    slug: DataTypes.STRING,
    hits: DataTypes.INTEGER
  }, {});
  post.associate = function (models) {
    // associations can be defined here
  };
  return post;
};