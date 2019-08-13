const express = require('express');
const routes = require('./routes');
const cors = require('cors');

// Cria o server
const server = express();

server.use(cors());
server.use( express.json() ); // Define que todas as "conversas" serão em JSON
server.use( routes ); // adiciona as rotas criadas

server.listen(3333);