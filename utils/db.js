const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('book_management', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;