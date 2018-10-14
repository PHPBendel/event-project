const express = require('express'),
      Usuario = require('./user.js'),
      Evento = require('./events.js'),
      Acesso = require('./acesso.js'),
      bodyParser = require('body-parser'),
      jwt = require('jsonwebtoken'),
      config = require('./config.js'),
      verifyToken = require('./verifyToken.js');

const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


app.post('/create', async function(req, res){
    try
    {
	await Usuario.create({
	    nome: req.body.nome,
	    senha: req.body.senha,
	    email: req.body.email,
	    telefone: req.body.telefone,
	    idade: req.body.idade
	});

	return res.status(200).send('Usuario created, you can login now');
    } catch(err){
	return res.status(401).send('Something went wrong while creating a new account');
    }

});

app.post('/login', async function(req, res){
    let email = req.body.email,
	senha = req.body.senha,
	usuario = await Usuario.findOne({
	    where: {
		email: email
	    }
	});

    if (usuario && usuario.validPassword(senha)){
	var token = jwt.sign({ id: usuario.get('id_usuario')}, config.secret, {
	    expiresIn: 86400
	});
	res.status(200).send({ 'access-token' : token });
    } else
	res.status(401).send('Uh oh... Something went wrong with authentication');
});

app.post('/adicionarEvento', verifyToken, async function(req, res){

    try {

	let acesso = await Acesso.findOne({
	    where: {
	    	id_usuario: req.userId
	    }
	});

	if (acesso && acesso.get('id_funcao') == 2)
	    console.log('Acesso permitido');
	else
	    return res.status(403).send('Acesso negado');

	await Evento.create({
	    rua: req.body.rua,
	    numero: req.body.numero,
	    bairro: req.body.bairro,
	    cidade: req.body.cidade,
	    pais: req.body.pais,
	    foto_evento: req.body.foto_url,
	    nome: req.body.nome
	});

	return res.status(200).send('Yayyy');


    } catch(err){
	console.log(err);
    }

});

app.post('/removerEvento', verifyToken, async function(req, res) {

    try{

	let acesso = await Acesso.findOne({
	    where: {
	    	id_usuario: req.userId
	    }
	});

	if (acesso && acesso.get('id_funcao') == 2)
	    console.log('Acesso permitido');
	else
	    return res.status(403).send('Acesso negado');

	await Evento.destroy({
	    where: {
		id_evento: req.body.id_evento
	    }
	});
	res.status(200).send('Event successfully removed!');
    } catch(err){
	console.log(err);
	res.status(400).send('Something went wrong deleting the event');
    }
});


app.get('/eventos', async function(req, res){
    let eventos = await Evento.findAll();
    let nomeEventos = new Array();
    if (eventos.length > 0){
	eventos.forEach(evento => {
	    nomeEventos.push({"description" : evento.get('nome'),
			      "id" : evento.get('id_evento')});
	});
    }
    res.status(200).send(nomeEventos);
});

app.get('/detalhesEvento', async function(req, res){
    var id = req.query.id;

    try{
	let evento = await Evento.findOne({
	    where: {
		id_evento: id
	    }
	});

	res.status(200).send({ "rua" : evento.get('rua'),
			       "numero" : evento.get('numero'),
			       "bairro" : evento.get('bairro'),
			       "cidade" : evento.get('cidade'),
			       "pais" : evento.get('pais'),
			       "nome" : evento.get('nome')});
    } catch(err){
	res.status(400);
	console.log(err);
    }
});

(async () => {
    app.listen(3000, () => console.log('I am awake and running on localhost:3000'));
})();
