const express = require("express");
const routes = require("./routes");
const cors = require("cors");

// Cria o server
const app = express(); // http
const server = require("http").Server(app); // unindo o servidor para aceitar websocket E http
const io = require("socket.io")(server);

const connectedUsers = {};

io.on("connection", socket => {
  // quando vier conexão pelo socket

  const { clientID } = socket.handshake.query;
  connectedUsers[clientID] = socket.id;

  socket.on("create-host", () => {
    console.log({ connectedUsers });
  });
});

//middleware
app.use((req, res, next) => {
  // faz qq coisa com req e res e dps chama o next pra dar sequencia
  req.io = io;
  req.connectedUsers = connectedUsers;

  return next();
});

app.use(cors());
app.use(express.json()); // Define que todas as "conversas" serão em JSON
app.use(routes); // adiciona as rotas criadas

server.listen(3333);
