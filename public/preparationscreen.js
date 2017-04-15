var imageArray;
var nameArray;

var leftPosX ;
var rightPosX;

var current;
var left;
var right;

var hasSelected;

var currentSprite;
var leftSprite;
var rightSprite;

var backgroundImage;
var foregroundImage;

var selectButton;
var leftButton;
var rightButton;

function initPrepScreen(characterImageArray, characterNameArray)
{

	backgroundImage = loadImage("assets/screens/prep_background.png");
	foregroundImage = loadImage("assets/screens/prep_foreground.png");

	leftPosX = (width/2) - 300;
	rightPosX = (width/2) + 300;

	imageArray = characterImageArray;
	nameArray = characterNameArray;
	current = 2; // current index of the character image array being selected
	left =  1;
	right = 3;

	hasSelected = false;

	currentSprite = createSprite(width/2, 545);
	leftSprite = createSprite(leftPosX - 30, 490);
	rightSprite = createSprite(rightPosX + 30, 490);

	selectButton = new Button(width/2, 257, "Select", 22, defaultButtonImage, clickedButtonImage, select);
	leftButton = new Button(leftPosX + 137, 257, "<<<<<<<", 22, defaultButtonImage, clickedButtonImage, changeLeft);
	rightButton = new Button(rightPosX - 137, 257, ">>>>>>>", 22, defaultButtonImage, clickedButtonImage, changeRight);

	for (var i = 0; i < characterImages.length; i++)
	{
		currentSprite.addImage(characterNameArray[i], characterImageArray[i]);
		leftSprite.addImage(characterNameArray[i], characterImageArray[i]);
		rightSprite.addImage(characterNameArray[i], characterImageArray[i]);
	}

	changeLeft();
}

function changeRight()
{	
	if(left == 0)
	{
		left = imageArray.length - 1;
		current = 0;
		right = 1;
	}
	else if(current == 0)
	{
		left = imageArray.length - 2;
		current = imageArray.length - 1;
		right = 0;
	}
	else if(right == 0)
	{
		left = imageArray.length - 3;
		current = imageArray.length - 2;
		right = imageArray.length - 1;
	}
	else
	{
		left--;
		current--;
		right--;
	}
	

	currentSprite.changeImage(nameArray[current]);
	leftSprite.changeImage(nameArray[left]);
	rightSprite.changeImage(nameArray[right]);

}

function changeLeft()
{
	if(right == imageArray.length - 1)
	{
		left = imageArray.length - 2;
		current = imageArray.length - 1;
		right = 0;
	}
	else if(current == imageArray.length - 1)
	{
		left = imageArray.length - 1;
		current = 0;
		right = 1;
	}
	else if(left == imageArray.length - 1)
	{
		left = 0;
		current = 1;
		right = 2;
	}
	else
	{
		left++;
		current++;
		right++;
	}

	currentSprite.changeImage(nameArray[current]);
	leftSprite.changeImage(nameArray[left]);
	rightSprite.changeImage(nameArray[right]);
}

function select()
{
	console.log(currentSprite.getAnimationLabel());
}

function drawPrepScreen()
{
	image(backgroundImage,0,0);

	drawSprite(currentSprite);
	drawSprite(leftSprite);
	drawSprite(rightSprite);

	image(foregroundImage,0,0);

	selectButton.draw();
	leftButton.draw();
	rightButton.draw();

	fill("white");
	stroke("black");
	textSize(36);
	strokeWeight(2);
	text(nameArray[current], (width/2), 420);

	textSize(72);
	strokeWeight(4);
	stroke("Black");
	fill("Yellow");
	text("Choose Your Character!", width / 2, 100);
}
