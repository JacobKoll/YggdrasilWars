var gokuPic;
var dragonBallPic;

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
	var fov = 60 / 180 * PI;
  var cameraZ = (height/2.0) / tan(fov/2.0);
  perspective(60 / 180 * PI, width/height, cameraZ * 0.1, cameraZ * 10);
}

function draw()
{
	background(134, 178, 78);

	drawSprites();

}

/* The html button will call this. It places a random EnemySpawner somewhere. */
function placeSpawner()
{
	document.getElementById('spawnerButton').innerHTML = "Place Another Spawner";

	var randX = random( 30, width - 30);
	var randY = random( 30, height - 30);

	// This sprite is just for testing!
	var fauxMonster = function()
	{
		this.sprite;
		this.create = function(x, y)
		{
			this.sprite = createSprite(x, y);
			this.sprite.addImage(gokuPic);
			this.sprite.scale = .017;

		}
	}

	newSpawner = new EnemySpawner(randX, randY, new fauxMonster(), 5, dragonBallPic);
	

}