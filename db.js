const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.POSTGRES_DB, process.env.POSTGRES_USER, process.env.POSTGRES_PASS, {
    host: process.env.DB_HOST,
    dialect: 'postgres',

    pool: {
	max: 5,
	min: 0,
	acquire: 30000,
	idle: 10000
    },

    operatorsAliases: false
});

module.exports = sequelize;
