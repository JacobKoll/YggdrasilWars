/**
 * This is for drawing the screens before the player is placed into the game.
 */
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

 var footsteps;
 var swordSound;

 var cursorSprite;

 var forest;

var openChest;
var closedChest;

 var landscapeSprite;

 var customCursor;
 var spawnerImage;
 var landscape;

 var emptyInventoryImage;
 var basicSwordImage;

 var bronzeSwordImage;
 var silverSwordImage;
 var goldSwordImage;


var clickedButtonImage;
var defaultButtonImage;
var mainMenuImage;

var initializedGame;

var startGame;

var titleScreenImage;

var testButton;

var prepScreen;

var titleScreenFinished = false;
var prepScreenInit = false;

var characterImages = [];
var characterNames  = [];

var backgroundImage;
var foregroundImage;


function preload()
{
	defaultButtonImage = loadImage("assets/screens/testbuttondefault.png");
	clickedButtonImage = loadImage("assets/screens/testbuttonclicked.png");

	titleScreenImage = loadImage("assets/screens/titleImage.png");

	mainMenuImage = loadImage("assets/screens/mainmenu.png");


	backgroundImage = loadImage("assets/screens/prep_background.png");
	foregroundImage = loadImage("assets/screens/prep_foreground.png");

	characterImages.push(loadImage("assets/screens/class_images/barb_portrait.png"));
	characterNames.push("Barbarian");

	characterImages.push(loadImage("assets/screens/class_images/calvary_portrait.png"));
	characterNames.push("Calvary");

	characterImages.push(loadImage("assets/screens/class_images/knight_portrait.png"));
	characterNames.push("Knight");

	characterImages.push(loadImage("assets/screens/class_images/rogue_portrait.png"));
	characterNames.push("Rogue");

	characterImages.push(loadImage("assets/screens/class_images/merc_portrait.png"));
	characterNames.push("Mercenary");

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

function setup()
{
	createCanvas(1000, 725);

	frameRate(60);

	startGame = false;

}

function draw()
{
	var chosenClass;

	background("#343832");

	if(!startGame)
	{
		if(titleScreenFinished)
		{
			if(!prepScreenInit)
			{
				initPrepScreen();
				prepScreenInit = true;
			}
			switch(drawMainMenu())
			{
				case 1: // Go to preparation screen

					if(chosenClass = drawPrepScreen())
					{
						allSprites.removeSprites();

						setupGame();
						startGame = true;

						becomePlayer(chosenClass);
					}
					break;
				case 2: //Enter game as spectator
					becomeSpectator();
					allSprites.removeSprites();

					setupGame();
					startGame = true;
					break;
				case 3: //Enter game as mod (if login works)
					becomeMod();

					allSprites.removeSprites();

					setupGame();
					startGame = true;

					break;
				case 4: //Go to the options page (Just changes css)
					break;

			}


		}
		else
		{
			image(titleScreenImage, 0, 0);

			if(keyWentDown(13))
			{
				console.log("Moving past the title screen");
				titleScreenFinished = true;
				initMainMenu();
				
			}
		}
	}
	else
	{
		drawGame();
	}
}


