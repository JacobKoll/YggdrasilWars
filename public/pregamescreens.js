/**
 * This is for drawing the screens before the player is placed into the game.
 */
var clickedButtonImage;
var defaultButtonImage;

var testButton;

var prepScreen;

var characterImages = [];

function preload()
{
	defaultButtonImage = loadImage("assets/screens/testbuttondefault.png");
	clickedButtonImage = loadImage("assets/screens/testbuttonclicked.png");
}

function setup()
{
	createCanvas(900, 720);

	initPrepScreen(characterImages);
}

function draw()
{
	background("darkgreen");

	prepScreen.draw();
}

