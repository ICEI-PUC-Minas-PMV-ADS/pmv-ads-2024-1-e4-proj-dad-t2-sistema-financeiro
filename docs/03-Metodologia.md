# Metodologia

<span style="color:red">Pré-requisitos: <a href="2-Especificação do Projeto.md"> Documentação de Especificação</a></span>

## Relação de Ambiente de Trabalho

Os ambientes de trabalho utilizados pela equipe e suas respectivas plataformas são apresentados na tabela a seguir:

| AMBIENTE                              | PLATAFORMA      | LINK DE ACESSO                                               |
| ------------------------------------- | --------------- | ------------------------------------------------------------ |
| Repositório de código fonte           | GitHub          | https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-dad-t2-sistema-financeiro |
| Documentos do projeto                 | GitHub          | https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-dad-t2-sistema-financeiro/tree/main/docs |
| Gerenciamento do Projeto              | GitHub Projects | https://github.com/orgs/ICEI-PUC-Minas-PMV-ADS/projects/1097/views/1 |
| Fluxograma do User Flow               | Draw.io         | https://app.diagrams.net/                                    |
| Protótipo de baixa fidelidade - telas | Figma           | https://www.figma.com/                                       |

## Gestão de Código Fonte

A gestão do código fonte do projeto é baseada no conteúdo proporcionado na orientação do projeto, que se dá pela opção commit no GitHub sendo atualizado os requisitos implementados ou ajustados no código fonte, ao mesmo tempo em que se atualiza os cards de sprints apresentados no quadro de tarefas.

## Controle de Versão

Para o controle de versão, utilizamos o Git como ferramenta principal, hospedando o repositório no GitHub. A configuração do projeto no Git foi feita com a seguinte estrutura de branches:

![branchs](C:\Users\Fred\Desktop\puc\pmv-ads-2024-1-e4-proj-dad-t2-sistema-financeiro\docs\img\branchs.png)

**As ramificações podem ser descritas como:**

- **`Master`**: versão original ou espelho da ***versão atual da aplicação***;
- **`Develop`**: cópia da ramificação 'Master" com funcionalidades ainda não publicadas ***(base para 'Feature')***;
- **`Feature`**: ramificação temporária e auxiliar, contendo uma nova ***funcionalidade específica***;
- **`Hotfix`**: ramificação temporária e auxiliar, que contém correções rápidas a serem incluídas direto nas ramificações **'Main'** e **'Develop'**;
- **`Release`**: ramificação que une os que estão pronto em **'Develop'** e inclui na **'Main'** e a partir daí é criada uma nova versão da aplicação.

## Gerenciamento de Projeto

A equipe utiliza metodologias ágeis, tendo escolhido o Scrum como base para definição do processo de desenvolvimento, com a seguinte divisão de papéis:

- Scrum Master: Leonardo
- Equipe de Desenvolvimento:
  - Lucas Delmasquio Silva
  - Frederico Gonçalves da Silva Junior
  - Nicolas Patrick

Para organização e distribuição das tarefas do projeto, a equipe está utilizando o quadro de tarefas do GitHub KANBAN unindo algumas fases da metodologia ágil Scrum, e estruturado com as seguintes listas:

● BACKLOG: Registro de requisições definidos em conjunto com o Scrum Master e Product Owner do projeto;

● SPRINT BACKLOG: as tarefas do Backlog são detalhadas e então designadas para cada integrante do desenvolvimento;

● IN PROGRESS: Recebem os cartões de tarefas que estão sendo desenvolvidas no presente, vindas do Sprint Backlog.

● IN REVIEW: Esta demonstra os cartões que foram executados, mas que devem ser avaliados e discutidas pela equipe para determinar a atualização da tarefa para DONNE. Quando alguma coisa impede a conclusão da tarefa, ela é movida para esta lista juntamente com um comentário sobre o que está travando a tarefa.

● DONE: Esta lista representa os cartões que já foram executados, avaliados e dados como feito.

![kanban](C:\Users\Fred\Desktop\puc\pmv-ads-2024-1-e4-proj-dad-t2-sistema-financeiro\docs\img\kanban.PNG)

- ### Processo

  Ao realizarem reuniões para continuidade do projeto, são definidos os cards de tarefas com seus respectivos responsáveis. Ao iniciar uma tarefa, deve ser movido o card para a lista "In Progress", após sua execução, é movida para a lista "In Review" o qual haverá uma avaliação por todos os integrantes do grupo para concluir que o card deve ser atualizado para a lista "Done".

  ### Ferramentas

  As ferramentas empregadas no projeto são:

  - Editor de código : Visual Studio Code;
  - Emulador da aplicação: Android Studio, NPM;
  - Ferramentas de comunicação: Whatsapp, Teams;
  - Gerenciamento do projeto: GitHub Projects e MS Project;
  - Ferramentas de desenho de tela (*wireframing*): MarvelAPP, Heflo;
  - Ferramentas para diagramas (conceitual e lógico): Diagrams.net, Astah, Lucid Charts, BRMW.

  O editor de código foi escolhido pelo grupo pois é o mais prático e acessível para os integrantes, além de facilitar a alternação de quem está editando o código e salvando diretamente no repositório através do GitHub Desktop. Tem um bom dicionário de erros no código e permite acompanhar alterações em tempo real através do navegador.