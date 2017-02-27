var spaceboy;
var spaceboys = [];
var spritesheet;
var flail_animation;
var love_animation;

var explode_sprite_sheet;
var explode_sprite;

var socket;

// Load the images and animations before the game starts.
function preload()
{
  flail_animation = loadAnimation('assets/spaceboy/flail/spaceboy0000.png', 'assets/spaceboy/flail/spaceboy0008.png');
  love_animation = loadAnimation('assets/spaceboy/love/spacelove0000.png', 'assets/spaceboy/love/spacelove0008.png');
}

function setup()
{
  var canvas = createCanvas(500, 500);
  canvas.parent('canvas_pos');
  socket = io.connect('http://localhost:3000');
  spaceboy = createSprite(200, 165, 64, 64);
  spaceboy.addAnimation('flail', flail_animation);
  spaceboy.addAnimation('love', love_animation);
  spaceboy.friction =.95;
  spaceboy.maxSpeed = 6;

  // Initialize the data
  var data = {
    x: spaceboy.position.x,
    y: spaceboy.position.y,
    rotation: spaceboy.rotation
  };


  socket.emit('start', data);
  socket.on('heartbeat', function(data) {
    spaceboys = data;
  });


  console.log(spaceboys);


}

function draw()
{ 
  clear();
  background(51);

  // for(var i = 0; i < spaceboys.length; i++)
  // {
  //   push();
  //   translate(spaceboys[i].x, spaceboys[i].y)
  //   rotate(spaceboys[i].rotation);
  //   pop();
  // }

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
  if(keyDown(" "))
  {
    spaceboy.changeAnimation('love');
  }
  else
  {
    spaceboy.changeAnimation('flail');
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

  // Update the data
  var data = {
    x: spaceboy.position.x,
    y: spaceboy.position.y,
    rotation: spaceboy.rotation
  };

  socket.emit('update', data);

  document.getElementById("x").innerHTML = Number(Math.round(spaceboy.position.x + 'e1')+'e-1');
  document.getElementById("y").innerHTML = Number(Math.round(spaceboy.position.y + 'e1')+'e-1');

  drawSprites();
}