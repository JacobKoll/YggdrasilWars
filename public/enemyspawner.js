/**
 * @author Chandler Davis and Andrew Messerly
 */

/**
 * Constructs a spawner that spawns Enemy objects/sprites
 * @constructor
 *
 * @param {int} x         Initial x-position of the spawner
 * @param {int} y         Initial y-position of the spawner
 * @param {function} enemyType The constructor for the Enemy that it will spawn
 * @param {int} rate      The rate (per second) that the spawner will emit a new Enemy
 * @param {int} limit     The maximum amount of Enemies that this spawner will emit
 * @param {Image} image     The image for the EnemySpawner sprite
 */
function EnemySpawner(x, y, enemyType, rate, limit, image) 
{
	this.x = x;
	this.y = y;
	this.enemyType = enemyType;
	this.rate = rate;
	this.limit = limit;
	this.spawnCount = 0;

	this.enemyArr = [];

	this.sprite = createSprite(x, y);
	this.sprite.addImage(image);
	this.sprite.scale = 2.63;
	this.sprite.debug = true;
	this.spawn;
	this.timer = 0;
}	

/**
 * Spawns Enemies given the values initialized in the constructor function
 * @function
 * 
 */
EnemySpawner.prototype.spawn = function(enemyGroup) 
{
	if((this.timer % (100/this.rate)) == 0 && this.spawnCount < this.limit)
	{
		this.spawnCount++;

		tempEnemy = new Enemy(this.x + 150, this.y  + 250, this.enemyType);
		this.enemyArr.push(tempEnemy);
		enemyGroup.push(tempEnemy.sprite);

	}
	
	this.timer++;
};

EnemySpawner.prototype.updateAll = function(fighterArr) 
{
	for (var i = 0; i < this.enemyArr.length; i++) 
	{
		this.enemyArr[i].update(fighterArr);
	}
};