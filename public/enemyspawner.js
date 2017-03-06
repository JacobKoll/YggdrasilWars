/* 
x = X-position of the spawner
y = Y-position of the spawner
enemyType = What enemy will this thing spawn?
rate = How often should this thing spawn the enemy? (per second)
animation = Currently just a still image, but I'll possibly add an animation later?
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
	lo

	this.sprite = createSprite(x, y, 16, 16);
	this.sprite.addImage(image);
	this.sprite.scale =.08;
	this.sprite.debug = true;
	this.spawn;
	this.timer = 0;


}	

EnemySpawner.prototype.spawn = function() 
{
	if((this.timer % (100/this.rate)) == 0 && this.spawnCount < this.limit)
	{
		//console.log("Spawned monsters");
		this.spawnCount++;

		console.log(this.x + ", " + this.y);

		var toSpawn = new this.enemyType(100, this.x, this.y, this.enemyType.speed, 10);
		//console.log(toSpawn);
		toSpawn.sprite.setSpeed(this.enemyType.speed, random(0, 180));
		toSpawn.assignAnimations(loadAnimation("/assets/enemyspawn/goku.png"), loadAnimation("/assets/enemyspawn/goku.png"));
	}

	this.timer++;
};