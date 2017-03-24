
var itemsBar;

function createHud(){


  emptyHealthBar = createSprite(10,100,135,23);
  emptyHealthBar.depth = 1500;
  fullHealthBar = createSprite(10,10,135,23);
  fullHealthBar.depth = 1501;
  emptyStaminaBar = createSprite(10,200,135,23);
  emptyStaminaBar.depth = 1502;
  fullStaminaBar = createSprite(10,200,135,23);
  fullStaminaBar.depth = 1503;

  fullHealthBar.shapeColor = color("red");
  emptyHealthBar.shapeColor = color("black");
  fullStaminaBar.shapeColor = color("blue");
  emptyStaminaBar.shapeColor = color("black");

  var itemDepth = 1504;
  itemsBar = new Group();
  var item  = createSprite(0,0,90,90);
  item.addImage(basicSwordImage);
  item.depth = itemDepth;
  itemsBar.add(item);
  itemDepth++;

  for(i = 0; i < 3; i++){
    var item  = createSprite(0,0,90,90);
    item.addImage(emptyInventoryImage);
    item.depth = itemDepth;
    itemsBar.add(item);
    itemDepth++;

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
    itemsBar[i].position.x = xPosShift;
    itemsBar[i].position.y = yPos;
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

  fullStaminaBar.width -= .5;
  if(fullStaminaBar.width < 0){
    fullStaminaBar.width = 0;
    localFighter.sprite.sword.visible = false;
  }

}

function restoreHealthWidth(){

  fullHealthBar.width += .2;
  localFighter.sprite.health += .2;
  if(fullHealthBar.width >= 135)
  {
    fullHealthBar.width = 135;
    localFighter.sprite.health = localFighter.sprite.maxHealth;
  }

}

function restoreStaminaWidth(){

  fullStaminaBar.width += .5;
  if(fullStaminaBar.width > 135){
    fullStaminaBar.width = 135;

  }

}

function drawHud()
{
  stroke('black');
  textSize(32);
  fill('white');
  textFont('Georgia');

  changeItemPosition(camera.position.x-150, camera.position.y+310);
  changeHealthPosition(camera.position.x-420, camera.position.y-335);
  changeStaminaPosition(camera.position.x-270, camera.position.y-335);
  text("Score: " + score, camera.position.x+343, camera.position.y-330);
}
