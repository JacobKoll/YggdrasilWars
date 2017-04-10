/**
 * This is for drawing the screens before the player is placed into the game.
 */
var clickedButtonImage;
var defaultButtonImage;

var testButton;

function preload()
{
	defaultButtonImage = loadImage("assets/screens/testbuttondefault.png");
	clickedButtonImage = loadImage("assets/screens/testbuttonclicked.png");
}

function setup()
{
	createCanvas(900, 720);
	testButton = new Button(width/2, height/2, "Test Button!", 22, defaultButtonImage, clickedButtonImage, function(){
		console.log("Wow! The button works!");
	});

}

function draw()
{
	background("darkgreen");

	testButton.draw();
}

