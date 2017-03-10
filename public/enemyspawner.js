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
	console.log(this.x + ", " + this.y);
	this.enemyType = enemyType;
	this.rate = rate;
	this.limit = limit;
	this.spawnCount = 0;

	this.sprite = createSprite(x, y, 16, 16);
	this.sprite.addImage(image);
	this.sprite.scale =.08;
	this.sprite.debug = true;
	this.spawn;
	this.timer = 0;
}	

/**
 * Spawns Enemies given the values initialized in the constructor function
 * @function
 * 
 */
EnemySpawner.prototype.spawn = function() 
{
	if((this.timer % (100/this.rate)) == 0 && this.spawnCount < this.limit)
	{
		this.spawnCount++;

		console.log(this.x + ", " + this.y);

		var toSpawn = new this.enemyType(100, this.x, this.y, this.enemyType.speed, 10);
		toSpawn.assignAnimations(loadAnimation("/assets/enemyspawn/goku.png"), loadAnimation("/assets/enemyspawn/goku.png"));
	}

	this.timer++;
};