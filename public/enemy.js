/**
 * @author Chandler Davis
 */


/**
 *
 *
 * This is the constructor for the most general type of enemy.
 * All future enemies will have the properties and methods that are declared here.
 *
 * @constructor
 *
 * @param {Number} health          The amount of damage the monster can take before dying
 * @param {Number} x               The initial x-position of the enemy
 * @param {Number} y               The initial y-position of the enemy
 * @param {Number} speed           How fast the enemy is going to move
 * @param {Number} damage          How much damage the enemy does per attack
 * @param {Number} detectionRadius The "view distance" of the enemy. When a fighter is within this radius, the enemy will chase them
 */
function Enemy(x, y, type)
{
	this.health = type.health;
	this.x = x;
	this.y = y;
	this.speed = type.speed;
	this.detectionRadius = type.detectionRadius;

	this.sprite = createSprite(this.x, this.y, 32, 32);
	//this.sprite.scale = .018;
	this.sprite.setCollider('circle', 0, 0, 50);
	this.sprite.debug = true;
	this.sprite.rotateToDirection = true;
	this.sprite.gravity = .5;
	this.sprite.maxSpeed = 2.6;

	this.sprite.addAnimation('idle', type.idleAnimation);
	this.sprite.addAnimation('walk', type.walkAnimation);
	this.sprite.addAnimation('attack', type.attackAnimation);

	this.sprite.damage = type.damage;

	this.sprite.bar = createSprite(this.x, this.y, this.health, 10);

	this.turnCounter = 0;

	this.playerToChase;
}

/**
 * Makes the enemy chase the closest player to it at any given time.
 * There is a certain range that if the player is outside, the monster just walks around randomly.
 *
 * @function
 *
 * @param  {Group} playerGroup A Group object that contains all of fighter's sprites in the server
 */
Enemy.prototype.update = function(playerArr)
{

	var currDist;
	var chasedDist;

	if(!this.playerToChase)
	{
		this.playerToChase = playerArr[0].sprite;
	}

	chasedDist = dist(this.playerToChase.position.x, this.playerToChase.position.y, this.sprite.position.x, this.sprite.position.y);

	// The monster will chase the player that is closest to it, in its view-range.
	for(var i = 0; i < playerArr.length; i++)
	{
		currDist = dist(playerArr[i].sprite.position.x, playerArr[i].sprite.position.y, this.sprite.position.x, this.sprite.position.y);

		if(currDist < chasedDist)
		{
			this.playerToChase = playerArr[i].sprite;
		}

		if((chasedDist < this.detectionRadius))
		{
			this.playerToChase = playerArr[i].sprite;
			this.sprite.attractionPoint(this.speed, playerArr[i].sprite.position.x, playerArr[i].sprite.position.y);
		}
		else
		{
			this.sprite.setSpeed(.82);
			this.sprite.rotationSpeed += random(-3.6, 3);

			if((this.turnCounter % 9) == 0)
			{
				this.sprite.rotationSpeed = 0;
			}

			this.turnCounter++;

		}

		this.sprite.bar.position.x = this.sprite.position.x;
		this.sprite.bar.position.y = this.sprite.position.y - 50;
		this.sprite.bar.shapeColor = "yellow";

	}

	if(!this.sprite.collide(this.playerToChase, this.attack) && this.sprite.getAnimationLabel() != 'walk')
	{
		this.sprite.changeAnimation('walk');
	}

};

/**
 * Called when a player collides with the enemy.
 * Enemy's attack Animation is played and the player that is colliding takes an amount of damage defined in the constructor.
 *
 * @function
 *
 * @param  {Sprite} enemy  The enemy that is one half of the collision.
 * @param  {Sprite} player The player that is the other half of the collision
 */
Enemy.prototype.attack = function(enemy, player)
{

	enemy.changeAnimation('attack');

	player.health -= enemy.damage;

	reduceHealthWidth(enemy.damage);
	//player.health -= enemy.damage;
	// reduceFullWidth(enemy.damage);

	if(fullHealthBar.width <= 0){
		fullHealthBar.width = 0;
	}
	player.setSpeed(3, enemy.getDirection());

	if(player.health <= 0 && player.life < 0)
	{
		player.changeAnimation('death');
		player.position.x = random(50, width - 50);
		player.position.y = random(50, height - 50);
		player.health = 100;
		fullHealthBar.width = 100;
		fullStaminaBar.width = 100;
		player.alive = true;


		console.log("You died!");

		player.changeAnimation('idle');
	}

};
