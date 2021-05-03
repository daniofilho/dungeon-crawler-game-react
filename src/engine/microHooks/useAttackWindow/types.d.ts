declare type AttackWindowType = {
  open: boolean;
  enemyID: EnemyIDType;
};

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

declare type UseAttackWindowContextData = {
  attackWindow: AttackWindowType;
  setAttackWindow: (params: AttackWindowType) => void;
};
