var enemyWalkAnimation;
var enemyAttackAnimation;
var enemyIdleAnimation;
var fighterWalkAnimation;
var fighterSwingAnimation;
var fighterDeathAnimation;
var fighterIdleAnimation;
var customCursor;
var spawnerImage;
var landscape;
var initializedObs;
var initializedChe;

var localFighter;

var chestArr = [];
var openChest;
var closedChest;

var obstaclesArr = [];
var bush;

var landscapeSprite;

var fighterGroup; // Fighter sprites group
var enemyGroup; // Enemy sprites group
var swordGroup;
var obstacleGroup;
var chestGroup;
var spawnerGroup;

var enemyArray = [];
var fighterArray = [];
var spawnerArray = [];

var cursorSprite;
var SCENE_H = 1450;
var SCENE_W = 2000;

var score = 10;

var footsteps;
var swordSound;

/* TODO: delete this after testing. */
var testSpawner;
var testSpawner2;

/* Enemy Types */
var goblin;

/* Player Types */
var knight;


function preload()
{
	enemyWalkAnimation = loadAnimation("assets/enemy/walk/enemyWalking00.png", "assets/enemy/walk/enemyWalking09.png");
	enemyAttackAnimation = loadAnimation("assets/enemy/attack/enemyAttack0.png", "assets/enemy/attack/enemyAttack3.png");
	enemyIdleAnimation = loadAnimation("assets/enemy/enemyIdle.png");

	knightWalkAnimation = loadAnimation("assets/fighter/walk/walk00.png","assets/fighter/walk/walk09.png");
	knightSwingAnimation = loadAnimation("assets/fighter/swing/swing0.png","assets/fighter/swing/swing6.png");
	knightDeathAnimation = loadAnimation("assets/fighter/death/death00.png","assets/fighter/death/death18.png");
	knightIdleAnimation = loadAnimation("assets/fighter/fighter_idle.png");

	customCursor = loadImage("assets/cursor.png");
	spawnerImage = loadImage("assets/spawner.png");

	openChest = loadImage("assets/obstacles/chest_open.png");
	closedChest = loadImage("assets/obstacles/chest_closed.png");

	landscape = loadImage("assets/map.png")

	bush = loadImage("assets/obstacles/bush.png");

	//footsteps = loadSound("assets/sounds/Marching.wav");
	//swordSound = loadSound("assets/sounds/Woosh.wav");
}

/* Assigns values to the various types of Enemies and Fighters that we have. */
function assignTypes()
{
	goblin = {
		walkAnimation: enemyWalkAnimation,
		idleAnimation: enemyIdleAnimation,
		attackAnimation: enemyAttackAnimation,
		health: 100,
		damage: .7,
		speed: 1.8,
		detectionRadius: 225
	};

	knight = {
		walkAnimation: knightWalkAnimation,
		idleAnimation: knightIdleAnimation,
		deathAnimation: knightDeathAnimation,
		swingAnimation: knightSwingAnimation,
		health: 100,
		speed: 3,
		damage: 2.53
	};
}

function setup()
{

	createCanvas(1000, 725);

	landscapeSprite = createSprite(1000, 725, SCENE_W, SCENE_H);
	landscapeSprite.addImage(landscape);
	landscapeSprite.depth = 1;

	assignTypes();
	initializedObs = 0;
	initializedChe = 0;

	/* Connect to the server */
	socket = io.connect('http://localhost:3000');

	fighterGroup = new Group();
	enemyGroup = new Group();
	swordGroup = new Group();
	obstacleGroup = new Group();
	chestGroup = new Group();
	spawnerGroup = new Group();

	localFighter = new Fighter(1450, 960, knight);

	localFighter.depth = 10;

	fighterArray.push(localFighter);
	fighterGroup.push(localFighter.sprite);

	/* Create the custom cursor and initialize its position to the middle of the canvas */
	cursorSprite = createSprite(width/2, height/2);
	cursorSprite.addImage(customCursor);

	noCursor(); // Hides the system's cursor when inside the canvas

	testSpawner = new EnemySpawner(400, 163, goblin, .5, 7, spawnerImage);
	testSpawner.sprite.depth = 1;
	spawnerArray.push(testSpawner);
	testSpawner2 = new EnemySpawner(930, 827, goblin, .5, 18, spawnerImage);
	testSpawner2.sprite.depth = 1;
	spawnerArray.push(testSpawner2);



	socket.on('updateObstacles', function(data) {
		var obsDepth = 500;
		if (initializedObs == 0) {
			console.log("Recieved Obstacles");
			for (var i=0; i < data.length; i++) {
				var obstacle = new Obstacle(data[i].x, data[i].y, 40, 40, bush);
				obstacle.sprite.depth = obsDepth;
				obstacle.sprite.setCollider('circle',0,0,bush.width/3);
				obstaclesArr.push(obstacle);
				obstacleGroup.add(obstacle.sprite);
				obsDepth++;
			}
			initializedObs = 1;
		}
	});

	socket.on('updateChests', function(chestData) {
		var cheDepth = 1000;
		if (initializedChe == 0){
			console.log("Recieved Chests");
			for (i=0; i<chestData.length; i++) {
				var chest = new Chest(chestData[i].x, chestData[i].y, openChest, closedChest);
				chest.sprite.depth = cheDepth;
				chestArr.push(chest);
				chestGroup.add(chest.sprite);
				cheDepth++;
			}
			initializedChe = 1;
		}
	});

	socket.on('updateFighters', function(data)
	{	
		if(data.length > fighterArray.length)
		{
			for(var i = 0; i<data.length; i++)
			{	
				fighterArray[i] = new Fighter(100, width/2, height/2, walkAnimation, swingAnimation, deathAnimation, idleAnimation);
			}
		}
		for(var i = 0; i < data.length; i++)
		{
			fighterArray[i].health = data[i].health;
			fighterArray[i].alive = data[i].alive;
			fighterArray[i].sprite.position.x = data[i].x;
			fighterArray[i].sprite.position.y = data[i].y;
			fighterArray[i].sword.visible = data[i].swinging;
			fighterArray[i].sprite.changeAnimation(data[i].currAnimation);
			fighterArray[i].sprite.debug = data[i].spriteDebug;
			fighterArray[i].sword.debug = data[i].swordDebug;
			fighterArray[i].sprite.rotation = data[i].rot;
		}
	});

	createHud();
}

function draw()
{
	background(55,75,30);


	cursorSprite.position.x = mouseX;
	cursorSprite.position.y = mouseY;


	cursorSprite.position.x = camera.mouseX;
	cursorSprite.position.y = camera.mouseY;

	camera.position.x = localFighter.sprite.position.x;
	camera.position.y = localFighter.sprite.position.y;

 	/* This makes the camera stop moving when it hits the edges of the map. Unlocks character movement for that direction */
	borderCamera();

	if (localFighter.sprite.overlap(obstacleGroup)) {
		localFighter.sprite.bounce(obstacleGroup);
	};
	for (var i=0; i<chestArr.length; i++) {
		if (localFighter.sprite.overlap(chestArr[i].sprite)) {
			localFighter.sprite.bounce(chestArr[i].sprite);
		}

		if (localFighter.sprite.sword.overlap(chestArr[i].sprite)) {
			if (keyDown('e')) {
				chestArr[i].open();
				chestArr[i].update;
			}
		}
	}

	if(keyDown('w'))
	{
		localFighter.walk("up");
	}
	if(keyDown('s'))
	{
		localFighter.walk("down");
	}
	if(keyDown('a'))
	{
		localFighter.walk("left");
	}
	if(keyDown('d'))
	{
		localFighter.walk("right");
	}

	if(mouseDown())
	{
		localFighter.sprite.sword.visible = true;
	}
	else
	{
		localFighter.sprite.sword.visible = false;
	}

	/* Invisible landscapeSprite around landscape */
	if(localFighter.sprite.position.x < 0) {
		localFighter.sprite.position.x = 0;
	}
	if(localFighter.sprite.position.y < 0) {
	    localFighter.sprite.position.y = 0;
	}
	if(localFighter.sprite.position.x > SCENE_W) {
	    localFighter.sprite.position.x = SCENE_W;
	}
	if(localFighter.sprite.position.y > SCENE_H) {
	    localFighter.sprite.position.y = SCENE_H;
	}

	if(mouseWentDown())
	{
		reduceStaminaWidth();
	}


	localFighter.update(enemyGroup);

	for (var i = 0; i < spawnerArray.length; i++) {
		spawnerArray[i].spawn(enemyGroup);
		spawnerArray[i].updateAll(fighterArray);
	}

	drawSprites();
	drawSprite(cursorSprite);

	
	drawHud();

}

function borderCamera()
{
	var top = camera.position.y - (height / 2);
	var bottom = camera.position.y + (height / 2);

	var left = camera.position.x - (width / 2);
	var right = camera.position.x + (width / 2);

	if(top < 0)
	{
		camera.position.y = height/2;
	}
	if(bottom > SCENE_H)
	{
		camera.position.y = SCENE_H - height/2;
	}
	if(left < 0)
	{
		camera.position.x = width/2;
	}
	if(right > SCENE_W)
	{
		camera.position.x = SCENE_W	- width/2;
	}
}
