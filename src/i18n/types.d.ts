declare type availableLanguagesTypes = 'pt_br' | 'en';

declare type I18NStrings = {
  common: {
    yes: string;
    no: string;
    newGame: string;
    play: string;
    continue: string;
    back: string;
    settings: string;
    instructions: string;
    quit: string;
    next: string;
    cancel: string;
    attack: string;
    usePotion: string;
    level: string;
    mainMenu: string;
    turns: {
      shop: string;
      actions: string;
      enemy: string;
    };
  };
  elements: {
    coin: string;
    coins: string;
    enemy: string;
    enemies: string;
    experiencePoint: string;
    experiencePoints: string;
    turnsRemaining: string;
    objectsRemaining: string;
  };
  alerts: {
    leveledUp: string;
    alreadyFullLife: string;
  };
  combat: {
    enemyKilled: string;
    coinsEarned: string;
    experienceEarned: string;
  };
  Settings: {
    language: string;
  };
  IngameMenu: {
    sureNewGame: string;
  };
  ActionsPopup: {
    walk: string;
    discover: string;
  };
  AttackWindow: {
    playerLife: string;
    playerDefense: string;
    playerAttack: string;
    enemyLife: string;
    enemyDefense: string;
    enemyAttack: string;
    damageDealt: string;
    damageSuffered: string;
    combatSettings: string;
  };
  Player: {
    attack: string;
    defense: string;
    experience: string;
    life: string;
    finishTurn: string;
    items: string;
  };
  GameWon: {
    youWon: string;
    turns: string;
    finalLevel: string;
  };
  GameOver: {
    gameOver: string;
    youDied: string;
    turnsOver: string;
  };
  Draft: {
    title: string;
    description: string;
    lock: string;
    endTurn: string;
    reRoll: string;
    remaining: string;
    visitStore: string;
  };
  Store: {
    title: string;
    description: string;
    back: string;
  };
  Instructions: {
    title: string;
    description: string;
  };
};
