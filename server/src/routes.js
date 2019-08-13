const express = require('express');
const GameController = require('./controllers/GameController'); 

const routes = express.Router();

routes.get( '/', (req, res) => { // request, response
  return res.json( { message: 'ready!' });
});

routes.get('/', GameController.index );

module.exports = routes;