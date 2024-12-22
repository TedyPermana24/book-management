const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

const Book = sequelize.define('Book', {
  title: { type: DataTypes.STRING, allowNull: false },
  author: { type: DataTypes.STRING, allowNull: false },
  year: { type: DataTypes.INTEGER, allowNull: false },
  genre: { type: DataTypes.STRING, allowNull: true },
});

module.exports = Book;
