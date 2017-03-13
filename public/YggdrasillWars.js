var enemyWalkAnimation;
var enemyAttackAnimation;
var enemyIdleAnimation;
var fighterWalkAnimation;
var fighterSwingAnimation;
var fighterDeathAnimation;
var fighterIdleAnimation;
var customCursor;

var localFighter;

var fighterGroup; // Fighter sprites group
var enemySpriteGroup; // Enemy sprites group
var swordGroup;

var enemyArray = [];

var cursorSprite;


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
}

function setup()
{
	createCanvas(2000, 1450);

	fighterGroup = new Group();
	enemySpriteGroup = new Group();
	swordGroup = new Group();

	var tempEnemy;

	/* Create 10 enemies with random position, speed, damage, and detection radius. The health is a constant 100 */
	for (var i = 0; i < 10; i++) 
	{	
		tempEnemy = new Enemy(100, random(0, width), random(0, height), random(1.8, 2.3), random(.5, 2.5), random(240, 365));
		tempEnemy.assignAnimations(enemyIdleAnimation, enemyWalkAnimation, enemyAttackAnimation);
		enemyArray.push(tempEnemy);
		enemySpriteGroup.push(tempEnemy.sprite);
	}

	localFighter = new Fighter(100, width/2, height/2, fighterWalkAnimation, fighterSwingAnimation, fighterDeathAnimation, fighterIdleAnimation);

	swordGroup.push(localFighter.sword);

	/* Create the custom cursor and initialize its position to the middle of the canvas */
	cursorSprite = createSprite(width/2, height/2);
	cursorSprite.addImage(customCursor);



	noCursor(); // Hides the system's cursor when inside the canvas

}

function draw() 
{
	background(105, 200, 54); 
	

	cursorSprite.position.x = mouseX;
	cursorSprite.position.y = mouseY;


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

	for(var i = 0; i < enemyArray.length; i++)
	{
		enemyArray[i].update();
	}

	// drawSprite(fighterGroup.get(0));
	drawSprites(enemySpriteGroup);

	localFighter.draw();
	drawSprite(cursorSprite);

}