
/**
 * @author Jake Koll and Chandler Davis
 */

/**
 * [turnSpeed How fast the character turns]
 * @type {Number}
 */
var turnSpeed = 1.57;
/**
 * [acceleration How fast the character moves]
 * @type {Number}
 */
var acceleration = 1.953;
/**
 * [maxSpeed The maximum speed the character can move]
 * @type {Number}
 */
var maxSpeed = 3;
/**
 * [friction To make the charcter movements less sharp]
 * @type {Number}
 */
var friction = .5;


/**
 * [Fighter This fuction is for creating a prototype function to make different kinds of fighters.]
 *
 * @constructor
 * 
 * @param {Number} health         [The health of the character]
 * @param {Number} x              [The x coordinate of the character]
 * @param {Number} y              [The y coordinate of the character]
 * @param {Animation} walkAnimation  [The walking animation of the character]
 * @param {Animation} swingAnimation [The swinging animation of the character]
 * @param {Animation} deathAnimation [The death animation of the character]
 * @param {Animation} idleAnimation  [The idle animation of the character]
 */
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
	this.sprite.maxSpeed = maxSpeed;
	this.sprite.friction = friction;
	this.sprite.debug = true;

	this.sprite.health = health; //Amount of health.

	this.sprite.addAnimation('walk', walkAnimation);
	this.sprite.addAnimation('death', deathAnimation);
	this.sprite.addAnimation('idle', idleAnimation);

	this.sword = createSprite(x, y, 138, 96);
	this.sword.maxSpeed = maxSpeed;
	this.sword.friction = friction;
	this.sword.debug = true;
	this.sword.visible = false;

	this.sword.addAnimation('swing', swingAnimation);

	this.sword.position = this.sprite.position;


	/* Bounding boxes */
	this.sprite.setCollider("circle", 0, 0, 45);

}

/**
 * [walk Move the character forward]
 *
 * @function
 * 
 * @param  {String} direction [What direction is the character moving]
 */
Fighter.prototype.walk = function(direction)
{
	if(this.alive && this.sword.visible == false)
	{
		if(direction == "up"){
			this.sprite.velocity.y = -5;
			this.sword.velocity.y = -5;
		}
		else if(direction == "down"){
			this.sprite.velocity.y = 5;
			this.sword.velocity.y = 5;
		}
		else if(direction == "right"){
			this.sprite.velocity.x = 5;
			this.sword.velocity.x = 5;
		}
		else if(direction == "left"){
			this.sprite.velocity.x = -5;
			this.sword.velocity.x = -5;
		}
	}
}

/**
 * [swing Swings the characters sword]
 * @function
 * 
 */
Fighter.prototype.swing = function()
{
	this.sword.visible = true;
}

/**
 * [die Runs the characters death animation]
 * @function
 */
Fighter.prototype.die = function()
{
	this.alive = false;
	this.sprite.remove();
	this.sword.remove();
}

/**
 * [remove Removes the characters from the game]
 * @function
 */
Fighter.prototype.remove = function()
{
	this.sprite.remove();
	this.sword.remove();
}

/**
 * [draw Draws all the related sprites in one function]
 * @function
 */
Fighter.prototype.draw = function()
{
	this.sprite.rotation = degrees(atan2(mouseY-this.sprite.position.y, mouseX-this.sprite.position.x));
	this.sword.rotation = degrees(atan2(mouseY-this.sword.position.y, mouseX-this.sword.position.x));

	/**
	 * Trying to make the bounding box for the sword follow the rotation
	 */
	this.sword.setCollider(
		"circle",
		60 * cos(radians(this.sprite.rotation - 16)),
		60 * sin(radians(this.sprite.rotation - 16)),
		46
	);
	drawSprite(this.sprite);
	drawSprite(this.sword);
}
