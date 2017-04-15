var enemyWalkAnimation;
var enemyAttackAnimation;
var enemyIdleAnimation;
var fighterSwingAnimation;
var fighterDeathAnimation;
var fighterIdleAnimation;
var customCursor;
var spawnerImage;
var landscape;

var emptyInventoryImage;
var basicSwordImage;

var bronzeSwordImage;
var silverSwordImage;
var goldSwordImage;

var characterImages = [];

var initializedObs;
var initializedChe;

var localFighter;

var chestArr = [];
var openChest;
var closedChest;


var obstaclesArr = [];
var forest;

var landscapeSprite;

var fighterGroup; // Fighter sprites group
var enemyGroup; // Enemy sprites group
var swordGroup;
var obstacleGroup;
var chestGroup;
var spawnerGroup;
var enemySymbols;

var enemyArray = [];
var fighterArray = [];
var spawnerArray = [];

var cursorSprite;
var SCENE_H = 4000;
var SCENE_W = 4000;

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

var miniMap;


var isMod;
var isSpectator;
var isPlayer;
var paused = false;

var footsteps;
var swordSound;

var isMod;
var isSpectator;
var isPlayer;
var paused = false;

function preload()
{
	enemyWalkAnimation = loadAnimation("assets/enemy/walk/enemyWalking00.png", "assets/enemy/walk/enemyWalking09.png");
	enemyAttackAnimation = loadAnimation("assets/enemy/attack/enemyAttack0.png", "assets/enemy/attack/enemyAttack3.png");
	enemyIdleAnimation = loadAnimation("assets/enemy/enemyIdle.png");
	characterImages.push(enemyIdleAnimation);

	knightWalkAnimation = loadAnimation("assets/fighter/walk/walk00.png","assets/fighter/walk/walk09.png");
	knightSwingAnimation = loadAnimation("assets/fighter/swing/swing0.png","assets/fighter/swing/swing6.png");
	knightDeathAnimation = loadAnimation("assets/fighter/death/death00.png","assets/fighter/death/death18.png");
	knightIdleAnimation = loadAnimation("assets/fighter/fighter_idle.png");
	characterImages.push(knightIdleAnimation);

	customCursor = loadImage("assets/cursor.png");
	spawnerImage = loadImage("assets/spawner.png");

	openChest = loadImage("assets/obstacles/chest_open.png");
	closedChest = loadImage("assets/obstacles/chest_closed.png");

	landscape = loadImage("assets/map.png");
	emptyInventoryImage = loadImage("assets/inventory/emptyInventory.png");
	basicSwordImage = loadImage("assets/inventory/basicSword.png");
	bronzeSwordImage = loadImage("assets/inventory/bronzeSword.png");
	silverSwordImage = loadImage("assets/inventory/silverSword.png");
	goldSwordImage = loadImage("assets/inventory/goldSword.png");

	footsteps = loadSound("assets/sounds/Marching.wav");
	swordSound = loadSound("assets/sounds/Woosh.wav");


	forest = loadImage("assets/obstacles/forest.png");
}

/* Assigns values to the various types of Enemies and Fighters that we have. */
function assignTypes()
{
	goblin = {
		walkAnimation: enemyWalkAnimation,
		idleAnimation: enemyIdleAnimation,
		attackAnimation: enemyAttackAnimation,
		health: 100,
		damage: .83,
		speed: 1.8,
		detectionRadius: 225
	};

	knight = {
		walkAnimation: knightWalkAnimation,
		idleAnimation: knightIdleAnimation,
		deathAnimation: knightDeathAnimation,
		swingAnimation: knightSwingAnimation,
		health: 135,
		speed: 3,		
		damage: 1.2,
		spriteCollider: [0, 0, 30], // {offsetX, offsetY, radius}
		weaponCollider: [0, 0, 107],
		leftConeAngle: -32,
		rightConeAngle: 28
	};
}

function becomePlayer()
{
	isPlayer = true;
	localFighter = new Fighter(random(1450), random(960), knight);

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

	landscapeSprite = createSprite(SCENE_W/2, SCENE_H/2, SCENE_W, SCENE_H);
	landscapeSprite.addImage(landscape);
	landscapeSprite.depth = 1;

	footsteps.setVolume(0.15);

	initGameItems();

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
	enemySymbols = new Group();

	// becomePlayer();
	becomeSpectator();
	// becomeMod();

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
		var obsDepth = 1000;
		if (initializedObs == 0) {
			console.log("Recieved Obstacles");
			for (var i=0; i < data.length; i++) {
				var obstacle = new Obstacle(data[i].x, data[i].y, 40, 40, forest);
				obstacle.sprite.depth = obsDepth;
				obstaclesArr.push(obstacle);
				obstacleGroup.add(obstacle.sprite);
				obsDepth++;
			}
			initializedObs = 1;

		}
	});

	socket.on('updateChests', function(chestData) {
		var cheDepth = 1300;
		if (initializedChe == 0){
			console.log("Recieved Chests");
			for (i=0; i<chestData.length; i++) {
				var chest = new Chest(chestData[i].x, chestData[i].y, openChest, closedChest);
				chest.sprite.depth = cheDepth;
				chestArr.push(chest);
				chestGroup.add(chest.sprite);
				chest.sprite.scale = .5;
				cheDepth++;
			}
			initializedChe = 1;
		}
	});




	miniMap = new miniMap(1000,1000);

}

function mouseReleased(){
	swordSound.stop();

}

function draw()
{
	background(55,75,30);

	cursorSprite.position.x = mouseX;
	cursorSprite.position.y = mouseY;

	cursorSprite.position.x = camera.mouseX;
	cursorSprite.position.y = camera.mouseY;

	miniMap.sprite.position.x = camera.position.x;
	miniMap.sprite.position.y = camera.position.y; 

	if(isPlayer)
	{
		camera.position.x = localFighter.sprite.position.x;
		camera.position.y = localFighter.sprite.position.y;

		if(localFighter.sprite.overlap(obstacleGroup))
		{
			localFighter.speed = localFighter.maxSpeed - 2;
		}
		else
		{
			localFighter.speed = localFighter.maxSpeed;

		}

		for (var i=0; i<chestArr.length; i++)
		{
			localFighter.sprite.collide(chestArr[i].sprite);

			if (localFighter.sprite.sword.overlap(chestArr[i].sprite)) {
				if (keyDown('e') && !(chestArr[i].isOpen)) {
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
		if(keyWentDown('p')){

		miniMap.createDots(enemyGroup);
	
		}
		if(keyDown('p'))
		{
			console.log("Showing map");	
			miniMap.sprite.visible = true;
			miniMap.update();
			miniMap.show();

		}
		else{
		
		miniMap.sprite.visible = false;
		miniMap.delete();
	
		}
		if(keyWentDown(49))
		{
			localFighter.itemSelected = 0;
			localFighter.sprite.sword.damage = localFighter.inventory[0].dmg * localFighter.baseDamage;
			itemSelectedSpriteX = -150;
		}
		if(keyWentDown(50))
		{
			localFighter.itemSelected = 1;
			localFighter.sprite.sword.damage = localFighter.inventory[1].dmg * localFighter.baseDamage;
			itemSelectedSpriteX = -50;
		}
		if(keyWentDown(51))
		{
			localFighter.itemSelected = 2;
			localFighter.sprite.sword.damage = localFighter.inventory[2].dmg * localFighter.baseDamage;
			itemSelectedSpriteX = 50;
		}
		if(keyWentDown(52))
		{
			localFighter.itemSelected = 3;
			localFighter.sprite.sword.damage = localFighter.inventory[3].dmg * localFighter.baseDamage;
			itemSelectedSpriteX = 150;
		}


		if(localFighter.inventory[localFighter.itemSelected].name != "Empty" && (mouseDown() || keyDown(32))){
			localFighter.sprite.sword.visible = true;
			reduceStaminaWidth();
		}
		else
		{
			localFighter.sprite.sword.visible = false;
			restoreStaminaWidth();
		}

		restoreHealthWidth();

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
	}
	else
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
			camera.zoom = 1.3;
		}
		else if(keyDown(190))
		{
			camera.zoom = 0.4;
		}
		else
		{
			camera.zoom = 1;
		}

		if(isMod)
		{
			if(keyWentDown('c'))
			{
				socket.emit('addChest', camera.mouseX, camera.mouseY);
				console.log("Added Chest");
				initializedChe = false;
			}
			if(keyWentDown('o'))
			{
				socket.emit('addObstacle', camera.mouseX, camera.mouseY);
				console.log("Added Obstacle");
				initializedObs = false;
			}
		}
	}

	for (var i = 0; i < spawnerArray.length; i++)
	{
		spawnerArray[i].spawn(enemyGroup);
		spawnerArray[i].updateAll(fighterArray);
	}

	drawSprites();
	drawSprite(cursorSprite);

	borderCamera();

	if(isPlayer)
	{
		drawHud();
	}

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
