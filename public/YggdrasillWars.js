var enemyWalkAnimation;
var enemyAttackAnimation;
var enemyIdleAnimation;

var fighterSwingAnimation;
var fighterDeathAnimation;
var fighterIdleAnimation;

var knightWalkAnimation;
var knightSwingAnimation;
var knightIdleAnimation;

var rogueWalkAnimation;
var rogueSwingAnimation;
var rogueIdleAnimation;

var mercWalkAnimation;
var mercSwingAnimation;
var mercIdleAnimation;

var barbWalkAnimation;
var barbSwingAnimation;
var barbIdleAnimation;

var calvaryWalkAnimation;
var calvarySwingAnimation;
var calvaryIdleAnimation;

var time = 7;
var counter;

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
var partyScreen;

var footsteps;
var swordSound;

/* TODO: delete this after testing. */
var testSpawner;
var testSpawner2;

/* Enemy Types */
var goblin;

/* Player Types */

var playerTypeArray;

var globalType;

var miniMap;

var healthBars;

var isMod;
var isSpectator;
var isPlayer;
var paused = false;

var footsteps;
var swordSound;

var numTeamMates = 0;
var tempUnlockCode = [1,2,3];
var lockProgress = 0;


function preloadGameAssets()
{
	enemyWalkAnimation = loadAnimation("assets/enemy/walk/enemyWalking00.png", "assets/enemy/walk/enemyWalking09.png");
	enemyAttackAnimation = loadAnimation("assets/enemy/attack/enemyAttack0.png", "assets/enemy/attack/enemyAttack3.png");
	enemyIdleAnimation = loadAnimation("assets/enemy/enemyIdle.png");

	knightWalkAnimation = loadAnimation("assets/fighter/walk/walk00.png","assets/fighter/walk/walk09.png");
	knightSwingAnimation = loadAnimation("assets/fighter/swing/swing0.png","assets/fighter/swing/swing6.png");
	knightIdleAnimation = loadAnimation("assets/fighter/fighter_idle.png");

	rogueWalkAnimation = loadAnimation("assets/rogue/walk/roguewalk0.png","assets/rogue/walk/roguewalk7.png");
	rogueSwingAnimation = loadAnimation("assets/rogue/attack/rogueattack0.png","assets/rogue/attack/rogueattack6.png");
	rogueIdleAnimation = loadAnimation("assets/rogue/walk/roguewalk3.png");

	mercWalkAnimation = loadAnimation("assets/mercenary/walk/mercwalk00.png","assets/mercenary/walk/mercwalk11.png");
	mercSwingAnimation = loadAnimation("assets/mercenary/attack/mercattack0.png","assets/mercenary/attack/mercattack5.png");
	mercIdleAnimation = loadAnimation("assets/mercenary/walk/mercwalk00.png");

	barbWalkAnimation = loadAnimation("assets/barbarian/walk/barbwalk0.png","assets/barbarian/walk/barbwalk7.png");
	barbSwingAnimation = loadAnimation("assets/barbarian/attack/barbattack0.png","assets/barbarian/attack/barbattack5.png");
	barbIdleAnimation = loadAnimation("assets/barbarian/walk/barbwalk2.png");

	calvaryWalkAnimation = loadAnimation("assets/calvary/walk/calvarywalk0.png","assets/calvary/walk/calvarywalk3.png");
	calvarySwingAnimation = loadAnimation("assets/calvary/swing/calvaryswing0.png","assets/calvary/swing/calvaryswing5.png");
	calvaryIdleAnimation = loadAnimation("assets/calvary/walk/calvarywalk3.png");

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
	// NOTE: Goblin is still global 
	goblin = {
		walkAnimation: enemyWalkAnimation,
		idleAnimation: enemyIdleAnimation,
		attackAnimation: enemyAttackAnimation,
		health: 100,
		damage: .83,
		speed: 1.8,
		detectionRadius: 225
	};

	var knight = {
		walkAnimation: knightWalkAnimation,
		idleAnimation: knightIdleAnimation,
		swingAnimation: knightSwingAnimation,
		stamina: 120,
		staminaRate: 2,
		health: 135,
		speed: 3,		
		scale: 1,
		damage: 1.2,
		spriteCollider: [0, 0, 30], // {offsetX, offsetY, radius}
		weaponCollider: [0, 0, 107],
		leftConeAngle: -32,
		rightConeAngle: 28
	};

	var calvary = {
		walkAnimation: calvaryWalkAnimation,
		idleAnimation: calvaryIdleAnimation,
		swingAnimation: calvarySwingAnimation,
		stamina: 135,
		staminaRate: 2,
		health: 120,
		speed: 4,
		damage: 1.1,
		scale: 2.5,
		spriteCollider: [0,0,30],
		weaponCollider: [0,0,107],
		leftConeAngle: -32,
		rightConeAngle: 28
	};

	var barb = {
		walkAnimation: barbWalkAnimation,
		idleAnimation: barbIdleAnimation,
		swingAnimation: barbSwingAnimation,
		stamina: 150,
		staminaRate: 2,
		health: 150,
		speed: 2,
		damage: 1.5,
		scale: 2,
		spriteCollider: [0,0,30],
		weaponCollider: [0,0,107],
		leftConeAngle: -42,
		rightConeAngle: 38
	};

	var mercenary = {
		walkAnimation: mercWalkAnimation,
		idleAnimation: mercIdleAnimation,
		swingAnimation: mercSwingAnimation,
		stamina: 145,
		staminaRate: 2,
		health: 125, 
		speed: 3.2,
		scale: 1.5,
		damage: 1.15,
		spriteCollider: [0,0,30],
		weaponCollider: [0,0,107],
		leftConeAngle: -32,
		rightConeAngle: 28
	};

	var rogue = {
		walkAnimation: rogueWalkAnimation,
		idleAnimation: rogueIdleAnimation,
		swingAnimation: rogueSwingAnimation,
		stamina: 120,
		staminaRate: 2,
		health: 100,
		speed: 3.4,
		scale: .8,
		damage: 1,
		spriteCollider: [0,0,30],
		weaponCollider: [0,0,107],
		leftConeAngle: -32,
		rightConeAngle: 28
	};

	playerTypeArray = {
		"Knight" : knight,
		"Calvary" : calvary,
		"Barbarian" : barb,
		"Mercenary" : mercenary,
		"Rogue" : rogue,
	};
}

function becomePlayer(playerType)
{
	console.log("When implemented, you will become the type " + playerType + ", but for now, it's still just a knight.");

	isPlayer = true;

	globalType = playerType;

	localFighter = new Fighter(random(1450), random(960), playerTypeArray[playerType]);
	numTeamMates++;

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

function setChestsCode(){
	for(var i=0; i<chestArr.length; i++){
		chestArr[i].setUnlockCode();

	}
}


function setupGame()
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
	healthBars = new Group();

	// becomePlayer();
	// becomeSpectator();
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
				var chest = new Chest(chestData[i].x, chestData[i].y, openChest, closedChest, tempUnlockCode,3);
				chest.setUnlockCode();
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
	partyScreen = new partyScreen(1000,1000, "Character", "Health", "Points");

	time = 7;
	counter=setInterval(timer, 1000);
	setChestsCode();
	

}

function mouseReleased(){
	swordSound.stop();
}


function drawGame()
{	
	
	background(55,75,30);

	cursorSprite.position.x = mouseX;
	cursorSprite.position.y = mouseY;

	cursorSprite.position.x = camera.mouseX;
	cursorSprite.position.y = camera.mouseY;


	miniMap.sprite.position.x = camera.position.x;
	miniMap.sprite.position.y = camera.position.y;

	partyScreen.sprite.position.x = camera.position.x;
	partyScreen.sprite.position.y = camera.position.y;


	if(isPlayer)
	{
		camera.position.x = localFighter.sprite.position.x;
		camera.position.y = localFighter.sprite.position.y;

		if(localFighter.sprite.overlap(obstacleGroup))
		{
			localFighter.speed = localFighter.maxSpeed - 1.213;
		}
		else
		{
			localFighter.speed = localFighter.maxSpeed;

		}

		for (var i=0; i<chestArr.length; i++)
		{
			localFighter.sprite.collide(chestArr[i].sprite);



			if (localFighter.sprite.sword.overlap(chestArr[i].sprite)) {


				if (keyDown(chestArr[i].unlockCode[lockProgress]) && !(chestArr[i].isOpen)){

					lockProgress+=1;
					if(lockProgress == chestArr[i].lockStrength){
						lockProgress = 0;
						chestArr[i].setUnlockCode();
						chestArr[i].open();
						chestArr[i].update;

					}
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
		
		for (var i=0; i<chestArr.length; i++)
		{
			localFighter.sprite.collide(chestArr[i].sprite);

			if (localFighter.sprite.sword.overlap(chestArr[i].sprite) && !(chestArr[i].isOpen)) {
				text(chestArr[i].unlockCode[0], localFighter.sprite.position.x, localFighter.sprite.position.y+10);
				text(chestArr[i].unlockCode[1], localFighter.sprite.position.x + 20, localFighter.sprite.position.y+10);
				text(chestArr[i].unlockCode[2], localFighter.sprite.position.x + 40, localFighter.sprite.position.y+10);

			}
		}

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
			camera.zoom = 1.7;
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
	
	if(keyWentDown('p'))
	{
		partyScreen.draw();
	}



	if(keyDown('p'))
	{
		partyScreen.show();
		partyScreen.sprite.visible = true;

		partyScreen.move(camera.position.x + 200,camera.position.y - 200);
		text("Character", camera.position.x - 400, camera.position.y - 250);
		text("Health", camera.position.x + 130, camera.position.y - 250);
		text("Points", camera.position.x - 100, camera.position.y-250);
		partyScreen.addNames(fighterArray);
		partyScreen.addPoints(fighterArray);
	}
	else
	{
		partyScreen.sprite.visible = false;
		partyScreen.delete();
	}

	if(keyWentDown('m'))
	 	{
			miniMap.createDots(enemyGroup);
		}

		if(keyDown('m'))
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

	for (var i=0; i<chestArr.length; i++)
	{
		localFighter.sprite.collide(chestArr[i].sprite);



		if (localFighter.sprite.sword.overlap(chestArr[i].sprite) && !(chestArr[i].isOpen)) {
			text(chestArr[i].unlockCode[0], localFighter.sprite.position.x, localFighter.sprite.position.y+10);
			text(chestArr[i].unlockCode[1], localFighter.sprite.position.x + 20, localFighter.sprite.position.y+10);
			text(chestArr[i].unlockCode[2], localFighter.sprite.position.x + 40, localFighter.sprite.position.y+10);

		}
	}

	var leftX = localFighter.sprite.position.x + localFighter.sprite.sword.collider.radius * cos(radians(localFighter.sprite.rotation) - radians(localFighter.sprite.sword.rightCone));
	var leftY = localFighter.sprite.position.y + localFighter.sprite.sword.collider.radius * sin(radians(localFighter.sprite.rotation) - radians(localFighter.sprite.sword.rightCone));

	var rightX = localFighter.sprite.position.x + localFighter.sprite.sword.collider.radius * cos(radians(localFighter.sprite.rotation) - radians(localFighter.sprite.sword.leftCone));
	var rightY = localFighter.sprite.position.y + localFighter.sprite.sword.collider.radius * sin(radians(localFighter.sprite.rotation) - radians(localFighter.sprite.sword.leftCone));

	textSize(6);
	stroke("red");
	strokeWeight(2);
	line(localFighter.sprite.position.x, localFighter.sprite.position.y, leftX, leftY);
	text("L", leftX, leftY);	
		
	stroke("blue");
	strokeWeight(2);
	line(localFighter.sprite.position.x, localFighter.sprite.position.y, rightX, rightY);
	text("R", rightX, rightY);	
}	
	// stroke("grey");
	// strokeWeight(1);
	// line(localFighter.sprite.position.x, localFighter.sprite.position.y, camera.mouseX, camera.mouseY);

	if(time == 0){
		textSize(80);
		text("Press 'R' to return to the title screen.", localFighter.sprite.position.x, localFighter.sprite.position.y);
		if(keyDown('r')){
		location.reload();
	}
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