var spaceboy;
var socket;
var spaceboys = [];

var sprite;

function setup() {
	console.log("Running");
  createCanvas(700,700);
  socket = io.connect('http://localhost:3000');
  sprite = new createSprite(50, 50, 64, 64);
  //spaceboy = new SpaceBoy();

  var data = {
    x: spaceboy.pos.x,
    y: spaceboy.pos.y,
    r: spaceboy.r,
    heading: spaceboy.heading,
    rotation: spaceboy.rotation,
    red: spaceboy.red,
    blue: spaceboy.blue
	};


  socket.emit('start', data);

  socket.on('heartbeat',
    function(data) {
      spaceboys = data;
    }
  );
}

function draw() {
  background(0);

  for(var i = 0; i < spaceboys.length; i++){
    push();
    translate(spaceboys[i].x, spaceboys[i].y);
    rotate(spaceboys[i].heading + PI/2);
    triangle(-spaceboys[i].r, spaceboys[i].r, spaceboys[i].r, spaceboys[i].r, 0, -spaceboys[i].r);
    pop();
  }

  spaceboy.render();
  spaceboy.turn();
  spaceboy.update();
  spaceboy.edges();

  spaceboySprite.draw();

  var data = {
    x: spaceboy.pos.x,
    y: spaceboy.pos.y,
    r: spaceboy.r,
    heading: spaceboy.heading,
    rotation: spaceboy.rotation
};
  socket.emit('update', data);
}

function keyReleased(){
  spaceboy.setRotation(0);
  spaceboy.boosting(false);
}

function keyPressed(){
  if(keyCode == UP_ARROW){
    spaceboy.boosting(true);
  }
  else if(keyCode == RIGHT_ARROW){
    spaceboy.setRotation(0.1);
  }
  else if(keyCode == LEFT_ARROW){
    spaceboy.setRotation(-0.1);
  }
}

function SpaceBoy() {
  this.pos = createVector(random(0,width), random(0,height));
  this.r = 20;
  this.heading = 0;
  this.rotation = 0;
  this.vel = createVector(0,0);
  this.isBoosing = false;

  this.sprite_sheet = loadSpriteSheet('assets/spaceboy.png', 64, 64, 9);
  this.default_animation = loadAnimation(this.sprite_sheet);


  this.boosting = function(b){
    this.isBoosing = b;
  }

  this.update = function(){
    if (this.isBoosing){
      this.boost();
    }
    this.pos.add(this.vel);
    this.vel.mult(0.96);

  }

  this.boost = function(){
    var force = p5.Vector.fromAngle(this.heading);
    force.mult(0.5);
    this.vel.add(force);
  }

  this.render = function(){
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.heading + PI/2);
    animation(this.default_animation, this.pos.x, this.pos.y);
    pop();
  }

  this.edges = function() {
    if (this.pos.x > width + this.r){
      this.pos.x = -this.r;
    }
    if (this.pos.x < -this.r){
      this.pos.x = width + this.r;
    }
    if (this.pos.y > height + this.r){
      this.pos.y = -this.r;
    }
    if (this.pos.y < -this.r){
      this.pos.y = height + this.r;
    }
  }

  this.setRotation = function(angle){
      this.rotation = angle;
  }

  this.turn = function(){
    this.heading += this.rotation;

  }
}
