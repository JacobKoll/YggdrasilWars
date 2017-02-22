// This is where the gameplay actually is.

var walkAnimation;
var swingAnimation;
var deathAnimation;
var idleAnimation;

var fighter;

function preload()
{
	walkAnimation = loadAnimation("assets/fighter/walk/walk00.png","assets/fighter/walk/walk09.png");
	swingAnimation = loadAnimation("assets/fighter/swing/swing0.png","assets/fighter/swing/swing6.png");
	deathAnimation = loadAnimation("assets/fighter/death/death00.png","assets/fighter/death/death18.png");
	idleAnimation = loadAnimation("assets/fighter/fighter_idle.png");
}

function setup()
{
	createCanvas(600, 480);

	fighter = new Fighter(100, width/2, height/2, "temp", walkAnimation, swingAnimation, deathAnimation, idleAnimation);
	console.log(fighter.sprite);
}

function draw()
{
	background(51);

	if(keyDown("a"))
	{
		fighter.turn("left");
	}
	if(keyDown("d"))
	{
		fighter.turn("right");
	}
	if(keyDown("w"))
	{
		fighter.walk("forward");
	}
	if(keyDown("s"))
	{
		fighter.walk("back");
	}
	if(keyWentDown(" "))
	{
		fighter.swing();
	}
	if(keyWentDown("e")) // This one is just for testing purposes
	{
		fighter.die();
	}

	drawSprites();
	
	//fighter.sprite.changeAnimation('idle');
}