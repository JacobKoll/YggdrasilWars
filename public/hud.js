
var itemsBar;

var itemSelectedSprite;
var itemSelectedSpriteX = -150;

function createHud(){


  emptyHealthBar = createSprite(10,100,135,23);
  emptyHealthBar.depth = 1500;
  fullHealthBar = createSprite(10,10,135,23);
  fullHealthBar.depth = 1501;
  emptyStaminaBar = createSprite(10,200,localFighter.sprite.maxStamina,23);
  emptyStaminaBar.depth = 1502;
  fullStaminaBar = createSprite(10,200,localFighter.sprite.maxStamina,23);
  fullStaminaBar.depth = 1503;

  fullHealthBar.shapeColor = color("red");
  emptyHealthBar.shapeColor = color("black");
  fullStaminaBar.shapeColor = color("blue");
  emptyStaminaBar.shapeColor = color("black");

  var itemDepth = 1504;
  itemsBar = new Group();

  for(i = 0; i < 4; i++){
    var itemSprite  = createSprite(0,0,90,90);
    itemSprite.addImage(localFighter.inventory[i].img);
    itemSprite.name = localFighter.inventory[i].name;
    itemSprite.depth = itemDepth;
    itemsBar.add(itemSprite);
    itemDepth++;
  }

  itemSelectedSprite = createSprite(0,0,100,100);
  itemSelectedSprite.depth = 1503;
  itemSelectedSprite.shapeColor = color("cyan");

}

function changeItemSelectedPosition(xPos, yPos){


  itemSelectedSprite.position.x = xPos;
  itemSelectedSprite.position.y = yPos;
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


  fullStaminaBar.width -= localFighter.sprite.staminaRate;

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
  if(fullStaminaBar.width > localFighter.sprite.maxStamina){
    fullStaminaBar.width = localFighter.sprite.maxStamina;

  }

}

function drawHud()
{
  stroke('black');
  textSize(32);
  fill('white');
  textFont('Georgia');

  changeItemSelectedPosition(camera.position.x+itemSelectedSpriteX, camera.position.y+310);

  changeItemPosition(camera.position.x-150, camera.position.y+310);
  changeHealthPosition(camera.position.x-420, camera.position.y-335);
  changeStaminaPosition((camera.position.x- (localFighter.sprite.maxHealth)) + (localFighter.sprite.maxStamina/4), camera.position.y-335);
  text("Score: " + score, camera.position.x+343, camera.position.y-330);
}
