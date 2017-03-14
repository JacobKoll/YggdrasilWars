var enemyWalkAnimation;
var enemyAttackAnimation;
var enemyIdleAnimation;
var fighterWalkAnimation;
var fighterSwingAnimation;
var fighterDeathAnimation;
var fighterIdleAnimation;
var customCursor;
var spawnerImage;

var localFighter;

var fighterGroup; // Fighter sprites group
var enemyGroup; // Enemy sprites group
var swordGroup;
var obstacleGroup;
var chestGroup;
var spawnerGroup;

var enemyArray = [];

var cursorSprite;

//var socket;asdsd 

/* TODO: delete this after testing. */
var testSpawner;

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
}

function setup()
{
	createCanvas(2000, 1450);
	
	/* Connect to the server */
	socket = io.connect('localhost:3000');

	fighterGroup = new Group();
	enemyGroup = new Group();
	swordGroup = new Group();
	obstacleGroup = new Group();
	chestGroup = new Group();
	spawnerGroup = new Group();

	localFighter = new Fighter(100, width / 2, height /2, fighterWalkAnimation, fighterSwingAnimation, fighterDeathAnimation, fighterIdleAnimation);
	fighterGroup.push(localFighter.sprite);

	createHud();

	/* Create the custom cursor and initialize its position to the middle of the canvas */
	cursorSprite = createSprite(width/2, height/2);
	cursorSprite.addImage(customCursor);

	noCursor(); // Hides the system's cursor when inside the canvas

	
	/* This is how we will create custom enemy and fighter types. */
	var testEnemyType = {
		walkAnimation: enemyWalkAnimation,
		idleAnimation: enemyIdleAnimation,
		attackAnimation: enemyAttackAnimation,
		damage: 10,
		speed: 10,
		detectionRadius: 250
	}

	testSpawner = new EnemySpawner(300, 450, testEnemyType, .5, 5, spawnerImage, enemyArray);


	/* SERVER SIDE */

	// socket.emit('start', localFighter);
	// socket.on('connect', function()
	// {
	// 	console.log("\nConnected to Server\nSocket ID: " + socket.id.substring(0,3));
	// })

	//  Updates the sprites for the Fighters sent by the server. 
	// socket.on('updateFighters' , function(data)
	// {
	// 	fighterGroup.removeSprites();
	// 	fighterGroup.clear();

	// 	for (var i = 0; i < data.length; i++) {
	// 		fighterGroup.add(data[i].sprite);
	// 	}

	// });

}




function draw() 
{
	background(105, 200, 54); 


	cursorSprite.position.x = mouseX;
	cursorSprite.position.y = mouseY;

	drawHud();

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
		localFighter.sword.visible = true;
	}
	else
	{
		localFighter.sword.visible = false;
	}

	localFighter.update();
	
	testSpawner.spawn();
	testSpawner.updateAll(fighterGroup);

	//drawSprites(fighterGroup);

//	localFighter.draw();
	//drawSprite(cursorSprite);
	//

	drawSprites();
}