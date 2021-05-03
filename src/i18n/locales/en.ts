const en: I18NStrings = {
  common: {
    yes: 'Yes',
    no: 'No',
    newGame: 'New Game',
    play: 'Play',
    continue: 'Continue',
    back: 'Back',
    settings: 'Settings',
    instructions: 'Instructions',
    quit: 'Quit',
    next: 'Next',
    attack: 'Attack',
    usePotion: 'Drink Potion',
    cancel: 'Cancel',
    level: 'Level',
    mainMenu: 'Main Menu',
    turns: {
      shop: 'Items Draft',
      actions: 'Perform Actions',
      enemy: 'Enemies Actions',
    },
  },
  elements: {
    coin: 'coin',
    coins: 'coins',
    enemy: 'enemy',
    enemies: 'enemies',
    experiencePoint: 'point of experience',
    experiencePoints: 'points of experience',
    turnsRemaining: 'Turns left:',
    objectsRemaining: 'Objects remaining to collect:',
  },
  alerts: {
    leveledUp: 'You leveled up!',
    alreadyFullLife: 'You are already full life!',
  },
  combat: {
    enemyKilled: '%%ENEMY%% defeated!',
    coinsEarned: 'You found %%COINS%% %%STRING%%!',
    experienceEarned: 'You won %%XP%% %%STRING%%!',
  },
  Settings: {
    language: 'Language',
  },
  IngameMenu: {
    sureNewGame: 'The actual progress will be lost. Are you sure your want to start a new game?',
  },
  ActionsPopup: {
    walk: 'Walk',
    discover: 'Discover',
  },
  AttackWindow: {
    playerLife: 'Your Life',
    playerDefense: 'Your defense',
    playerAttack: 'Your Attack',
    enemyLife: 'Enemy Life',
    enemyDefense: 'Enemy Defense',
    enemyAttack: 'Enemy Attack',
    damageDealt: 'Damage Dealt',
    damageSuffered: 'Damage Suffered',
    combatSettings: 'Combat Settings:',
  },
  Player: {
    attack: 'Attack',
    defense: 'Defense',
    experience: 'XP',
    life: 'Life',
    finishTurn: 'Finish Turn',
    items: 'Items',
  },
  GameWon: {
    youWon: 'You won!',
    turns: 'Finished the game in %%TURNS%% turns.',
    finalLevel: 'Reached level %%LEVEL%%!',
  },
  GameOver: {
    gameOver: 'Game Over!',
    youDied: 'Your life was reduced to 0 points!',
    turnsOver: 'Your time is over, there are no turns left...',
  },
  Draft: {
    title: 'Items Draft',
    description:
      'Select the items that you want to keep and reroll the others. This items will be available only on this turn and you will have to get new items next turn.',
    lock: 'lock',
    endTurn: 'Finish Turn',
    reRoll: 'Reroll',
    remaining: 'left:',
    visitStore: 'Visit Store',
  },
  Store: {
    title: 'Store',
    description: 'Click on the items to buy.',
    back: 'Go back',
  },
  Instructions: {
    title: 'Instructions',
    description: `
      <p>
        Your objective is to go through all the floors of the dungeon and defeat the final enemy in the last dungeon before the turns are over.
      </p>
      <p>
        For this you will need to go through each floor and face the
        challenges, like monsters and traps, collect all the objectives and open the door to the next floor.
      </p>
      <p>
        Each turn consists of 3 stages:
      </p>  

      <p><strong>Items Draft / Store</strong></p>

      <p>
        In this step you will have some chances to collect items that will allow you to advance through the floors. In addition you can also
        spend coins and buy items that you may not have been able to. But choose well because the items only last this round,
        next time everything is reset and you will have to choose and buy new items.
      </p>

      <p><strong>Actions</strong></p>

      <p>
        n this step you spend the items you received / bought to open new paths, walk, recover life and battle with the monsters you find.


      </p>

      <p><strong>Enemies</strong></p>

      <p>
        In this stage a new enemy will be born in an empty nest and all enemies will walk to where you are. I take care not to be trapped!
      </p>
    `,
  },
};

export default en;
