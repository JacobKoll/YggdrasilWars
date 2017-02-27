/* 
x = X-position of the spawner
y = Y-position of the spawner
enemyType = What enemy will this thing spawn?
rate = How often should this thing spawn the enemy? (per second)
animation = Currently just a still image, but I'll possibly add an animation later?
 */ 
function EnemySpawner(x, y, enemyType, rate, image) 
{
	this.x = x;
	this.y = y;
	console.log(this.x + ", " + this.y);
	this.enemyType = enemyType;
	this.rate = rate;

	this.sprite = createSprite(x, y, 16, 16);
	this.sprite.addImage(image);
	this.sprite.scale =.08;
	this.sprite.debug = true;
	this.spawn;
	this.timer = 0;
}

EnemySpawner.prototype.spawn = function() 
{
	this.timer++;

	if((this.timer % (100/this.rate)) == 0)
	{
		console.log("Spawned monsters");
		var enemy = new this.enemyType();
		enemy.create(this.x, this.y);
		enemy.sprite.setSpeed(2, random(0, 360));
	}
};