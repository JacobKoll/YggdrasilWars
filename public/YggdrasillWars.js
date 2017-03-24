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

var emptyInventoryImage;
var basicSwordImage;

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


var isMod;
var isSpectator;
var isPlayer;

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
	emptyInventoryImage = loadImage("assets/emptyInventory.png")
	basicSwordImage = loadImage("assets/basicSword.png")

	bush = loadImage("assets/obstacles/bush.png");
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

function becomePlayer() 
{
	isPlayer = true;
	localFighter = new Fighter(1450, 960, knight);

	fighterArray.push(localFighter);
	fighterGroup.push(localFighter.sprite);

	createHud();



}

function becomeSpectator() 
{
	isSpectator = true;		
}

function becomeMod() 
{
	isMod = true;
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

	// becomePlayer();
	becomeSpectator();
	//becomeMod();

	if(isPlayer)
	{
		/* Send new local fighter data to the server */
		var localFighterData = {
			health: localFighter.health,
			alive: localFighter.alive,
			x: localFighter.sprite.position.x,
			y: localFighter.sprite.position.y,
			currAnimation: localFighter.sprite.getAnimationLabel(),
			spriteDebug: localFighter.sprite.debug,
			swordDebug: localFighter.sprite.sword.debug,
			rot: localFighter.sprite.rotation
		}
		socket.emit('start', localFighterData);
	}


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

	
}

function draw()
{
	background(55,75,30);


	cursorSprite.position.x = mouseX;
	cursorSprite.position.y = mouseY;

	cursorSprite.position.x = camera.mouseX;
	cursorSprite.position.y = camera.mouseY;



	if(isPlayer)
	{
		camera.position.x = localFighter.sprite.position.x;
		camera.position.y = localFighter.sprite.position.y;

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
			reduceStaminaWidth();
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


		localFighter.update(enemyGroup);


		drawHud();
	}
	else if(isSpectator)
	{
		var spectatorSpeed = 5.6;

		if(keyDown(16))
		{
			spectatorSpeed = 9.81;
		}

		if(keyDown('w'))
		{
			camera.position.y -= spectatorSpeed;
		}
		if(keyDown('s'))
		{
			camera.position.y += spectatorSpeed;
		}
		if(keyDown('a'))
		{
			camera.position.x -= spectatorSpeed;
		}
		if(keyDown('d'))
		{
			camera.position.x += spectatorSpeed;
		}
		if(keyDown(188))
		{
			camera.zoom = 1.5;
		}
		else if(keyDown(190))
		{
			camera.zoom = 0.5;
		}
		else
		{
			camera.zoom = 1;
		}
	}
	else if(isMod)
	{

	}

	for (var i = 0; i < spawnerArray.length; i++)
	{
		spawnerArray[i].spawn(enemyGroup);
		spawnerArray[i].updateAll(fighterArray);
	}


	drawSprites();
	drawSprite(cursorSprite);

	borderCamera();
}


function borderCamera()
{
	var top = camera.position.y - ((height * 1/camera.zoom)  / 2);
	var bottom = camera.position.y + ((height * 1/camera.zoom)  / 2);

	var left = camera.position.x - ((width * 1/camera.zoom) / 2);
	var right = camera.position.x + ((width * 1/camera.zoom) / 2);

	if(top < 0)
	{
		camera.position.y = (height * 1/camera.zoom) /2;
	}
	if(bottom > SCENE_H)
	{
		camera.position.y = SCENE_H - (height * 1/camera.zoom) /2;
	}
	if(left < 0)
	{
		camera.position.x = (width * 1/camera.zoom)/2;
	}
	if(right > SCENE_W)
	{
		camera.position.x = SCENE_W	- (width * 1/camera.zoom)/2;
	}
}
