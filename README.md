# crud-express-mvc

Projeto que apresenta vários conceitos aprendidos durante o curso de FullStack na Digital House.

Foi desenvolvida uma API de produtos em node.js com Express que apresenta todas as operações do CRUD utilizando o design pattern MVC, 
porém os dados são salvos em um arquivo JSON dentro da raiz do projeto através das dependências path e fs.

A aplicação conta também com um módulo de cadastro de usuários (bcrypt e express-validator) e middlewares que validam o login do usuário dependendo da rota acessada. 
A validação utiliza recursos de session.

As views foram contruídas através do ejs para rodar o HTML, que contém CSS e bootstrap para estilização da apresentação das telas.

Atualmente estamos iniciando a documentação com o padrão swagger, foram instaladas duas dependências para tal: swagger-jsdoc e swagger-ui-express.
