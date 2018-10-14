# Events project

To install dependencies:

```
npm install
```

## Environment variables

| Variable name | Description |
| ------------- |:-------------:|
| JWT_SECRET     | Secret used for jwt token |
| POSTGRES_DB     | Postgres database |
| POSTGRES_USER     | Postgres username |
| POSTGRES_PASS    | Postgres password      |
| DB_HOST     | Addres for the database host   |



## Requests

All data is passed as application/json or url encoded

### Account creation

POST `localhost:3000/create`

```
{
	"nome" : "Pedro Bendel",
	"senha" : "woooooo",
	"email" : "example@gmail.com",
	"telefone" : "12322-1233",
	"idade" :  "21"
}

```

### Login

POST `localhost:3000/login`

```
{
	"email" : "examepl@gmail.com",
	"senha": "woooooo"
}

```

### List all events

GET `localhost:3000/eventos`

### Details about an event

GET `localhost:3000/detalhesEvento?id=3`

O dos eventos é mostrado ao listar todos eventos

### INSERIR EVENTOS

POST `localhost:3000/adicionarEvento`

Além das informações no body, também é necessário o access-token como value do header `x-access-token`.
O access-token é entregue no login, mas para essa chamada só será aceito o token que tenha id_funcao=2 no banco de dados (admin). Todos usuários criados tem id_funcao=1 automaticamente, infelizmente a mudança tem que ser feita manualmente no db :(


```
{
		"rua": "Rua Maria Dias",
		"numero": "xxx",
		"bairro": "COHAB Massangano",
		"cidade": "Petrolina",
		"pais": "Brasil",
		"foto_url": "https://portal.comunique-se.com.br/wp-content/uploads/2017/01/palestrantes-para-seu-evento.jpg",
		"nome": "Nome do evento"
	
}
```
### REMOVER EVENTOS

POST `localhost:3000/adicionarEvento`

Além das informações no body, também é necessário o access-token como value do header `x-access-token`.

```
{
	"id_evento": 9
}

```
