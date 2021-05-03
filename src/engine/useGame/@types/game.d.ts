declare type TurnType = 'draft-and-shop' | 'actions' | 'enemy';

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

declare type GameType = {
  gameOver: boolean;
  gameWon: boolean;
  turn: TurnType;
  round: number;
};
