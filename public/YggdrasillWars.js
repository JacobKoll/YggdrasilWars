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

var footsteps;
var swordSound;



//var socket;asdsd
var SCENE_H = 1450;
var SCENE_W = 2000;

/* TODO: delete this after testing. */
var testSpawner;

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

	customCursor = loadImage("assets/fighter/cursor.png");
	spawnerImage = loadImage("assets/spawner.png");

	openChest = loadImage("assets/fighter/chest_open.png");
	closedChest = loadImage("assets/fighter/chest_closed.png");

	bush = loadImage("assets/fighter/bush.png");

	footsteps = loadSound("assets/sounds/Marching.wav");
	swordSound = loadSound("assets/sounds/Woosh.wav");

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
		speed: 10,
		detectionRadius: 250
	};

	knight = {
		walkAnimation: knightWalkAnimation,
		idleAnimation: knightIdleAnimation,
		deathAnimation: knightDeathAnimation,
		swingAnimation: knightSwingAnimation,
		health: 100,
		speed: 5
	};

}

function setup()
{

	createCanvas(1000, 725);

	assignTypes();

	/* Connect to the server */
	socket = io.connect('http://localhost:3000');

	fighterGroup = new Group();
	enemyGroup = new Group();
	swordGroup = new Group();
	obstacleGroup = new Group();
	chestGroup = new Group();
	spawnerGroup = new Group();


	localFighter = new Fighter(width / 2, height /2, knight);


	fighterArray.push(localFighter);

	createHud();


	/* Create the custom cursor and initialize its position to the middle of the canvas */
	cursorSprite = createSprite(width/2, height/2);
	cursorSprite.addImage(customCursor);

	noCursor(); // Hides the system's cursor when inside the canvas


	testSpawner = new EnemySpawner(35, 60, goblin, .5, 5, spawnerImage);

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

function draw()
{

	background(105, 200, 54);

	background(105, 200, 54);

	drawHud();

	cursorSprite.position.x = mouseX;
	cursorSprite.position.y = mouseY;


	changeItemPosition(localFighter.sprite.position.x-150, localFighter.sprite.position.y+310);
	changeHealthPosition(localFighter.sprite.position.x-440, localFighter.sprite.position.y-335);
	changeStaminaPosition(localFighter.sprite.position.x-300, localFighter.sprite.position.y-335);

	text("Your current score" + score, localFighter.sprite.position.x+350, localFighter.sprite.position.y-340);

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

	if(mouseWentDown())
	{
		staminaBar.width -= 1;
		if(staminaBar.width < 0){
			staminaBar.width = 0;
			localFighter.sprite.sword.visible = false;
		}

		score += 1;
	}


	localFighter.update();

	localFighter.sprite.sword.collide(enemyGroup);

	testSpawner.spawn();
	testSpawner.updateAll(fighterArray);


	drawSprites();
	drawSprite(cursorSprite);

}
