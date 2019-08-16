// Responsável pelas funções que controlam os dados da Model Dev
var connectedUsers = {};
var hosts = {};

module.exports = {
  async index(req, res) {
    return res.json({ req, res });
  },

  addNewConnectedUser(username, socketId) {
    // Verificar usuário duplicado => TODO
    connectedUsers[username] = { socketId: socketId, hostCode: false };
    console.log("\n# Usuário conectado: ", { username, socketId });
  },

  createHost(io, header) {
    const { username } = header;

    let hostCode = Math.random()
      .toString(36)
      .substr(2, 5);

    // Seta um novo Host
    hosts[hostCode] = {
      canJoin: true,
      users: {
        username: username,
        isHost: true,
        props: {}
      },
      simpleUsers: [username]
    };

    // Atualiza o hostCode do usuário que criou
    connectedUsers[username].hostCode = hostCode;

    console.log(`\n# Nova sala criada >${hostCode}< | por ${username}`);

    // Devolve pro usuário a sala criada
    io.to(connectedUsers[username].socketId).emit("host-created", hostCode);
    io.to(connectedUsers[username].socketId).emit(
      "host-users-updated",
      hosts[hostCode].simpleUsers
    );
  },

  joinHost(io, header) {
    const { username, hostCode } = header;

    let operationSucceded = false;
    let message = "Erro ao se conectar a esta sala";

    // sala existe?
    if (hosts[hostCode]) {
      //Partida já iniciou?
      if (hosts[hostCode].canJoin) {
        // Tem espaço?
        if (hosts[hostCode].simpleUsers.length < 4) {
          operationSucceded = true;

          // Atualiza o hostCode do usuário
          connectedUsers[username].hostCode = hostCode;

          // Adiciona usuário na sala
          hosts[hostCode].simpleUsers.push(username);

          // Avisa todos os usuários que há um novo usuário
          /*
          io.to(connectedUsers[username].socketId).emit(
      "host-users-updated",
      hosts[hostCode].simpleUsers
    );
     */

          console.log(`\n# ${username} entrou na sala >${hostCode}<`);
        } else {
          message = "Sala lotada";
        }
      } else {
        message = "A sala já está com uma partida em andamento";
      }
    }

    console.log({ operationSucceded, message, username, hostCode });

    // "Retorno" da operação
    io.to(connectedUsers[username].socketId).emit("join-host-finished", {
      operationSucceded,
      message,
      hostCode
    });
  }
};
