var leftPosX ;
var rightPosX;

var current;
var left;
var right;


var visibleInfo = false;

var hasSelected;

var currentSprite;
var leftSprite;
var rightSprite;

var selectButton;
var leftButton;
var rightButton;

var lastIndex;

var mercDescription = ["A sellsword hailing from a common village. \nHis loyalty is to gold, and his price is steep. \n Through his training, and experience in the art of warefare, \n he has equipped himself properly with medium armor and his favorite sword. \n His well balanced fighting style is valued highly and worth the price."];
var rogueDescription = ["An outcast forced out of the major city of Firnim. \n Her thievery skills have allowed her to open chests faster than most, \n though she is better at picking locks than fights,\n she uses a dagger for self defense."];
var barbDescription = ["A ruffian looking to take advantage of the war by causing lawlessness and chaos.\n This melevolent man looks to get up close and hurt with his fists.\n  He can't take many hits but his health pool is incredible and one swing hurts massively"];
var cavalryDescription = ["A mounted knight hailing from the village of Brynhildr.\n Raised in a family of farmer's his family's horses are the fastest in all the land,\n thanks to that he is faster than others, \nthough he can't hurt as much from horseback, his speed makes up for it.\n The horse's name is Bo'Jangles"];
var knightDescription = ["Through dedication to his country,\n the knight has prided himself with an almost impenetrable suit of armor. \nTo wear such a suit encourages incredible strength to move and hurt as well.\n However, all of it comes at a cost of his speed."];

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

	currentSprite = createSprite(width/2, 455);
	leftSprite = createSprite(leftPosX - 45, 440);
	rightSprite = createSprite(rightPosX + 45, 440);


	currentSprite.scale = 1.6;
	leftSprite.scale = rightSprite.scale  = 1.4;

	lastIndex  = characterImages.length - 1;

	infoButton = new Button(leftPosX, 600, "Info", 22, defaultButtonImage, clickedButtonImage, showInfo);
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
	changeLeft();
	changeLeft();
	changeLeft();
}

function changeRight()
{	
	visibleInfo = false;
	if(left == 0)
	{
		left = lastIndex;
		current = 0;
		right = 1;
	}
	else if(current == 0)
	{
		left = lastIndex - 1;
		current = lastIndex;
		right = 0;
	}
	else if(right == 0)
	{
		left = lastIndex - 2;
		current = lastIndex - 1;
		right = lastIndex;
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
	visibleInfo = false;
	if(right == lastIndex)
	{
		left = lastIndex - 1;
		current = lastIndex;
		right = 0;
	}
	else if(current == lastIndex)
	{
		left = lastIndex;
		current = 0;
		right = 1;
	}
	else if(left == lastIndex)
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
	selectedCharacter =  currentSprite.getAnimationLabel();
}

function showInfo(){
if(visibleInfo==false){
	visibleInfo = true;
}
else{
	visibleInfo = false;
}
}

function drawPrepScreen()
{
	image(backgroundImage,0,0);

	drawSprite(currentSprite);
	drawSprite(leftSprite);
	drawSprite(rightSprite);

	image(foregroundImage,0,0);

	infoButton.draw();
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

	if(visibleInfo){
	textSize(25);
	strokeWeight(2);
	fill("white");

		if(characterNames[current] == "Rogue"){

			text(rogueDescription,(width/2)-35,460);

		}else if(characterNames[current] == "Knight"){

			text(knightDescription,(width/2)-35,460);

		}else if(characterNames[current] == "Mercenary"){

			text(mercDescription,(width/2)-25,445);
		}
		else if(characterNames[current] == "Cavalry"){
			text(cavalryDescription,(width/2)-35,460);
		}
		else if(characterNames[current] == "Barbarian"){
			text(barbDescription,(width/2)-20,460);
		}
	}

	if(selectedCharacter)
	{
		console.log("A character has been selected. Now moving from the prep screen into the game.");
		return selectedCharacter;
	}
}
