CREATE TABLE Categoria 
( 
 Id INT PRIMARY KEY,  
 Nome VARCHAR(n),  
 SistemaId INT,  
); 

CREATE TABLE SistemaFinanceiro 
( 
 Id INT PRIMARY KEY,  
 Nome VARCHAR(n),  
 Mes INT,  
 Ano INT,  
 DiaFechamento INT,  
 GerarCopiaDespesa BIT,  
 MesCopia INT,  
 AnoCopia INT,  
); 

CREATE TABLE UsuarioSistemaFinanceiro 
( 
 Id INT PRIMARY KEY,  
 EmailUsuario VARCHAR(n),  
 Administrador BIT,  
 SistemaAtual BIT,  
 SistemaId INT,  
); 

CREATE TABLE Despesa 
( 
 Id INT PRIMARY KEY,  
 Nome VARCHAR(n),  
 Valor FLOAT,  
 Mes INT,  
 Ano INT,  
 TipoDespesa VARCHAR(n),  
 DataCadastro VARCHAR(n),  
 DataAlteracao VARCHAR(n),  
 DataPagamento VARCHAR(n),  
 DataVencimento VARCHAR(n),  
 Pago BIT,  
 DespesaAtrasada BIT,  
 CategoriaId INT,  
); 

ALTER TABLE Categoria ADD FOREIGN KEY(SistemaId) REFERENCES Categoria (SistemaId)
ALTER TABLE UsuarioSistemaFinanceiro ADD FOREIGN KEY(SistemaId) REFERENCES Categoria (SistemaId)
ALTER TABLE Despesa ADD FOREIGN KEY(CategoriaId) REFERENCES Categoria (CategoriaId)