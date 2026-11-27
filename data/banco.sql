create database db_petShop;

USE db_petShop;

-- CRIAR AS TABELAS

-- CRIAR TABELA USUÁRIOS

CREATE TABLE tb_usuario(
	id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL,
    email VARCHAR(45),
    senha VARCHAR(15),
	telefone int(15)
);


-- TABELA LEITOR

 -- drop table tb_pet;

-- TABELA LIVRO
CREATE TABLE tb_tutor(
	id_tutor INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(100),
	senha int(15)
);


-- TABELA EMPRÉSTIMO 
CREATE TABLE tb_pet(
	
	id_pet INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
   raca varchar(50),
dono int,
tutor int,
    -- CHAVES ESTRANGEIRAS
    FOREIGN KEY (dono) REFERENCES tb_usuario(id_usuario),
    FOREIGN KEY (tutor)  REFERENCES tb_tutor(id_tutor)
);


-- INSERIR INFORMAÇÕES
-- leitores
INSERT INTO 
	tb_usuario(nome, email,senha,telefone)
VALUES 
	("Cristiano", "cris@gmail.com", "7667", "2485649"),
	("Ronaldo", "R@naldogmail.com", "123", "9656"),
	("Larissa", "larissa@gmail.com", "123456789", "486");

-- livros
INSERT INTO 
	tb_tutor(nome,cpf,senha)
VALUES
	("Nárnia", "12345566", "123"),	
	("50 cores", "435678", "321"),	
  	("Dicionário", "6547886", "987");  
    
-- emprestimos
INSERT INTO 
	tb_pet(nome,raca,dono,tutor)
VALUES
	("Alex","Cachorro",1,1),
	("Mali","gato","2","2"),
	("Tuca","papagaio","3","3");
    
    
-- EXCLUIR TABELAS
-- DROP TABLE tb_usuarios;

-- BUSCAR INFORMAÇÕES
SELECT * FROM tb_usuario;
SELECT * FROM tb_tutor;
SELECT * FROM tb_pet;

-- JOINS - JUNTAR TABELAS 
SELECT *
	FROM tb_pet AS pet
JOIN 
	tb_usuario AS usu
ON 
	pet.dono = usu.id_usuario -- iguala o campo pelo nome das colunas
JOIN
	tb_tutor AS tu
ON
	pet.tutor = tu.id_tutor; -- aqui também



