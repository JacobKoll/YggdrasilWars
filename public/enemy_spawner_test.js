var gokuPic;
var dragonBallPic;
var fighter;
var newSpawner;

function preload()
{
	gokuPic = loadImage("assets/enemyspawn/goku.png");
	dragonBallPic = loadImage("assets/enemyspawn/dragonball.png");
}

function setup()
{
	var canvas = createCanvas(500, 500);
	canvas.parent('canvasLocation');

	fighter = new Fighter();

}

function draw()
{
	background(134, 178, 78);

	if(newSpawner)
	{
		newSpawner.spawn();
	}

	drawSprites();

}

/* The html button will call this. It places a random EnemySpawner somewhere. */
function placeSpawner()
{
	document.getElementById('spawnerButton').innerHTML = "Place Another Spawner";

	var randX = random( 75, width - 75);
	var randY = random( 75, height - 75);

	// This sprite is just for testing!
	var fauxMonster = function()
	{
		this.sprite;
	}

	fauxMonster.prototype.create = function(x,y)
	{
		this.sprite = createSprite(x, y);
		this.sprite.addImage(gokuPic);
		this.sprite.scale = .017;
		this.sprite.debug = true;
		this.sprite.life = 105;
	};

	newSpawner = new EnemySpawner(randX, randY, Enemy, 1, 10, dragonBallPic);
	

}