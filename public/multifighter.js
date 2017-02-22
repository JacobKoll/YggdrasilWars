// This is where the gameplay actually is.

var walkAnimation;
var swingAnimation;
var deathAnimation;
var idleAnimation;

var fighter;
var customCursor;
var cursorSprite;

function preload()
{
	walkAnimation = loadAnimation("assets/fighter/walk/walk00.png","assets/fighter/walk/walk09.png");
	swingAnimation = loadAnimation("assets/fighter/swing/swing0.png","assets/fighter/swing/swing6.png");
	deathAnimation = loadAnimation("assets/fighter/death/death00.png","assets/fighter/death/death18.png");
	idleAnimation = loadAnimation("assets/fighter/fighter_idle.png");

	customCursor = loadAnimation("assets/fighter/cursor.png");
}

function setup()
{
	createCanvas(600, 480);

	noCursor();

	fighter = new Fighter(100, width/2, height/2, "temp", walkAnimation, swingAnimation, deathAnimation, idleAnimation);

	cursorSprite = createSprite(mouseX, mouseY);
	cursorSprite.addAnimation('reg', customCursor);

	console.log(fighter.sprite);
}

function draw()
{
	background(108, 135, 175);

	cursorSprite.position.x = mouseX;
	cursorSprite.position.y = mouseY;

	fighter.sprite.changeAnimation('idle');
	if(keyDown("w"))
	{
		fighter.walk("forward");
	}
	if(mouseDown(LEFT))
	{
		fighter.swing();
	}
	else
	{
		fighter.sword.visible = false;
	}
	if(keyWentDown("e")) // This one is just for testing purposes
	{
		fighter.die();
	}

	if(!fighter.alive)
	{
		deathAnimation.looping = false;
		animation(deathAnimation, fighter.sprite.position.x, fighter.sprite.position.y);
	}

	drawSprites();	
}