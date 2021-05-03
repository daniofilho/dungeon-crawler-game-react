import image from 'assets/images/enemies/boss.png';

const enemy: IEnemy = {
  type: 'boss',
  name: 'Boss',
  image,
  maxLife: 6,
  life: 6,
  attack: 4,
  defense: 2,
  experience: 15,
  coins: 20,
  speed: 1,
  lootChance: 1, // 50%
};

export default enemy;
