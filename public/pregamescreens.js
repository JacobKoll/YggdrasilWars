/**
 * This is for drawing the screens before the player is placed into the game.
 */
var clickedButtonImage;
var defaultButtonImage;

var titleScreenImage;

var testButton;

var prepScreen;

var titleScreenFinished = false;

var characterImages = [];
var characterNames  = [];

function preload()
{
	defaultButtonImage = loadImage("assets/screens/testbuttondefault.png");
	clickedButtonImage = loadImage("assets/screens/testbuttonclicked.png");

	titleScreenImage = loadImage("assets/screens/titleImage.png");

	characterImages.push(loadImage("assets/test_characters/abomination.png"));
	characterNames.push("Abomination");

	characterImages.push(loadImage("assets/test_characters/babbs.png"));
	characterNames.push("Babbs");

	characterImages.push(loadImage("assets/test_characters/squiggly.png"));
	characterNames.push("Squiggly");

	characterImages.push(loadImage("assets/test_characters/Steve.png"));
	characterNames.push("Steve");

	characterImages.push(loadImage("assets/test_characters/will.png"));
	characterNames.push("Will");
}

function setup()
{
	createCanvas(1000, 725);
	initPrepScreen(characterImages, characterNames);

}

function draw()
{
	background("#343832");

	

	if(titleScreenFinished)
	{
		console.log("Moving past the title screen");

		if(drawPrepScreen())
		{
			console.log("You will now be loaded into the game world.");
			noLoop();
		}

	}
	else
	{
		image(titleScreenImage, 0, 0);

		if(keyWentDown(13))
		{
			titleScreenFinished = true;
		}
	}

}

