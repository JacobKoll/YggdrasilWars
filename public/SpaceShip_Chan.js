var ship;
var socket;
var ships = [];
var spaceboys = [];

function setup() {
	console.log("Running");
  createCanvas(700,700);
  socket = io.connect('http://localhost:3000');
  ship = new Ship();
  spaceboy = new SpaceBoy();

  var data = {
    x: ship.pos.x,
    y: ship.pos.y,
    r: ship.r,
    heading: ship.heading,
    rotation: ship.rotation,
    red: ship.red,
    blue: ship.blue
	};

  socket.emit('start', data);

  socket.on('heartbeat',
    function(data) {
      ships = data;
    }
  );
}

function draw() {
  background(0);

  for(var i = 0; i < ships.length; i++){
    push();
    translate(ships[i].x, ships[i].y);
    rotate(ships[i].heading + PI/2);
    fill(ships[i].red,0,ships[i].blue);
    stroke(random(0,255),0,random(0,255));
    triangle(-ships[i].r, ships[i].r, ships[i].r, ships[i].r, 0, -ships[i].r);
    pop();
  }

  ship.render();
  ship.turn();
  ship.update();
  ship.edges();

  var data = {
    x: ship.pos.x,
    y: ship.pos.y,
    r: ship.r,
    heading: ship.heading,
    rotation: ship.rotation,
    red: ship.red,
    blue: ship.blue
};
  socket.emit('update', data);
}

function keyReleased(){
  ship.setRotation(0);
  ship.boosting(false);
}

function keyPressed(){
  if(keyCode == UP_ARROW){
    ship.boosting(true);
  }
  else if(keyCode == RIGHT_ARROW){
    ship.setRotation(0.1);
  }
  else if(keyCode == LEFT_ARROW){
    ship.setRotation(-0.1);
  }
}


function Ship() {
  this.pos = createVector(random(0,width), random(0,height));
  this.r = 20;
  this.heading = 0;
  this.rotation = 0;
  this.vel = createVector(0,0);
  this.isBoosing = false;
  this.red = random(0, 255);
  this.blue = random(0, 255);


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
    fill(this.red,0,this.blue);
    stroke(random(0,255),0,random(0,255));
    triangle(-this.r, this.r, this.r, this.r, 0, -this.r);
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

function SpaceBoy() {
  this.pos = createVector(random(0,width), random(0,height));
  this.r = 20;
  this.heading = 0;
  this.rotation = 0;
  this.vel = createVector(0,0);
  this.isBoosing = false;
  this.red = random(0, 255);
  this.blue = random(0, 255);

  this.sprite_sheet = loadSpriteSheet('assets/spaceboy.png', 171, 158, 11);
  this.explode_animation = loadAnimation(this.sprite_sheet);


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
    fill(this.red,0,this.blue);
    stroke(random(0,255),0,random(0,255));
    triangle(-this.r, this.r, this.r, this.r, 0, -this.r);
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
