
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

var obstaclesArr = [];


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


var SCENE_H = 4000;
var SCENE_W = 4000;

var score = 10;
var partyScreen;



var spawner;
var numSpawners;

var playerTypeArray;
var enemyTypeArray;

var globalType;

// var miniMap;

var healthBars;

var isMod;
var isSpectator;
var isPlayer;
var paused = false;

var numTeamMates = 0;
var tempUnlockCode = [1,2,3];
var lockProgress = 0;

var hudNeedReset = false;

/* Assigns values to the various types of Enemies and Fighters that we have. */
function assignTypes()
{
	var goblin = {
		walkAnimation: enemyWalkAnimation,
		idleAnimation: enemyIdleAnimation,
		attackAnimation: enemyAttackAnimation,
		health: 100,
		damage: .83,
		speed: 1.8,
		detectionRadius: 225,
		scale: .75,
		friction: 0.5
	};

	var spider = {
		walkAnimation: enemyWalkAnimation,
		idleAnimation: enemyIdleAnimation,
		attackAnimation: enemyAttackAnimation,
		health: 100,
		damage: .50,
		speed: 3,
		detectionRadius: 300
	};

	var bat = {
		walkAnimation: enemyWalkAnimation,
		idleAnimation: enemyIdleAnimation,
		attackAnimation: enemyAttackAnimation,
		health: 50,
		damage: .25,
		speed: 9,
		detectionRadius: 500
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
		weaponCollider: [0, 0, 104],
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
		scale: 1.3,
		spriteCollider: [0,0,25],
		weaponCollider: [0,0,53],
		leftConeAngle: 35,
		rightConeAngle: 112
	};

	var barb = {
		walkAnimation: barbWalkAnimation,
		idleAnimation: barbIdleAnimation,
		swingAnimation: barbSwingAnimation,
		stamina: 300,
		staminaRate: 2,
		health: 150,
		speed: 2,
		damage: 1.5,
		scale: 1.5,
		spriteCollider: [0,0,22.5],
		weaponCollider: [0,0,60],
		leftConeAngle: -38,
		rightConeAngle: 42
	};

	var mercenary = {
		walkAnimation: mercWalkAnimation,
		idleAnimation: mercIdleAnimation,
		swingAnimation: mercSwingAnimation,
		stamina: 145,
		staminaRate: 2,
		health: 125,
		speed: 3.2,
		scale: 1.15,
		damage: 1.15,
		spriteCollider: [0,0,24],
		weaponCollider: [0,0,64],
		leftConeAngle: -8,
		rightConeAngle: 45
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
		spriteCollider: [0,0,23],
		weaponCollider: [0,0,71],
		leftConeAngle: 10,
		rightConeAngle: 38
	};

	enemyTypeArray = [
		goblin,
		spider,
		bat
	];

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
	isPlayer = true;

	globalType = playerType;


	localFighter = new Fighter(random(SCENE_H), random(SCENE_W), playerTypeArray[playerType]);

	if(playerType == "Calvary")
	{
		localFighter.sprite.rotateToDirection = true;
		localFighter.sprite.sword.rotateToDirection = true;
	}

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


numSpawners = round(random(5, 20));
for(var i = 0; i < numSpawners; i++){
	spawner = new EnemySpawner(random(SCENE_W), random(SCENE_H), enemyTypeArray[round(random(2))], random(.5, 2), round(random(5, 15)), spawnerImage);
	spawner.sprite.depth = i;
	spawnerArray.push(spawner);
}





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





	// miniMap = new miniMap(1000,1000);
	partyScreen = new partyScreen(1000,1000, "Character", "Health", "Points");

	time = 120;
	counter=setInterval(timer, 1000);
	setChestsCode();


}

function mouseReleased(){
	swordSound.stop();
}

function keyPressed(){
	if(keyCode == 82 && time == 0){
		loop();
		location.reload();
	}

}

function drawGame()
{

	background(55,75,30);

	cursorSprite.position.x = mouseX;
	cursorSprite.position.y = mouseY;

	cursorSprite.position.x = camera.mouseX;
	cursorSprite.position.y = camera.mouseY;


	// miniMap.sprite.position.x = camera.position.x;
	// miniMap.sprite.position.y = camera.position.y;

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
			camera.zoom = 0.3;
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
		// if(keyWentDown('m'))
		// 	{
		// 	miniMap.createDots(enemyGroup);
		// }
		if(keyDown('m'))
		{
			// miniMap.sprite.visible = true;
			// miniMap.sprite.depth = 1500;
			// miniMap.update();
			// miniMap.show();
			camera.zoom = 0.3;
			deleteHud();
			hudNeedReset = true;

		}
		else {
			if(hudNeedReset){
				createHud();
				hudNeedReset = false;

			}
			// miniMap.sprite.visible = false;
			// miniMap.delete();
			camera.zoom = 1;
			drawHud();
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
	}


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





	// stroke("grey");
	// strokeWeight(1);
	// line(localFighter.sprite.position.x, localFighter.sprite.position.y, camera.mouseX, camera.mouseY);

	if(time == 0){
		noLoop();
		textSize(80);
		textAlign(CENTER);
		text("Press 'R' \n to return to the title screen.", camera.position.x, camera.position.y);
		text("Your final score:" + score, camera.position.x, camera.position.y - 100);

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
