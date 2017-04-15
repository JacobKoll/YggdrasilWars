var characterImages;
var current;
var left;
var right;

var hasSelected;

var currentSprite;
var leftSprite;
var rightSprite;

var selectButton;
var leftButton;
var rightButton;

function initPrepScreen(imageArray)
{
	characterImages = imageArray;
	current = 0; // current index of the character image array being selected
	left =  imageArray.length - 1;
	right = 1;

	hasSelected = false;

	currentSprite = createSprite(500, 300);
	leftSprite = createSprite(300, 300);
	rightSprite = createSprite(700, 300);

	currentSprite.debug = true;
	leftSprite.debug = true;
	rightSprite.debug = true;

	currentSprite.debug = true;
	leftSprite.debug = true;
	rightSprite.debug = true;


	selectButton = new Button(500, 500, "Select", 22, defaultButtonImage, clickedButtonImage, select);
	leftButton = new Button(300, 500, "<<<<<<<", 22, defaultButtonImage, clickedButtonImage, changeLeft);
	rightButton = new Button(700, 500, ">>>>>>>", 22, defaultButtonImage, clickedButtonImage, changeRight);

	for (var i = 0; i < characterImages.length; i++)
	{
		currentSprite.addImage(characterImages[i]);
		leftSprite.addImage(characterImages[i]);
		rightSprite.addImage(characterImages[i]);
	}
}

function changeLeft()
{

}

function changeRight()
{

}

function select()
{

}

function drawPrepScreen()
{
	selectButton.draw();
	leftButton.draw();
	rightButton.draw();
}
