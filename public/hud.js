var items;


function createHud(){

  items = new Group();

  emptyBar = createSprite(0,100,100,40);
  staminaBar = createSprite(0,200,100,40);
  fullBar = createSprite(0,10,100,40);
 
  fullBar.shapeColor = color("red");
  emptyBar.shapeColor = color(0,0,0);
  staminaBar.shapeColor = color("blue");	

  for(i = 0; i < 4; i++){
    var item  = createSprite(0,0,90,90);
    item.shapeColor = color("white");
    items.add(item);
  }

}	




function changeHealthPosition(xPos, yPos){

  fullBar.position.x = xPos;
  fullBar.position.y = yPos;
  emptyBar.position.x = xPos;
  emptyBar.position.y = yPos;

}

function changeStaminaPosition(xPos,yPos){

  staminaBar.position.x = xPos;
  staminaBar.position.y = yPos;

}

function changeItemPosition(xPos,yPos){
  var xPosShift = xPos;
  for(i = 0; i < 4; i++){
    items[i].position.x = xPosShift;
    items[i].position.y = yPos;
    xPosShift += 100;
  }
}

function reduceHealthWidth(newWidth){

  fullBar.width -= newWidth;
  if(fullBar.width <= 0){
    fullBar.width = 0;

  }

}

function drawHud(){
  
  changeItemPosition(camera.position.x-150, camera.position.y+310);
  changeHealthPosition(camera.position.x-440, camera.position.y-335);
  changeStaminaPosition(camera.position.x-300, camera.position.y-335);

  text("Your current score" + score, camera.position.x+350, camera.position.y-340);

}
