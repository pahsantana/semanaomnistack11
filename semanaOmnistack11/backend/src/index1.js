/*importar o framework  */

 /*Criando aplicacao*/
/*Rota mais raiz, passar uma função com  os parametros(requisição e resposta)*/
/*node não atualiza sozinha não trabalha resposta texto, envia objeto ou dados usuário, recurso de usuário*/

/* 
 Rota/Recurso
*Metodos HTTP
 *GET: buscar/listar retorno de informação de Back-end
 *POST: Criar uma nova informação ex: usuário
 *PUT: alterar infos backend
 *DELETE: deletar as infos
*/

/*
Tipos de parâmetros
*Query params: parâmetros nomeados enviados na rota, após ? (Filtros, Paginação) Ex:?page=2&Idade=25&nome=Diego
*Route params: Parâmetros utilizados para identificar recursos(tabela do banco de dados) /:id
*Request Body: Corpo da requisição,utilizado para criar ou alterar recursos - usuarios:nome ou email
*/

/*
Bancos de dados
SQL: MySQL, SQLite, PostgreSQL, Oracle, Microsoft SQL server
NoSQL: MongoDB, CountDB(Apache), etc.
*/

/*
Driver: SELECT *(all) FROM users
Query Builder: table('users').select('*').where()
*/

const express = require('express');
const cors = require('cors');
const routes = require('./routes');


const app = express();

app.use(cors());
   // origin:'http//meuapp.com'
//}));
app.use(express.json());
app.use(routes);

app.listen(3333); 


