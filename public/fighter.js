// This is the Fighter class that allows for multiple instances of a "Fighter" sprite with custom properties

// These values are defined here for ease of access
var turnSpeed = 1.57;
var acceleration = 1.753;
var maxSpeed = 2;
var friction = .5;

function Fighter(health, x, y, walkAnimation, swingAnimation, deathAnimation, idleAnimation)
{
	/* Properties of this fighter */
	this.health = health; //Amount of health. 

	this.alive = true;
	
	/* Initialize the animations */
	this.walkAnimation = walkAnimation;// Walk animations
	this.swingAnimation = swingAnimation; // Attack animation
	this.deathAnimation = deathAnimation; // Death animation
	this.idleAnimation = idleAnimation; // Animation for when the player is not moving

	/* This is where we initialize the sprite and it's animations */
	this.sprite = createSprite(x, y, 72, 96);
	this.sprite.rotateToDirection = true;
	this.sprite.maxSpeed = maxSpeed;
	this.sprite.friction = friction;
	this.sprite.debug = true;	


	this.sprite.addAnimation('walk', walkAnimation);
	this.sprite.addAnimation('death', deathAnimation);
	this.sprite.addAnimation('idle', idleAnimation);

	this.sword = createSprite(x, y, 138, 96);
	this.sword.rotateToDirection = true;
	this.sword.maxSpeed = maxSpeed;
	this.sword.friction = friction;
	this.sword.debug = true;
	this.sword.visible = false;

	this.sword.addAnimation('swing', swingAnimation);

	this.sword.position = this.sprite.position;

	/* Bounding boxes */
	this.sprite.setCollider("circle", 0, 0, 45);

	// Move forward
	this.walk = function(direction)
	{
		if(this.alive && this.sword.visible == false)
		{
			if( Math.round(this.sprite.position.x) < Math.round(mouseX) + 4 &&
				Math.round(this.sprite.position.x) > Math.round(mouseX) - 4 &&
			 	Math.round(this.sprite.position.y) < Math.round(mouseY) + 4 &&
				Math.round(this.sprite.position.y) > Math.round(mouseY) - 4)
			{
				this.sprite.changeAnimation('idle');
			}
			else
			{
				this.sprite.attractionPoint(100, mouseX, mouseY);
				this.sword.attractionPoint(50, mouseX, mouseY);
				this.sprite.addSpeed(acceleration, this.sprite.getDirection());
				this.sprite.changeAnimation('walk');

				/* Trying to make the bounding box for the sword follow the rotation */
				this.sword.setCollider("circle", 
					60 * cos(radians(this.sprite.getDirection() - 16)), 
					60 * sin(radians(this.sprite.getDirection() - 16)), 
					46);		
			}
		}			
	}

	this.swing = function()
	{
		this.sword.visible = true;
		this.sprite.setSpeed(0);
	}

	this.die = function()
	{	
		this.alive = false;
		this.sprite.remove();
		this.sword.remove();
	}

	this.remove = function()
	{
		this.sprite.remove();
		this.sword.remove();
	}

}

function Obstacle(x, y, width, height, image) {
	this.sprite = createSprite(x, y, width, height);
	this.sprite.immovable = true;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.image = image;
	this.sprite.addImage('image', image);

	this.update = function() {
		this.sprite.changeAnimation('image');
	}
}

function Tile(x, y, type, canvas) {
	this.sprite = createSprite(x, y, canvas.width/10, canvas.height/10);
	this.sprite.immovable = true;
	this.x = x;
	this.y = y;
	this.width = this.sprite.width;
	this.height = this.sprite.height;
	if (type == "grass") {
		this.hardness = 1;
		// this.colg = 255;
		// this.colr = 0;
		// this.colb = 0;
		this.sprite.shapeColor = color(26, 157, 11);
	}
	else if (type == "dirt") {
		this.hardness = 0;
		this.sprite.shapeColor = color(229, 172, 77);
		// this.colg = 125;
		// this.colr = 125;
		// this.colb = 125;
	}
	else {
		this.hardness = 3;
		this.sprite.shapeColor = color(100, 75, 40);
		//this.colg = this.colr = this.colb = 0;
	}

}