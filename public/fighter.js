// This is the Fighter class that allows for multiple instances of a "Fighter" sprite with custom properties

// These values are defined here for ease of access
var turnSpeed = 1.57;
var acceleration = 1.753;
var maxSpeed = 2;
var friction = .5;

function Fighter(health, x, y, id, walkAnimation, swingAnimation, deathAnimation, idleAnimation)
{
	/* Properties of this fighter */
	this.health = health; //Amount of health.
	this.id = id; // 

	
	/* Initialize the animations */
	this.walkAnimation = walkAnimation;// Walk animations
	this.swingAnimation = swingAnimation; // Attack animation
	this.deathAnimation = deathAnimation; // Death animation
	this.idleAnimation = idleAnimation; // Animation for when the player is not moving

	/* This is where we initialize the sprite and it's animations */
	this.sprite = createSprite(x, y, 138, 96);
	this.sprite.rotateToDirection = true;
	this.sprite.maxSpeed = maxSpeed;
	this.sprite.friction = friction;
	this.sprite.debug = true;

	this.sprite.addAnimation('walk', walkAnimation);
	this.sprite.addAnimation('death', deathAnimation);
	this.sprite.addAnimation('idle', idleAnimation);
	this.sprite.addAnimation('swing', swingAnimation);

	//this.healthbar = createSprite(x, y, 30, 12);
	//this.healthbar.debug = true;


	// Move forward
	this.walk = function(direction)
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
			this.sprite.addSpeed(acceleration, this.sprite.getDirection());
			this.sprite.changeAnimation('walk');
		}
					
	}

	this.swing = function()
	{
		console.log("You swing!");

		this.sprite.setSpeed(0);
		this.sprite.changeAnimation('swing');
	}

	this.die = function()
	{
		this.sprite.changeAnimation('death');	
		console.log("You died!");
	}

}