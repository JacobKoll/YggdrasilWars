var items;


function createHud(){

  items = new Group();

  emptyBar = createSprite(0,100,100,40);
  staminaBar = createSprite(0,200,100,40);
  fullBar = createSprite(0,10,100,40);
  // itemBar = createSprite(0, 0, 90, 90);
	// itemBar.shapeColor = color("white");
  fullBar.shapeColor = color("red");
  emptyBar.shapeColor = color(0,0,0);
  staminaBar.shapeColor = color("blue");

  for(i = 0; i < 4; i++){
    var item  = createSprite(0,0,90,90);
    item.shapeColor = color("white");
    items.add(item);
  }



}

function drawHud(){



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
