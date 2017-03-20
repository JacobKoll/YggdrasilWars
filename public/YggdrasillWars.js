var enemyWalkAnimation;
var enemyAttackAnimation;
var enemyIdleAnimation;
var fighterWalkAnimation;
var fighterSwingAnimation;
var fighterDeathAnimation;
var fighterIdleAnimation;
var customCursor;
var spawnerImage;

var interval;
var localFighter;

var chestArr = [];
var openChest;
var closedChest;

var obstaclesArr = [];
var bush;

var fighterGroup; // Fighter sprites group
var enemyGroup; // Enemy sprites group
var swordGroup;
var obstacleGroup;
var chestGroup;
var spawnerGroup;

var enemyArray = [];
var fighterArray = [];

var cursorSprite;
var SCENE_H = 1450;
var SCENE_W = 2000;

var score = 10; 



//var socket;asdsd
var SCENE_H = 1450;
var SCENE_W = 2000;



/* TODO: delete this after testing. */
var testSpawner;

/* This is how we will create custom enemy and fighter types. */
var testEnemyType;

function preload()
{
	enemyWalkAnimation = loadAnimation("assets/enemy/walk/enemyWalking00.png", "assets/enemy/walk/enemyWalking09.png");
	enemyAttackAnimation = loadAnimation("assets/enemy/attack/enemyAttack0.png", "assets/enemy/attack/enemyAttack3.png");
	enemyIdleAnimation = loadAnimation("assets/enemy/enemyIdle.png");

	fighterWalkAnimation = loadAnimation("assets/fighter/walk/walk00.png","assets/fighter/walk/walk09.png");
	fighterSwingAnimation = loadAnimation("assets/fighter/swing/swing0.png","assets/fighter/swing/swing6.png");
	fighterDeathAnimation = loadAnimation("assets/fighter/death/death00.png","assets/fighter/death/death18.png");
	fighterIdleAnimation = loadAnimation("assets/fighter/fighter_idle.png");

	customCursor = loadImage("assets/fighter/cursor.png");
	spawnerImage = loadImage("assets/spawner.png");

	openChest = loadImage("assets/fighter/chest_open.png");
	closedChest = loadImage("assets/fighter/chest_closed.png");

	bush = loadImage("assets/fighter/bush.png");
}

function setup()
{

	createCanvas(1000, 725);

	/* Connect to the server */
	socket = io.connect('http://localhost:3000');

	fighterGroup = new Group();
	enemyGroup = new Group();
	swordGroup = new Group();
	obstacleGroup = new Group();
	chestGroup = new Group();
	spawnerGroup = new Group();

	localFighter = new Fighter(100, width / 2, height /2, fighterWalkAnimation, fighterSwingAnimation, fighterDeathAnimation, fighterIdleAnimation);
		
	console.log(localFighter);

	fighterArray.push(localFighter);

	createHud();


	/* Create the custom cursor and initialize its position to the middle of the canvas */
	cursorSprite = createSprite(width/2, height/2);
	cursorSprite.addImage(customCursor);

	noCursor(); // Hides the system's cursor when inside the canvas

	testEnemyType = {
		walkAnimation: enemyWalkAnimation,
		idleAnimation: enemyIdleAnimation,
		attackAnimation: enemyAttackAnimation,
<<<<<<< HEAD
		damage: .7,
=======
		damage: .1,
>>>>>>> 5474446dac499ed980e829b02bb56df0a6f509be
		speed: 10,
		detectionRadius: 250
	};

	testSpawner = new EnemySpawner(300, 450, testEnemyType, .5, 5, spawnerImage);

	socket.on('generateObstacles', function(data) {
		for (var i=0; i<data.length; i++) {
			var obstacle = new Obstacle(data[i].x, data[i].y, 40, 40, bush);
			obstacle.sprite.setCollider('circle',0,0,bush.width/3);
			obstaclesArr.push(obstacle);
			bg.add(obstacle.sprite);
		}
	});

	socket.on('generateChests', function(chestData) {
		for (i=0; i<chestData.length; i++) {
			var chest = new Chest(chestData[i].x, chestData[i].y, openChest, closedChest);
			chestArr.push(chest);
			bg.add(chest.sprite);
		}
	});

}

function mouseReleased(){

			interval = setInterval(function(){
				if(staminaBar.width>100){staminaBar.width = 100;}staminaBar.width += 10;},2000);

}

function draw()
{

	var hudPosX = localFighter.sprite.position.x-450;
	var hudPosY = localFighter.sprite.position.y-340;

	var scorePosX = localFighter.sprite.position.x+450;
	var scorePosY = localFighter.sprite.position.y-340;

	var staminaPosX = localFighter.sprite.position.x-300;
	var staminaPosY = localFighter.sprite.position.y-340;

	background(105, 200, 54); 

	background(105, 200, 54);

	drawHud();

	cursorSprite.position.x = mouseX;
	cursorSprite.position.y = mouseY;



	changeFullPosition(hudPosX, hudPosY);
	changeEmptyPosition(hudPosX, hudPosY);
	changeStaminaPosition(staminaPosX,staminaPosY);

	text("Your current score" + score, scorePosX - 100, scorePosY);

	for (var i = 0; i<obstaclesArr.length; i++) {
		obstaclesArr[i].update;
	}
	for (var i = 0; i<chestArr.length; i++) {
		chestArr[i].update;
	}

	cursorSprite.position.x = camera.mouseX;
	cursorSprite.position.y = camera.mouseY;

	camera.position.x = localFighter.sprite.position.x;
	camera.position.y = localFighter.sprite.position.y;

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
	/* Invisible border around map */
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

	if(mouseDown())
	{

		localFighter.sprite.sword.visible = true;


		clearInterval(interval);
		localFighter.sword.visible = true;
		staminaBar.width -= 1;
		if(staminaBar.width < 0){
			staminaBar.width = 0;
			localFighter.sword.visible = false;
		}

		score += 1;

	}
	else
	{
		localFighter.sprite.sword.visible = true;
	}
	

	localFighter.update();

	localFighter.sprite.sword.collide()

	testSpawner.spawn();
	testSpawner.updateAll(fighterArray);

	
	drawSprites();
	drawSprite(cursorSprite);
	
}
