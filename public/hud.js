var health;
var stamina;
var score; 
var hud; 


function createHud(){
	// health = document.createElement("PROGRESS");
 //    health.setAttribute("value", "100");
 //    health.setAttribute("max", "100");

 //    health.style.left = 0;
 //    health.style.up = 0; 
 //    health.style.position = "fixed";

 //    stamina = document.createElement("CODE");
  
 //  	stamina.style.left = 0;
 //  	stamina.style.up = 0; 
    
 //    stamina.style.position = "fixed";

 //    document.body.appendChild(health);
 //    document.body.appendChild(stamina);

  emptyBar = createSprite(0,100,100,40);
  staminaBar = createSprite(0,200,100,40);
  fullBar = createSprite(0,10,100,40);  

  fullBar.shapeColor = color("red");
  emptyBar.shapeColor = color(0,0,0);
  staminaBar.shapeColor = color("blue");

}	




function changeFullPosition(xPos, yPos){

  fullBar.position.x = xPos;
  
  fullBar.position.y = yPos;

}

function changeEmptyPosition(xPos, yPos){

  emptyBar.position.x = xPos;
  emptyBar.position.y = yPos;
}

function changeStaminaPosition(xPos,yPos){


  staminaBar.position.x = xPos;
  staminaBar.position.y = yPos;
}

function reduceFullWidth(newWidth){

  fullBar.width -= newWidth;
  if(fullBar.width <= 0){
    fullBar.width = 0;

  }

}





function drawHud(){
  
  var hudPosX = camera.position.x-450;
  var hudPosY = camera.position.y-340;

  var scorePosX = camera.position.x+450;
  var scorePosY = camera.position.y-340;

  var staminaPosX = camera.position.x-300;
  var staminaPosY = camera.position.y-340;

  changeFullPosition(hudPosX, hudPosY);
  changeEmptyPosition(hudPosX, hudPosY);
  changeStaminaPosition(staminaPosX,staminaPosY);
  
  text("Your current score" + score, scorePosX - 100, scorePosY);


}
//NOTE: CHECK IF SOLDIER IS AT THE BORDER. IF HE IS, SET IT TO SOMETHING.