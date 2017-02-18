var ship;
var r;
var b;

function setup() {
  createCanvas(windowWidth,windowHeight);
  ship = new Ship();
  r = random(0, 255);
  g = random(0, 255);
  b = random(0, 255);
}

function draw() {
  background(0);
  ship.render();
  ship.turn();
  ship.update();
  ship.edges();
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
    translate(this.pos.x, this.pos.y);
    rotate(this.heading + PI/2);
    fill(r,0,b);
    stroke(random(0,255),0,random(0,255));
    triangle(-this.r, this.r, this.r, this.r, 0, -this.r);
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
