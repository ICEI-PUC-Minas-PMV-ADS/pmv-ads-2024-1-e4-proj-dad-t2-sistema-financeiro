CREATE TABLE Despesa 
( 
 despesa_id INT PRIMARY KEY,  
 descricao VARCHAR(n),  
 valor FLOAT NOT NULL,  
 categoria_id INT,  
 usuario_id INT,  
 sistema_id INT,  
); 

CREATE TABLE Categoria 
( 
 categoria_id INT PRIMARY KEY,  
 nome VARCHAR(n) NOT NULL,  
); 

CREATE TABLE Sistema 
( 
 sistema_id INT PRIMARY KEY,  
 nome VARCHAR(n) NOT NULL,  
); 

CREATE TABLE Usuario 
( 
 usuario_id INT PRIMARY KEY,  
 nome VARCHAR(n) NOT NULL,  
); 

ALTER TABLE Despesa ADD FOREIGN KEY(categoria_id) REFERENCES Despesa (categoria_id)
ALTER TABLE Despesa ADD FOREIGN KEY(usuario_id) REFERENCES Despesa (usuario_id)
ALTER TABLE Despesa ADD FOREIGN KEY(sistema_id) REFERENCES Despesa (sistema_id)