/*  */
function Enemy(health, x, y, walkAnimation, attackAnimation, speed, damage)
{
	this.health = health;
	this.x = x;
	this.y = y;
	this.walkAnimation = walkAnimation;
	this.attackAnimation = attackAnimation;
	this.speed = speed;
	this.damage = damage;

	this.sprite = createSprite(this.x, this.y);
	this.sprite.addAnimation('walk', walkAnimation);
	this.sprite.addAnimation('attack', attackAnimation);




	this.sprite.debug = true;

}


/* Makes the enemy chase the closest player to it at any given time.
There is a certain range that if the player is outside, the monster just walks around. */
Enemy.prototype.chasePlayer = function(playerArray) 
{
	var playerToChase;

	/*for (var i = playerArray.length - 1; i >= 0; i--) {
		playerArray[i];
	} */

};