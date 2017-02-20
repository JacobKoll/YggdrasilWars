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
  spritesheet = loadSpriteSheet('assets/spaceboy.png', 64, 64, 9);
  flail_animation = loadAnimation(spritesheet);

  explode_sprite_sheet = loadSpriteSheet('assets/explode_sprite_sheet.png', 171, 158, 11);
  explode_animation = loadAnimation(explode_sprite_sheet);

}

function setup()
{
  createCanvas(500, 500);
  socket = io.connect('http://localhost:3000');

  spaceboy = createSprite(100, 100, 64, 64);
  spaceboy.addAnimation('flail', flail_animation);

  explode_sprite = createSprite(width/2, 100, 171, 158);
  explode_sprite.addAnimation('explode', explode_animation);

//  socket.emit('start', data);
//  socket.on('heartbeat', function(data) {
//    spaceboys = data;
//  });

}

function draw()
{ 
  clear();
  background(51);

  drawSprites();
}

function SpaceBoy()
{

}