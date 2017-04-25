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
function Enemy(id, x, y, type)
{
	this.id = id;

	this.x = x;
	this.y = y;

	this.sprite = createSprite(x, y, 70, 70);
	this.sprite.setCollider('circle', 0, 0, 30);
	// this.sprite.rotateToDirection = true;
	this.sprite.damage = type.damage;
	this.sprite.health = 0;

	// this.sprite.addAnimation('idle', type.idleAnimation);
	// this.sprite.addAnimation('walk', type.walkAnimation);
	// this.sprite.addAnimation('attack', type.attackAnimation);

	// this.sprite.bar = createSprite(this.x, this.y, this.health, 10);

	// this.sprite.scale = type.scale;
}