## Descrição do Projeto

Este projeto consiste em um sistema financeiro desenvolvido em ASP.NET Core, utilizando MongoDB como banco de dados. O sistema permite que os usuários cadastrem suas despesas, gerenciem categorias e visualizem relatórios detalhados das despesas cadastradas.

### Funcionalidades Implementadas

#### Cadastro de Usuários
- Permite que novos usuários se cadastrem no sistema financeiro.
- Página de cadastro de usuários: `cadastro_usuario.html`
- Script para validar e enviar dados do formulário de cadastro de usuários: `cadastro_usuario.js`
- Estrutura de dados: Tabela `usuarios` no banco de dados

#### Login de Usuários
- Permite que usuários cadastrados façam login no sistema financeiro.
- Página de login: `login.html`
- Script para validar e enviar dados do formulário de login: `login.js`
- Estrutura de dados: Tabela `usuarios` no banco de dados

#### Samuel - Tela de despesa
- Permite que os usuários cadastrem suas despesas no sistema financeiro.
- Página de cadastro de despesas: `cadastro_despesa.html`
- Script para validar e enviar dados do formulário de cadastro de despesas: `cadastro_despesa.js`
- Estrutura de dados: Tabela `despesas` no banco de dados

  O Swagger é uma ferramenta utilizada para documentar e testar APIs RESTful. Abaixo está uma captura de tela do Swagger para este projeto, mostrando as rotas disponíveis e os parâmetros necessários para cada operação:

-  ![Diagrama de Arquitetura](img/despesa1.jpeg)
-  ![Diagrama de Arquitetura](img/despesa2.jpeg)


#### Visualização de Relatórios de Despesas
- Permite que os usuários visualizem relatórios detalhados de suas despesas cadastradas no sistema financeiro.
- Página de visualização de relatórios de despesas: `relatorios_despesas.html`
- Script para recuperar e exibir os dados das despesas cadastradas: `relatorios_despesas.js`
- Estrutura de dados: Tabela `despesas` no banco de dados


#### Nicolas - Cadastro de Categorias
- Permite que os usuários cadastrem categorias para classificar suas despesas.
- Controller para manipulação das categorias: `SistemaFinanceiroController.cs`
- Estrutura de dados: Tabela `categorias` no banco de dados
- Video demonstração da tela categorias (Etapa 3): https://youtu.be/PfHTr_ELdyo

### Lucas - Cadastro de sistema financeiro

- Permite que o usuario cadastre seus sistemas financeiro
- Página de visualização de relatórios de despesas: `sistemafinacneiro.html`
- Permite o controle dos gastos a partir da data em que foi adicionada
- Video demonstração da tela sistema financeiro (Etapa 3): https://youtu.be/s3d6eqiZs_I

### Frederico - Cadastro de Despesas

- Permite que o usuario cadastre suas despesas
- Página de visualização de relatórios de despesas: `despesas.html`
- Permite o controle das depesas que foram feitas
- Video demonstração da tela sistema financeiro (Etapa 3): https://youtu.be/4iJbRaAcqH0

Vídeo da explicação da atividade está disponibilizado no YouTube:
 
 - Vídeo etapa 2: https://youtu.be/S-ELnjHA54w  - teste tabela Sistema Financeiro - Lucas
 - Vídeo etapa 4 : https://youtu.be/F7TrGf4wnMk - teste mobiel telas home, login , e despesa -Lucas

 - Vídeo etapa 2: https://youtu.be/zNdhYoLdm6M - Teste Usuário Sistema Financeiro - Frederico
 
 - Vídeo etapa 2: https://youtu.be/on_2YBkPEiw - Teste Categorias Sistema Financeiro - Nicolas
   

### Como Utilizar o Projeto

1. Clone este repositório para o seu ambiente de desenvolvimento.
2. Certifique-se de ter o ambiente de desenvolvimento ASP.NET Core configurado.
3. Configure as credenciais do banco de dados MongoDB no arquivo `appsettings.json`.
4. Execute o projeto e acesse as diferentes funcionalidades através das páginas HTML fornecidas.

### Considerações Finais

Este projeto serve como uma base para o desenvolvimento de um sistema financeiro mais completo e pode ser expandido com novas funcionalidades e melhorias de acordo com as necessidades do usuário. Certifique-se de revisar e ajustar o código e os artefatos de acordo com os requisitos específicos do seu projeto.
