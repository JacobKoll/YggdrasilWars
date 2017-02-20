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

  drawSprite(spaceboy);
  animation(flail_animation, 0, 0);
}

function SpaceBoy()
{

}