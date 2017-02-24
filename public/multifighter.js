// This is where the gameplay actually is.

var walkAnimation;
var swingAnimation;
var deathAnimation;
var idleAnimation;

var fighter;
var fightersArr = [];
var dataArr = [];
var customCursor;
var cursorSprite;
var logTime = 0;

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
	createCanvas(720, 480);
	socket = io.connect('http://localhost:3000');

	noCursor(); // Hides the cursor when in the canvas

	fighter = new Fighter(100, random(0 + 20, width - 20), random(0 + 20, height - 20), walkAnimation, swingAnimation, deathAnimation, idleAnimation);

	cursorSprite = createSprite(mouseX, mouseY, 16, 16);
	cursorSprite.addAnimation('reg', customCursor);

	var fighterData = {
		health: fighter.health,
		alive: fighter.alive,
		x: fighter.sprite.position.x,
		y: fighter.sprite.position.y,
		swinging: fighter.sword.visible,
		currAnimation: fighter.sprite.getAnimationLabel(),
		spriteDebug: fighter.sprite.debug,
		swordDebug: fighter.sword.debug,
		rot: fighter.sprite.rotation
	};

	socket.emit('start', fighterData);

	socket.on('connect', function()
		{
			console.log("\nConnected to Server\nSocket ID: " + (socket.id).substring(0,3));
		});

	
	socket.on('heartbeat', function(data)
	{
		// var newFighter;
		// for(var i; i<data.length;i++)
		// {
		// 	newFighter = new Fighter(data[i].health, data[i].x, data[i].y, data[i].walkAnimation, data[i].swingAnimation, data[i].deathAnimation, data[i].idleAnimation)
		// 	fightersArr.push(newFighter);
		// }
		
		if(data.length > fightersArr.length)
		{
			for(var i = 0; i<data.length; i++)
			{	
				fightersArr[i] = new Fighter(100, width/2, height/2, walkAnimation, swingAnimation, deathAnimation, idleAnimation);
			}
		}

		for(var i = 0; i < data.length; i++)
		{
			fightersArr[i].health = data[i].health;
			fightersArr[i].alive = data[i].alive;
			fightersArr[i].sprite.position.x = data[i].x;
			fightersArr[i].sprite.position.y = data[i].y;
			fightersArr[i].sword.visible = data[i].swinging;
			fightersArr[i].sprite.changeAnimation(data[i].currAnimation);
			fightersArr[i].sprite.debug = data[i].spriteDebug;
			fightersArr[i].sword.debug = data[i].swordDebug;
			fightersArr[i].sprite.rotation = data[i].rot;
		}
	
	});

}

function draw()
{
	background(108, 135, 175);

	cursorSprite.position.x = mouseX;
	cursorSprite.position.y = mouseY;

	fighter.sprite.changeAnimation('idle');

	var fighterData = {
		health: fighter.health,
		alive: fighter.alive,
		x: fighter.sprite.position.x,
		y: fighter.sprite.position.y,
		swinging: fighter.sword.visible,
		currAnimation: fighter.sprite.getAnimationLabel(),
		spriteDebug: fighter.sprite.debug,
		swordDebug: fighter.sword.debug,
		rot: fighter.sprite.rotation
	};

	if(keyDown("w"))
	{
		fighter.walk("forward");
	}
	if(keyWentDown(27))
	{
		//socket.close();
		socket.disconnect();
		//socket.emit('remove');
		fightersArr = [];
		console.log("\nDisconnected from the server");
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


	socket.emit('update', fighterData);

	drawSprites();	
}