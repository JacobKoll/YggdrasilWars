/**
 * This is for drawing the screens before the player is placed into the game.
 */
var clickedButtonImage;
var defaultButtonImage;

var testButton;

var prepScreen;

var characterImages = [];
var characterNames  = [];

function preload()
{
	defaultButtonImage = loadImage("assets/screens/testbuttondefault.png");
	clickedButtonImage = loadImage("assets/screens/testbuttonclicked.png");

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

	drawPrepScreen();

	if(keyWentDown('e'))
	{
		console.log(characterImages[0]);
	}
}

