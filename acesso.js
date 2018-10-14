const sequelize = require('./db.js'),
      Sequelize = require('sequelize');

const Acesso = sequelize.define('usuarios_funcoes', {
    id_usuario: {
	type: Sequelize.INTEGER,
	primaryKey: true,
	autoIncrement: true
    },
    id_funcao: Sequelize.INTEGER
}, {
    timestamps: false
});

module.exports = Acesso;
