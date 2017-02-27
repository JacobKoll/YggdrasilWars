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

	setInterval(this.spawn, 1000);
	this.spawn = function()
	{
		console.log("help");
		this.enemyType.create(10,10);
		this.enemyType.sprite.setSpeed(.5, random(0, 360));

	}


}