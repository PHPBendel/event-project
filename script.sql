CREATE TABLE usuarios (
       id_usuario serial PRIMARY KEY,
       nome varchar (50) NOT NULL,
       senha varchar (100) NOT NULL,
       email varchar(50) NOT NULL,
       telefone varchar (15) UNIQUE NOT NULL,
       idade varchar (2) NOT NULL
);


CREATE TABLE eventos (
       id_evento serial PRIMARY KEY,
       rua varchar (50) NOT NULL,
       numero varchar (5) NOT NULL,
       bairro varchar(20) NOT NULL,
       cidade varchar(20) NOT NULL,
       pais varchar(40) NOT NULL,
       foto_evento text NOT NULL
);


-- CREATE TABLE patrocinadores (
--        id_patrocinador serial PRIMARY KEY,
--        nome varchar(50) UNIQUE NOT NULL,
--        logo text NOT NULL
-- );

-- CREATE TABLE eventos_patrocinadores (
--        id_evento integer NOT NULL,
--        id_patrocinador integer NOT NULL,
--        PRIMARY KEY (id_evento, id_patrocinador),
--        CONSTRAINT id_evento_fkey FOREIGN KEY (id_evento)
--        		  REFERENCES eventos (id_evento),
--        CONSTRAINT id_organizador_fkey FOREIGN KEY (id_patrocinador)
--        		  REFERENCES patrocinadores (id_patrocinador)
-- );


CREATE TABLE usuarios_funcoes (
       id_usuario integer NOT NULL,
       id_funcao integer NOT NULL,
       PRIMARY KEY (id_usuario, id_funcao),
       CONSTRAINT id_usuario_fkey FOREIGN KEY (id_usuario)
       		  REFERENCES usuarios (id_usuario)
);


CREATE TRIGGER atr_fn AFTER INSERT
ON usuarios
FOR EACH ROW EXECUTE PROCEDURE atr_fn();

CREATE FUNCTION atr_fn() RETURNS trigger AS $atr_fn$
       BEGIN
		INSERT INTO usuarios_funcoes (id_usuario, id_funcao)
		VALUES (NEW.id_usuario, 1)
		RETURN NEW;
	END;

$atr_fn$ LANGUAGE plpgsql;


INSERT INTO funcoes (nome_funcao)
VALUES ('usuario')

INSERT INTO funcoes (nome_funcao)
VALUES ('admin')

INSERT INTO usuarios (nome, senha, email, telefone, idade)
VALUES ('Alexandre Magno', 'normie', 'alexandros@gmail.com', '1234-5678', '32')

SELECT u.nome,
       u.email,
       u.telefone,
       u.idade,
       f.nome_funcao
FROM usuarios u
INNER JOIN usuarios_funcoes uf ON u.id_usuario = uf.id_usuario
INNER JOIN funcoes f ON f.id_funcao = uf.id_funcao AND
u.email = 'pedro.bendel@gmail.com'

ALTER TABLE usuarios ADD CONSTRAINT email_unique UNIQUE (email)
