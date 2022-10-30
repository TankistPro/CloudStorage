const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.DBNAME,
    process.env.PASSWORD, {
    host: 'localhost',
    dialect: 'postgres'
});

module.exports = sequelize;
