const sequelize = require('./db.js'),
      Sequelize = require('sequelize');

const Evento = sequelize.define('eventos', {
    id_evento: {
	type: Sequelize.INTEGER,
	primaryKey: true,
	autoIncrement: true
    },
    rua: Sequelize.STRING,
    numero: Sequelize.STRING,
    bairro:Sequelize.STRING,
    cidade: Sequelize.STRING,
    pais:Sequelize.STRING,
    foto_evento:Sequelize.STRING,
    nome:Sequelize.STRING
}, {
    timestamps: false
});

module.exports = Evento;
