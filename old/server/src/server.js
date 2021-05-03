const express = require("express");
const routes = require("./routes");
const cors = require("cors");

const GameController = require("./controllers/GameController");

// Cria o server
const app = express(); // http
const server = require("http").Server(app); // unindo o servidor para aceitar websocket E http
const io = require("socket.io")(server);

//ao receber conexão
io.on("connection", socket => {
  const { username } = socket.handshake.query;

  GameController.addNewConnectedUser(username, socket.id);

  // Criar Host
  socket.on("create-host", header => {
    GameController.createHost(io, header);
  });

  // Join Host
  socket.on("join-host", header => {
    GameController.joinHost(io, header);
  });
});

app.use(cors());
app.use(express.json()); // Define que todas as "conversas" serão em JSON
app.use(routes); // adiciona as rotas criadas

server.listen(3333);
