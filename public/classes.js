/* Assigns values to the various types of Enemies and Fighters that we have. */
function assignTypes()
{
	var goblin = {
		walkAnimation: enemyWalkAnimation,
		idleAnimation: enemyIdleAnimation,
		attackAnimation: enemyAttackAnimation,
		health: 100,
		damage: .83,
		speed: 1.8,
		detectionRadius: 225,
		scale: .75,
		friction: 0.5
	};

	var spider = {
		walkAnimation: enemyWalkAnimation,
		idleAnimation: enemyIdleAnimation,
		attackAnimation: enemyAttackAnimation,
		health: 100,
		damage: .50,
		speed: 3,
		detectionRadius: 300
	};

	var bat = {
		walkAnimation: enemyWalkAnimation,
		idleAnimation: enemyIdleAnimation,
		attackAnimation: enemyAttackAnimation,
		health: 50,
		damage: .25,
		speed: 9,
		detectionRadius: 500
	};

	enemyTypeArray.push(goblin);
	enemyTypeArray.push(spider);
	enemyTypeArray.push(bat);


	var knight = {
		walkAnimation: knightWalkAnimation,
		idleAnimation: knightIdleAnimation,
		swingAnimation: knightSwingAnimation,
		stamina: 120,
		staminaRate: 2,
		health: 135,
		speed: 3,
		scale: 1,
		damage: 1.2,
		spriteCollider: [0, 0, 30], // {offsetX, offsetY, radius}
		weaponCollider: [0, 0, 104],
		leftConeAngle: -32,
		rightConeAngle: 28,
		specialAbility: knightSpecial
	};

	var calvary = {
		walkAnimation: calvaryWalkAnimation,
		idleAnimation: calvaryIdleAnimation,
		swingAnimation: calvarySwingAnimation,
		stamina: 135,
		staminaRate: 2,
		health: 120,
		speed: 4,
		damage: 1.1,
		scale: 1.3,
		spriteCollider: [0,0,25],
		weaponCollider: [0,0,53],
		leftConeAngle: 35,
		rightConeAngle: 112,
		specialAbility: calvarySpecial
	};

	var barb = {
		walkAnimation: barbWalkAnimation,
		idleAnimation: barbIdleAnimation,
		swingAnimation: barbSwingAnimation,
		stamina: 300,
		staminaRate: 2,
		health: 150,
		speed: 2,
		damage: 1.5,
		scale: 1.5,
		spriteCollider: [0,0,22.5],
		weaponCollider: [0,0,60],
		leftConeAngle: -38,
		rightConeAngle: 42,
		specialAbility: barbSpecial
	};

	var mercenary = {
		walkAnimation: mercWalkAnimation,
		idleAnimation: mercIdleAnimation,
		swingAnimation: mercSwingAnimation,
		stamina: 145,
		staminaRate: 2,
		health: 125,
		speed: 3.2,
		scale: 1.15,
		damage: 1.15,
		spriteCollider: [0,0,24],
		weaponCollider: [0,0,64],
		leftConeAngle: -8,
		rightConeAngle: 45,
		specialAbility: mercenarySpecial
	};

	var rogue = {
		walkAnimation: rogueWalkAnimation,
		idleAnimation: rogueIdleAnimation,
		swingAnimation: rogueSwingAnimation,
		stamina: 120,
		staminaRate: 2,
		health: 100,
		speed: 3.4,
		scale: .8,
		damage: 1,
		spriteCollider: [0,0,23],
		weaponCollider: [0,0,71],
		leftConeAngle: 10,
		rightConeAngle: 38,
		specialAbility: rogueSpecial
	};

	playerTypeArray = {
		"Knight" : knight,
		"Calvary" : calvary,
		"Barbarian" : barb,
		"Mercenary" : mercenary,
		"Rogue" : rogue,
	};
}



function knightSpecial()
{
	console.log("You activated your special");

}

function calvarySpecial()
{
	if(fullStaminaBar.width > 0)
	{
		this.sprite.velocity.y -= 15;
		this.sprite.sword.velocity.y -= 15;

		reduceStaminaWidth(); 
		reduceStaminaWidth(); 
	}
	else
	{
		this.speed = this.maxSpeed;
		console.log("No stamina to use special.");
	}
	
}

function barbSpecial()
{
	console.log("You activated your special");

	if(fullStaminaBar.width > 0 && this.activated = false)
	{
		this.sprite.scale = ;
		this.sprite.sword.scale = ;

		this.activated = true;

		reduceStaminaWidth(); 
		// reduceStaminaWidth(); 
	}
	else
	{
		console.log("No stamina to use special.");
	}
}

function mercenarySpecial()
{
	console.log("You activated your special");
	
}

function rogueSpecial()
{
	console.log("You activated your special");

}