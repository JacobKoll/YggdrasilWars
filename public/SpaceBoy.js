var spaceboy;
var spaceboys = [];
var spritesheet;
var flail_animation;

var explode_sprite_sheet;
var explode_sprite;

var socket;

// Load the images and animations before the game starts.
function preload()
{
  flail_animation = loadAnimation('assets/spaceboy0000.png', 'assets/spaceboy0008.png');

}

function setup()
{
  createCanvas(500, 500);
  socket = io.connect('http://localhost:3000');

  spaceboy = createSprite(200, 165, 64, 64);
  spaceboy.addAnimation('flail', flail_animation);
  spaceboy.friction =.95;
  spaceboy.maxSpeed = 6;

//  socket.emit('start', data);
//  socket.on('heartbeat', function(data) {
//    spaceboys = data;
//  });
  console.log(getSprites());


}

function draw()
{ 
  clear();
  background(51);

  /* Controls go below */
  if(keyDown("d"))
  {
    spaceboy.rotation += 2.7;
  }
  if(keyDown("a"))
  {
    spaceboy.rotation -= 2.7;
  }
  if(keyDown("w"))
  {
    spaceboy.addSpeed(.2, spaceboy.rotation);
  }

  if(spaceboy.position.x > width + 20)
  {
    spaceboy.position.x = -20;
  }
  if(spaceboy.position.x < -20)
  {
    spaceboy.position.x = width + 20;
  }
  if(spaceboy.position.y > height + 20)
  {
    spaceboy.position.y = -20;
  }
  if(spaceboy.position.y < -20)
  {
    spaceboy.position.y = height + 20;
  }

  document.getElementById("x").innerHTML = Number(Math.round(spaceboy.position.x + 'e1')+'e-1');
  document.getElementById("y").innerHTML = Number(Math.round(spaceboy.position.y + 'e1')+'e-1');

  drawSprites();
}