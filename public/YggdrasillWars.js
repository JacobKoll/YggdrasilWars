var time;

var counter;

var customCursor;

var localFighter;

var chestArr = [];

var fighterGroup; // Fighter sprites group
var enemyGroup; // Enemy sprites group
var swordGroup;
var obstacleGroup;
var chestGroup;
var spawnerGroup;
var enemySymbols;
var greenDotGroup;

// To be used later
var ruinsGroup;
var treesGroup;
var foodGroup;
var pointsGroup;
var fliesGroup;
var iceGroup;

var enemyArray = [];
var fighterArray = [];
var spawnerArray = [];


var SCENE_H = 4000;
var SCENE_W = 4000;

var score = 0;
var partyScreen;

var spawner;
var numSpawners;

var playerTypeArray;
var enemyTypeArray = [];

var globalType;

var miniMap;

var healthBars;

var isMod;
var isSpectator;
var isPlayer;
var paused = false;

var numTeamMates = 0;
var tempUnlockCode = [1,2,3];
var lockProgress = 0;

var hudNeedReset = false;

var	socket = io.connect('http://localhost:3000');

function becomePlayer(playerType)
{
	isPlayer = true;

	globalType = playerType;



	// localFighter = new Fighter(random(SCENE_H), random(SCENE_W), playerTypeArray[playerType]);
	localFighter = new Fighter(50, 50, playerTypeArray[playerType]);

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

function setChestsCode()
{
	for(var i=0; i<chestArr.length; i++)
	{
		chestArr[i].setUnlockCode();
	}
}


function setupGame()
{
	createCanvas(1000, 725);

	landscapeSprite = createSprite(SCENE_W/2, SCENE_H/2, SCENE_W, SCENE_H);
	landscapeSprite.addImage(landscape);
	landscapeSprite.depth = 1;

	footsteps.setVolume(0.10);

	initGameItems();
	assignTypes();

	/* Connect to the server */

	fighterGroup = new Group();
	enemyGroup = new Group();
	swordGroup = new Group();
	obstacleGroup = new Group();
	chestGroup = new Group();
	spawnerGroup = new Group();
	enemySymbols = new Group();
	healthBars = new Group();
	greenDotGroup = new Group();

	initSocketFunctions();

	/* Create the custom cursor and initialize its position to the middle of the canvas */
	cursorSprite = createSprite(width/2, height/2);
	cursorSprite.addImage(customCursor);

	noCursor();

	miniMap = new miniMap(1000,1000);
	partyScreen = new partyScreen(1000,1000, "Character", "Health", "Points");

	time = 120;
	counter=setInterval(timer, 1000);
	setChestsCode();

	socket.emit('requestMap');

}

function mouseReleased()
{
	swordSound.stop();
}

function keyPressed()
{
	if(keyCode == 82 && time == 0)
	{
		loop();
		location.reload();
	}
}


function keyReleased()
{
 	if(!keyIsDown(65) && !keyIsDown(83) && !keyIsDown(87) && !keyIsDown(68))
 	{
		galloping.stop();
		footsteps.stop();
	}

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

		localFighter.sprite.collide(chestGroup);

		for (var i=0; i<chestArr.length; i++)
		{

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
		if(keyWentDown('w'))
		{
			if(!galloping.isPlaying() && !footsteps.isPlaying())
			{
				if(globalType == "Calvary")
				{
					galloping.loop();
				}
				else
				{
					footsteps.loop();
				}
			}
		}

		if(keyDown('s'))
		{
			localFighter.walk("down");
		}
		if(keyWentDown('s')){
			if(!galloping.isPlaying() && !footsteps.isPlaying()){
			if(globalType == "Calvary"){
					galloping.loop();
				}
			else{
				footsteps.loop();
			}
			}
		}


		if(keyDown('a'))
		{
			localFighter.walk("left");
		}
		if(keyWentDown('a')){
			if(!galloping.isPlaying() && !footsteps.isPlaying()){
			if(globalType == "Calvary"){
					galloping.loop();
				}
			else{
				footsteps.loop();
			}
			}
		}


		if(keyDown('d'))
		{

			localFighter.walk("right");
		}
		if(keyWentDown('d')){
			if(!galloping.isPlaying() && !footsteps.isPlaying()){
			if(globalType == "Calvary"){
					galloping.loop();
				}
			else{
				footsteps.loop();
			}
			}
		}


		if(mouseDown(LEFT) && time < 120 && !swordSound.isPlaying()){
			swordSound.loop();
		}



		if(keyDown(16))
		{
			localFighter.activateSpecial();
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
			if(keyWentDown('o'))1
			{
				socket.emit('addObstacle', camera.mouseX, camera.mouseY);
				console.log("Added Obstacle");
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

		if(keyWentDown('m'))
		{
			miniMap.createDots(enemyGroup);
		}




		if(enemyGroup.overlap(obstacleGroup))
		{
			localFighter.speed = localFighter.maxSpeed - 1.213;
		}
		else
		{
			localFighter.speed = localFighter.maxSpeed;
		}


		if(keyDown('m'))
		{

			miniMap.sprite.visible = true;
			miniMap.sprite.depth = 1500;
			miniMap.update();
			miniMap.show();
			miniMap.move(camera.position.x - (width/2),  camera.position.y - (height/2));

			deleteHud();
			hudNeedReset = true;

		}
		else {
			if(hudNeedReset){
				createHud();
				hudNeedReset = false;

			}
			miniMap.sprite.visible = false;
			miniMap.delete();
			camera.zoom = 1;
			drawHud();
		}

		for (var i=0; i<chestArr.length; i++)
		{
			if (localFighter.sprite.sword.overlap(chestArr[i].sprite) && !(chestArr[i].isOpen))
			{
				text(chestArr[i].unlockCode[0], localFighter.sprite.position.x, localFighter.sprite.position.y+10);
				text(chestArr[i].unlockCode[1], localFighter.sprite.position.x + 20, localFighter.sprite.position.y+10);
				text(chestArr[i].unlockCode[2], localFighter.sprite.position.x + 40, localFighter.sprite.position.y+10);

			}
		}

		if(keyWentDown('p'))
		{
			partyScreen.draw();
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
	}

	if(false == true){//time == 0){
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

/* Creates all the socket connection functions that will be used throughout the code */
function initSocketFunctions()
{
	socket.on('initChests', function(chestArr)
	{

	});

	socket.on('initObstacles', function(obstacleArr)
	{
		console.log("new thingy!");
		var tempObstacle;
		for(var i = 0; i < obstacleArr.length; i++)
		{
			tempObstacle = new Obstacle(obstacleArr[i].x, obstacleArr[i].y, obstacleArr[i].scale)
			console.log(tempObstacle);
			obstacleGroup.push(tempObstacle.sprite);
		}
	});

}