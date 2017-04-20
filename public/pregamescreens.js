/**
 * This is for drawing the screens before the player is placed into the game.
 */
var clickedButtonImage;
var defaultButtonImage;
var mainMenuImage;

var initializedGame;

var startGame;

var titleScreenImage;

var testButton;

var prepScreen;

var titleScreenFinished = false;

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


}

function setup()
{
	createCanvas(1000, 725);
	preloadGameAssets();
	initPrepScreen();
	initMainMenu();

	frameRate(45);
	

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

					console.log("This hasn't been implemented yet! (Might be removed)");
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
			}
		}
	}
	else
	{
		drawGame();
	}
}

