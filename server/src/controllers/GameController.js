// Responsável pelas funções que controlam os dados da Model Dev

const axios = require('axios');

module.exports = {

  async index( req, res) {

    const { user } = req.headers;

    return res.json({req, res});

  }

}