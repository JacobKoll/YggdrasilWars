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

function drawHud(){
	
	//stamina.innerHTML = "Your health: " + health.value;


}

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

}


function stopHud(){

   fullBar.velocity.x = 0;
    emptyBar.velocity.x = 0; 
     fullBar.velocity.y = 0;
    emptyBar.velocity.y = 0; 
}
//NOTE: CHECK IF SOLDIER IS AT THE BORDER. IF HE IS, SET IT TO SOMETHING.