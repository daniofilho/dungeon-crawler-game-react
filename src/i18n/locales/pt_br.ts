const pt_br: I18NStrings = {
  common: {
    yes: 'Sim',
    no: 'Não',
    newGame: 'Novo Jogo',
    play: 'Jogar',
    continue: 'Continuar',
    back: 'Voltar',
    settings: 'Configurações',
    instructions: 'Instruções',
    quit: 'Sair',
    next: 'Próximo',
    attack: 'Atacar',
    usePotion: 'Usar Poção',
    cancel: 'Cancelar',
    level: 'Nível',
    mainMenu: 'Menu Principal',
    turns: {
      shop: 'Draft de Items',
      actions: 'Executar Ações',
      enemy: 'Ações dos Inimigos',
    },
  },
  elements: {
    coin: 'moeda',
    coins: 'moedas',
    enemy: 'inimigo',
    enemies: 'inimigos',
    experiencePoint: 'ponto de experiência',
    experiencePoints: 'pontos de experiência',
    turnsRemaining: 'Turnos restantes:',
    objectsRemaining: 'Objetos restantes para coletar:',
  },
  alerts: {
    leveledUp: 'Você subiu um nível!',
    alreadyFullLife: 'Você já está com a vida cheia!',
  },
  combat: {
    enemyKilled: '%%ENEMY%% derrotado!',
    coinsEarned: 'Você encontrou %%COINS%% %%STRING%%!',
    experienceEarned: 'Você ganhou %%XP%% %%STRING%%!',
  },
  Settings: {
    language: 'Idioma',
  },
  IngameMenu: {
    sureNewGame:
      'Todo o progresso atual será perdido. Tem certeza que deseja iniciar um novo jogo?',
  },
  ActionsPopup: {
    walk: 'Andar',
    discover: 'Descobrir',
  },
  AttackWindow: {
    playerLife: 'Sua vida',
    playerDefense: 'Sua defesa',
    playerAttack: 'Seu ataque',
    enemyLife: 'Vida do Inimigo',
    enemyDefense: 'Defesa do Inimigo',
    enemyAttack: 'Ataque do Inimigo',
    damageDealt: 'Dano causado',
    damageSuffered: 'Dano recebido',
    combatSettings: 'Configuração de Combate:',
  },
  Player: {
    attack: 'Ataque',
    defense: 'Defesa',
    experience: 'XP',
    life: 'Vida',
    finishTurn: 'Encerrar Turno',
    items: 'Itens',
  },
  GameWon: {
    youWon: 'Você venceu!',
    turns: 'Completou o jogo em %%TURNS%% turnos.',
    finalLevel: 'Terminou no nível %%LEVEL%%!',
  },
  GameOver: {
    gameOver: 'Você perdeu!',
    youDied: 'Sua vida foi reduzida para 0 pontos!',
    turnsOver: 'Seu tempo acabou, não restam mais turnos...',
  },
  Draft: {
    title: 'Draft de Objetos',
    description:
      'Selecione os itens que deseja manter e rerole os demais. Esses itens só serão válidos nesse turno e você deverá selecionar novos itens no próximo turno.',
    lock: 'manter',
    endTurn: 'Encerrar Etapa',
    reRoll: 'Rerolar',
    remaining: 'restantes:',
    visitStore: 'Visitar Loja',
  },
  Store: {
    title: 'Loja',
    description: 'Clica nos itens que deseja comprar',
    back: 'Voltar',
  },
  Instructions: {
    title: 'Instruções',
    description: `
      <p>
        Seu objetivo é passar por todos os andares da dungeon e derrotar o inimigo final na última dungeon antes que os turnos acabem.
      </p>
      <p>
        Para isso você precisará passar por cada andar e enfrentar os
        desafios, como monstros e armadilhas, coletar todos os objetivos e abrir a porta do próximo andar.
      </p>
      <p>
        Cada turno é composto por 3 etapas:
      </p>  

      <p><strong>Draft de Items / Loja</strong></p>

      <p>
        Nesta etapa você terá algumas chances de coletar itens que te permitirão avançar pelos andares. Além disso você também poderá
        gastar moedas e comprar itens que você por ventura não tenha conseguido. Mas escolha bem pois os itens só duram neste round,
        no próximo tudo é resetado e você terá que escolher e comprar novos itens.
      </p>

      <p><strong>Ações</strong></p>

      <p>
        Nesta etapa você gasta os itens que recebeu/comprou para abrir novos caminhos, andar, recuperar vida e batalhar com os montros que encontrar.
      </p>

      <p><strong>Inimigos</strong></p>

      <p>Nesta etapa um novo inimigo irá nascer em um ninho vazio e todos os inimigos andarão até onde você está. Cuido para não ficar encurralado!</p>
    `,
  },
};

export default pt_br;
