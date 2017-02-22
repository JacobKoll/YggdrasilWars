// This is the Fighter class that allows for multiple instances of a "Fighter" sprite with custom properties

// These values are defined here for ease of access
var turnSpeed = 1.57;
var acceleration = 1.753;
var maxSpeed = 4;
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
	this.idleAnimation = idleAnimation;

	/* This is where we initialize the sprite and it's animations */
	this.sprite = createSprite(x, y, 138, 96);
	this.sprite.maxSpeed = maxSpeed;
	this.sprite.friction = friction;

	/* This is the sword that follows the player sprite */
	// this.sword = createSprite(x, y, 138, 96);
	// this.sword.addAnimation('swing', swingAnimation);
	// // Make the sword follow the player
	// this.sword.position = this.sprite.position; 
	
	

	this.sprite.addAnimation('walk', walkAnimation);
	this.sprite.addAnimation('death', deathAnimation);
	this.sprite.addAnimation('idle', idleAnimation);

	// Move forward
	this.walk = function(direction)
	{
		this.sprite.changeAnimation('walk');
		if(direction == "forward")
		{
			this.sprite.addSpeed(acceleration, this.sprite.rotation);
		}
		else
		{
			this.sprite.addSpeed(-acceleration / 1.64, this.sprite.rotation);
		}
	}

	// Turn left or right
	this.turn = function(direction)
	{
		if(direction == "left")
		{
		
			this.sprite.addSpeed(-.025, this.sprite.rotation+90);
			this.sprite.rotation -= turnSpeed;
		}
		else
		{
			this.sprite.addSpeed(-.025, this.sprite.rotation-90);
			this.sprite.rotation += turnSpeed;
		}
	}

	this.swing = function()
	{
		//this.sword.rotation = this.sprite.getDirection(); // Make the sword rotate with the player
		console.log("You swing!");
	}

	this.die = function()
	{
		console.log("You died!");
	}

}