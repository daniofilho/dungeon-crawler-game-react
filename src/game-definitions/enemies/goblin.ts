import image from 'assets/images/enemies/goblin.png';

const enemy: IEnemy = {
  type: 'goblin',
  name: 'Goblin',
  image,
  maxLife: 3,
  life: 3,
  attack: 4,
  defense: 0,
  experience: 15,
  coins: 2,
  speed: 1,
  lootChance: 1, // 50%
};

export default enemy;
