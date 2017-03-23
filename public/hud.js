var items;


function createHud(){

  items = new Group();

  emptyHealthBar = createSprite(0,100,100,40);
  fullHealthBar = createSprite(0,10,100,40);
  emptyStaminaBar = createSprite(0,200,100,40);
  fullStaminaBar = createSprite(0,200,100,40);

  fullHealthBar.shapeColor = color("red");
  emptyHealthBar.shapeColor = color("black");
  fullStaminaBar.shapeColor = color("blue");
  emptyStaminaBar.shapeColor = color("black");

  for(i = 0; i < 4; i++){
    var item  = createSprite(0,0,90,90);
    item.shapeColor = color("black");
    items.add(item);
  }

}




function changeHealthPosition(xPos, yPos){

  fullHealthBar.position.x = xPos;
  fullHealthBar.position.y = yPos;
  emptyHealthBar.position.x = xPos;
  emptyHealthBar.position.y = yPos;

}

function changeStaminaPosition(xPos,yPos){

  fullStaminaBar.position.x = xPos;
  fullStaminaBar.position.y = yPos;
  emptyStaminaBar.position.x = xPos;
  emptyStaminaBar.position.y = yPos;

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

  fullHealthBar.width -= newWidth;
  if(fullHealthBar.width <= 0){
    fullHealthBar.width = 0;

  }

}

function reduceStaminaWidth(){

  fullStaminaBar.width -= 5;
  if(fullStaminaBar.width < 0){
    fullStaminaBar.width = 0;

  }
  score ++;

}

function drawHud(){

  changeItemPosition(camera.position.x-150, camera.position.y+310);
  changeHealthPosition(camera.position.x-440, camera.position.y-335);
  changeStaminaPosition(camera.position.x-300, camera.position.y-335);

  text("Your current score" + score, camera.position.x+350, camera.position.y-340);

}
