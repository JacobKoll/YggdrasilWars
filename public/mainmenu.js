// Choices:
// 1. Enter game as player
// 2. Enter game as mod
// 3. Enter game as spectator
// 4. Options
// 6. Login?

// var menuImage;

var startPlayerButton;
var startModButton;
var startSpectatorButton;

var menuChoice = 0;


function initMainMenu()
{
	// menuImage = backgroundImage;

	startPlayerButton = new Button(width/2, 200, "Join Game", 22, defaultButtonImage, clickedButtonImage, function(){menuChoice = 1;});
	startSpectatorButton = new Button(width/2, 300, "Spectate Game", 10, defaultButtonImage, clickedButtonImage, function(){menuChoice = 2;});
	startModButton = new Button(width/2, 400, "Become Mod", 22, defaultButtonImage, clickedButtonImage, function(){menuChoice = 3;});
}

function drawMainMenu()
{
	image(mainMenuImage, 0 ,0);

	startPlayerButton.draw();
	startModButton.draw();
	startSpectatorButton.draw();

	if(menuChoice > 0)
	{
		return menuChoice
	}

}
