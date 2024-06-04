# Registro de Testes de Software

## Avaliação

Durante os testes de software realizados no sistema, foram identificados diversos pontos fortes e fracos na solução. Abaixo estão os principais destaques:

### Pontos Fortes:
1. **Funcionalidade de Login:** O processo de login na aplicação se mostrou eficiente e confiável, autenticando os usuários corretamente.
2. **Cadastro de Usuário:** O cadastro de novos usuários foi realizado sem problemas, e as informações foram corretamente armazenadas no sistema.

3. **Teste de Mapeamento da Despesa:**

Neste teste, verificamos se a instância da classe Despesa é corretamente mapeada com os valores esperados. São avaliados atributos como identificador, nome, valor, tipo de despesa, datas de cadastro, pagamento e vencimento, além de flag de pagamento e atraso, e o identificador da categoria.

Teste de Atributos Bson:

Neste segundo teste, confirmamos se os atributos da classe Despesa estão corretamente decorados com os atributos Bson necessários para a serialização correta no MongoDB. Verificamos a presença dos atributos BsonId para o identificador, BsonElement para nome e tipo de despesa, e BsonRepresentation para as datas de cadastro, pagamento e vencimento.

![Diagrama de Arquitetura](img/TestUnitario3.png)
![Diagrama de Arquitetura](img/TesteUnitario2.png)
![Diagrama de Arquitetura](img/TesteUnitarioPuc.png)

### Pontos Fracos:
1. **Validação de Campos:** Foi identificada uma falha na validação dos campos durante o cadastro de usuário, permitindo que campos obrigatórios fossem deixados em branco.
2. **Resiliência a Falhas:** Em alguns casos, a aplicação não lidou adequadamente com falhas de conexão ou erros de servidor, resultando em experiências negativas para o usuário.

## Estratégias de Melhoria:
Para abordar os pontos fracos identificados durante os testes, o grupo pretende implementar as seguintes estratégias nas próximas iterações do desenvolvimento:
1. **Melhoria na Validação de Campos:** Será implementada uma validação mais robusta dos campos durante o cadastro de usuário, garantindo que todos os campos obrigatórios sejam preenchidos antes do envio do formulário.
2. **Aprimoramento da Resiliência a Falhas:** Serão realizadas melhorias na lógica de tratamento de erros da aplicação, implementando mecanismos para lidar adequadamente com falhas de conexão e erros de servidor, garantindo uma experiência mais consistente para o usuário.


## Teste realizados no mobile 

1. Funcionalidades de cadastro de Login: ocorre a validação se o Login estiver de acordo  com o cadastro realizado , caso o usuario tente fazer login sem realizar cadastro o mesmo recebera um aleta de "USUARIO NAO CADASTRADO ".
2. Funcionalidade tela de cadastro: Caso o usuario cadastre uma senha e no campode  confirmar a senha ele coloque uma diferente automaticamente chegará uma mensagem notificando que as senhas não são iguais.
3. Funcionalidade de navegação : O usuario pode correr livremente pelas telas tendo assim a opção de adicioanar suas despesas ou categorias ou ate mesmo outros usuarios.
4. Funcionalidades de categorias : O usuario depois de cadastrado pode adicionar sua categoria refente a sua desepsa.
5. Funcionalidades de despesa : O usuario adiciona sua despesa  aonde é possivel ele adicioanr valores, data da compra, data do vencimento, metodo de pagamento entre outros.
6. Funcionalidade de usuarios : O usuario pode adicionar outra pessoas para que  adicionar suas depesas.

#IMAGENS DOS TESTES 
 A baixo teremos uma breve demonstração das nossas telas e suas funcionalidades, vale ressaltar que nossas telas ja se encontram com os cruds aonde podemos adicionar, excluir e editar as informações.

1.Tela cadastro : ![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-dad-t2-sistema-financeiro/assets/114113443/a2b8f2af-4b65-4194-a3e3-11070105f76c) apresentando erro.
2.Tela cadastro : ![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-dad-t2-sistema-financeiro/assets/114113443/641fa280-2ec7-4807-869a-6a9e8097224e)  cadadstrado com sucesso.

3. tela de login : ![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-dad-t2-sistema-financeiro/assets/114113443/747007dc-e5b0-4bba-bb40-b19de6c8f338) apresentando erro.
4. Tela de login : ![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-dad-t2-sistema-financeiro/assets/114113443/f08376f6-ec1a-45d1-8147-f26d02f9304a) login realizado com sucesso.

5. Tela de despesa : ![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-dad-t2-sistema-financeiro/assets/114113443/d8605300-23ad-4074-ac12-f15ce6ba541d). Despesa adicionada

6. Tela de categoria : ![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-dad-t2-sistema-financeiro/assets/114113443/c52a7c9e-c9ed-48ae-bce8-08ce8e94ee9a) categoria adicionada

7. Tela forma de pagamento : ![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-dad-t2-sistema-financeiro/assets/114113443/d8f54f95-2f45-46e3-b4e7-6a042471f142). forma de pagamento adicionada

8. Tela usuarios :![image](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-dad-t2-sistema-financeiro/assets/114113443/61668eb4-18ea-4a82-b3db-7aaff5dcdae9). Usuario adicionado.









## Desafios 

A equipe encontrou alguns desafios referente a interligação utilizando o React Native e o banco de dados MongoDB, porém estes desafio foram ser sanados.


