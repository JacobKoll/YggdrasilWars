var leftPosX ;
var rightPosX;

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

var selectedCharacter;

function initPrepScreen()
{
	selectedCharacter = null

	leftPosX = (width/2) - 300;
	rightPosX = (width/2) + 300;

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
		currentSprite.addImage(characterNames[i], characterImages[i]);
		leftSprite.addImage(characterNames[i], characterImages[i]);
		rightSprite.addImage(characterNames[i], characterImages[i]);
	}

	changeLeft();
}

function changeRight()
{	
	if(left == 0)
	{
		left = characterImages.length - 1;
		current = 0;
		right = 1;
	}
	else if(current == 0)
	{
		left = characterImages.length - 2;
		current = characterImages.length - 1;
		right = 0;
	}
	else if(right == 0)
	{
		left = characterImages.length - 3;
		current = characterImages.length - 2;
		right = characterImages.length - 1;
	}
	else
	{
		left--;
		current--;
		right--;
	}
	

	currentSprite.changeImage(characterNames[current]);
	leftSprite.changeImage(characterNames[left]);
	rightSprite.changeImage(characterNames[right]);

}

function changeLeft()
{
	if(right == characterImages.length - 1)
	{
		left = characterImages.length - 2;
		current = characterImages.length - 1;
		right = 0;
	}
	else if(current == characterImages.length - 1)
	{
		left = characterImages.length - 1;
		current = 0;
		right = 1;
	}
	else if(left == characterImages.length - 1)
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

	currentSprite.changeImage(characterNames[current]);
	leftSprite.changeImage(characterNames[left]);
	rightSprite.changeImage(characterNames[right]);
}

function select()
{
	console.log(currentSprite.getAnimationLabel());
	selectedCharacter =  currentSprite.getAnimationLabel();
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
	text(characterNames[current], (width/2), 420);

	textSize(72);
	strokeWeight(4);
	stroke("Black");
	fill("Yellow");
	text("Choose Your Character!", width / 2, 100);

	if(selectedCharacter)
	{
		console.log("A character has been selected. Now moving from the prep screen into the game.");
		return selectedCharacter;
	}
}
