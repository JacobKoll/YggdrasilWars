// This is where the gameplay actually is.

var walkAnimation;
var swingAnimation;
var deathAnimation;
var idleAnimation;
var bush;

var fighter;
var fightersArr = [];
var dataArr = [];
var obstaclesArr = [];
var tiles = [];
var customCursor;
var cursorSprite;
var logTime = 0;

function preload()
{
	walkAnimation = loadAnimation("assets/fighter/walk/walk00.png","assets/fighter/walk/walk09.png");
	swingAnimation = loadAnimation("assets/fighter/swing/swing0.png","assets/fighter/swing/swing6.png");
	deathAnimation = loadAnimation("assets/fighter/death/death00.png","assets/fighter/death/death18.png");
	idleAnimation = loadAnimation("assets/fighter/fighter_idle.png");
	bush = loadImage("assets/fighter/bush.png");

	customCursor = loadAnimation("assets/fighter/cursor.png");
}

function setup()
{
	var canvas = createCanvas(720, 480);
	//socket = io.connect('http://proj-309-la-1.cs.iastate.edu:3000');
	socket = io.connect('http://localhost:3000');

	for (var i = 0; i<canvas.width; i++) {
		for (var j = 0; j<canvas.height; j++) {
			var num = [0, 1, 2];
			var gdorn = random(num);
			var tile;
			if (gdorn == 0) {
				tile = new Tile(i+(canvas.width/20), j+(canvas.height/20), "grass", canvas);
			}
			else if (gdorn == 1) {
			 	tile = new Tile(i+(canvas.width/20), j+(canvas.height/20), "dirt", canvas);
			}
			else {
				tile = new Tile(i+(canvas.width/20), j+(canvas.height/20), "darkness", canvas);
			}
			tiles.push(tile);
			j = j + (canvas.height/10)-1;
		}
		i = i + (canvas.width/10)-1;
	}

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

	socket.on('obstacles', function(data) {
		for (var i=0; i<data.length; i++) {
			var obstacle = new Obstacle(data[i].x, data[i].y, 40, 40, bush);
			obstaclesArr.push(obstacle);
		}
	});
		// socket.on('tiles', function(data) {
	// 	for (var i=0; i<data.length; i++) {
	// 		var tile = new Tile(i+(canvas.width/20), j+(canvas.height/20), data[i].type, canvas);
	// 		tiles.push(tile);
	// 	}
	// });

	
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

	for (var i = 0; i<obstaclesArr.length; i++) {
		obstaclesArr[i].update;
	}

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
		var overlap = false;
		for (var i=0; i<obstaclesArr.length; i++) {
			if (fighter.sprite.overlap(obstaclesArr[i].sprite)) {
				fighter.sprite.bounce(obstaclesArr[i].sprite);
				break;
			};
		}
		for (i=0; i<fightersArr.length; i++) {
			if (fightersArr.id != fighter.id && (fighter.sprite.overlap(fightersArr[i].sprite))) {
				fighter.sprite.bounce(fightersArr[i].sprite);
				break;
			}
		}
		for (i=0; i<tiles.length; i++) {
			if (fighter.sprite.overlap(tiles[i].sprite)) {
				var acceleration = tiles[i].hardness * (-1);
				fighter.sprite.addSpeed(acceleration, fighter.sprite.getDirection());
				break;
			}
		}
		if (overlap == false) {
		fighter.walk("forward");
		}
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