/**
 * @author Andrew Messerly
 */


var health;
var stamina;
var score; 
var hud; 

/**
 * Initializes the HUD elements that are necessary for the game, like health, stamina and score. 
 * @return (NONE)
 */
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

/**
 * Moves the hud in a direction at a specified speed. This would be useful for some polish. 
 * @param  {[int]} x : Determines which way to move the hud.
 * @return (NONE)
 */
function moveHud(x){
  fullBar.maxSpeed = 1;
  emptyBar.maxSpeed = 1; 
//move left
  if(x == 1){
    fullBar.velocity.x = -5;
    emptyBar.velocity.x = -5;
  }
  //move right
  else if(x == 2){
    fullBar.velocity.x = 5;
    emptyBar.velocity.x = 5;

  }
  //move up
  else if(x == 3){
        fullBar.velocity.y = -5;
    emptyBar.velocity.y = -5;

  }
  //move down
  else if(x == 4){
    fullBar.velocity.x = 5;
    emptyBar.velocity.x = 5; 

  }
else{

return;
}

}

/**
 * This function will be called in the draw method so the health bar will relate itself to the PC. 
 * @param  {[int]} xPos [The x position the health bar will be located at.]
 * @param  {[int]} yPos [The y position the health bar will be located at.]
 * @return (NONE)
 */
function changeFullPosition(xPos, yPos){

  fullBar.position.x = xPos;
  
  fullBar.position.y = yPos;

}

/**
 * This function will be called in the draw method so the empty bar will relate itself to the PC. 
 * @param {int} [xPos] [The x position the empty bar will be located at.]
 * @param {Int} [yPos] [The y position the empty bar will be located at.]
 */

function changeEmptyPosition(xPos, yPos){

  emptyBar.position.x = xPos;
  emptyBar.position.y = yPos;
}

/**
 * This function would be called in the draw method so the stamina bar will relate itself to the PC. 
 * @param {int} [xPos] [The x position the stamina bar will be located at.]
 * @param {int} [yPos] [The y postiion the stamina bar will be located at.]
 */

function changeStaminaPosition(xPos,yPos){


  staminaBar.position.x = xPos;
  staminaBar.position.y = yPos;
}

/**
 * The function will be called several times when the player takes damage. 
 * @param {Int} [newWidth] [reduce the width of the health bar to this number.]
 */

function reduceFullWidth(newWidth){

  fullBar.width -= newWidth;
  if(fullBar.width <= 0){
    fullBar.width = 0;

  }

}

/**
 * Return the health bar to its original self.
 */

function restoreFullWidth(){

  fullBar.width = 100;
}
