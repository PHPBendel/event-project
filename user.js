const bCrypt = require('bcrypt-nodejs'),
      sequelize = require('./db.js'),
      Sequelize = require('sequelize');

const Usuario = sequelize.define('usuarios', {
    id_usuario: {
	type: Sequelize.INTEGER,
	primaryKey: true,
	autoIncrement: true
    },
    nome: Sequelize.STRING,
    senha: Sequelize.STRING,
    email:Sequelize.STRING,
    telefone: Sequelize.STRING,
    idade:Sequelize.STRING
}, {
    timestamps: false,    
    hooks: {
	beforeCreate: (user) => {
	    const salt = bCrypt.genSaltSync();
	    user.senha = bCrypt.hashSync(user.senha, salt);
	}
    }    
});

Usuario.prototype.validPassword = function(senha) {
	    return bCrypt.compareSync(senha, this.senha);
};

module.exports = Usuario;
