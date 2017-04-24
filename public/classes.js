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
		rightConeAngle: 28
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
		rightConeAngle: 112
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
		rightConeAngle: 42
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
		rightConeAngle: 45
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
		rightConeAngle: 38
	};

	playerTypeArray = {
		"Knight" : knight,
		"Calvary" : calvary,
		"Barbarian" : barb,
		"Mercenary" : mercenary,
		"Rogue" : rogue,
	};
}