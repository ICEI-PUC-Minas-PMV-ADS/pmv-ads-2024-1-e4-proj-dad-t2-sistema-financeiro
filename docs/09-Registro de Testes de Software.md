# Registro de Testes de Software

## Avaliação

Durante os testes de software realizados no sistema, foram identificados diversos pontos fortes e fracos na solução. Abaixo estão os principais destaques:

### Pontos Fortes:
1. **Funcionalidade de Login:** O processo de login na aplicação se mostrou eficiente e confiável, autenticando os usuários corretamente.
2. **Cadastro de Usuário:** O cadastro de novos usuários foi realizado sem problemas, e as informações foram corretamente armazenadas no sistema.
3. **Adição de Despesa:** A funcionalidade de adição de despesa funcionou conforme o esperado, permitindo aos usuários registrar suas despesas de forma precisa.

### Pontos Fracos:
1. **Validação de Campos:** Foi identificada uma falha na validação dos campos durante o cadastro de usuário, permitindo que campos obrigatórios fossem deixados em branco.
2. **Resiliência a Falhas:** Em alguns casos, a aplicação não lidou adequadamente com falhas de conexão ou erros de servidor, resultando em experiências negativas para o usuário.

## Estratégias de Melhoria:
Para abordar os pontos fracos identificados durante os testes, o grupo pretende implementar as seguintes estratégias nas próximas iterações do desenvolvimento:
1. **Melhoria na Validação de Campos:** Será implementada uma validação mais robusta dos campos durante o cadastro de usuário, garantindo que todos os campos obrigatórios sejam preenchidos antes do envio do formulário.
2. **Aprimoramento da Resiliência a Falhas:** Serão realizadas melhorias na lógica de tratamento de erros da aplicação, implementando mecanismos para lidar adequadamente com falhas de conexão e erros de servidor, garantindo uma experiência mais consistente para o usuário.

Com base nos resultados obtidos nos testes, o grupo está confiante de que as melhorias propostas contribuirão significativamente para a qualidade e robustez da solução.
