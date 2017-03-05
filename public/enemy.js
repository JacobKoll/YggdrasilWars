function Enemy(health, x, y, speed, damage, detectionRadius)
{
	this.health = health;
	this.x = x;
	this.y = y;
	this.speed = speed;
	this.damage = damage;
	this.detectionRadius = detectionRadius;

	this.sprite = createSprite(this.x, this.y, 32, 32);
	//this.sprite.scale = .018;
	this.sprite.setCollider('circle', 0, 0, 50);
	this.sprite.debug = true;
	this.sprite.rotateToDirection = true;
	this.sprite.gravity = .5;
	this.sprite.maxSpeed = 2.6;

	this.sprite.damage = 10;

	this.turnCounter = 0;

	this.playerToChase;
}

Enemy.prototype.assignAnimations = function(idleAnimation, walkAnimation, attackAnimation)
{
	this.sprite.addAnimation('idle', idleAnimation);
	this.sprite.addAnimation('walk', walkAnimation);
	this.sprite.addAnimation('attack', attackAnimation);
};

/* Makes the enemy chase the closest player to it at any given time.
There is a certain range that if the player is outside, the monster just walks around. */
Enemy.prototype.update = function(playerGroup) 
{

	var currDist;
	var chasedDist;

	if(!this.playerToChase)
	{
		this.playerToChase = playerGroup.get(0);
	}
	chasedDist = dist(this.playerToChase.position.x, this.playerToChase.position.y, this.sprite.position.x, this.sprite.position.y);

	// The monster will chase the player that is closest to it, in its view-range.
	for(var i = 0; i < playerGroup.size(); i++)
	{

		//currPlayerDist = sqrt(pow((playerGroup.get(i).position.x - this.sprite.position.x), 2) + pow((playerGroup.get(i).position.y - this.sprite.position.y), 2));
		currDist = dist(playerGroup.get(i).position.x, playerGroup.get(i).position.y, this.sprite.position.x, this.sprite.position.y);

		if(currDist < chasedDist)
		{
			this.playerToChase = playerGroup.get(i);
		}

		if((chasedDist < this.detectionRadius))
		{
			this.playerToChase = playerGroup.get(i);
			this.sprite.attractionPoint(2, playerGroup.get(i).position.x, playerGroup.get(i).position.y);
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
	}

	if(!this.sprite.collide(this.playerToChase, this.attack) && this.sprite.getAnimationLabel() != 'walk')
	{
		this.sprite.changeAnimation('walk');
	}

};

Enemy.prototype.attack = function(enemy, player) 
{

	enemy.changeAnimation('attack');
	player.health -= enemy.damage;
	player.setSpeed(3, enemy.getDirection());
	
	if(player.health <= 0 && player.life < 0)
	{
		player.changeAnimation('death');
	
		//alert("You died. Score -5 (This will not pop up in the actual game)/");
		console.log("You died!");
		player.position.x = random(50, width - 50);
		player.position.y = random(50, height - 50);
		player.health = 100;
	}

};