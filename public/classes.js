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
		healthRate: .1,
		speed: 3,
		scale: 1,
		damage: 1.2,
		spriteCollider: [0, 0, 30], // {offsetX, offsetY, radius}
		weaponCollider: [0, 0, 104],
		leftConeAngle: -32,
		rightConeAngle: 28,
		isVisible: true,
		specialAbility: knightSpecial
	};

	var cavalry = {
		walkAnimation: cavalryWalkAnimation,
		idleAnimation: cavalryIdleAnimation,
		swingAnimation: cavalrySwingAnimation,
		stamina: 135,
		staminaRate: 2,
		health: 120,
		healthRate: .1,
		speed: 4,
		damage: 1.1,
		scale: 1.3,
		spriteCollider: [0,0,25],
		weaponCollider: [0,0,53],
		leftConeAngle: 35,
		rightConeAngle: 112,
		isVisible: true,
		specialAbility: cavalrySpecial
	};

	var barb = {
		walkAnimation: barbWalkAnimation,
		idleAnimation: barbIdleAnimation,
		swingAnimation: barbSwingAnimation,
		stamina: 300,
		staminaRate: 2,
		health: 150,
		healthRate: .1,
		speed: 2,
		damage: 1.5,
		scale: 1.5,
		spriteCollider: [0,0,22.5],
		weaponCollider: [0,0,60],
		leftConeAngle: -38,
		rightConeAngle: 42,
		isVisible: true,
		specialAbility: barbSpecial
	};

	var mercenary = {
		walkAnimation: mercWalkAnimation,
		idleAnimation: mercIdleAnimation,
		swingAnimation: mercSwingAnimation,
		stamina: 145,
		staminaRate: 2,
		health: 125,
		healthRate: .1,
		speed: 3.2,
		scale: 1.15,
		damage: 1.15,
		spriteCollider: [0,0,24],
		weaponCollider: [0,0,64],
		leftConeAngle: -8,
		rightConeAngle: 45,
		isVisible: true,
		specialAbility: mercenarySpecial
	};

	var rogue = {
		walkAnimation: rogueWalkAnimation,
		idleAnimation: rogueIdleAnimation,
		swingAnimation: rogueSwingAnimation,
		stamina: 120,
		staminaRate: 2,
		health: 100,
		healthRate: .1,
		speed: 3.4,
		scale: .8,
		damage: 1,
		spriteCollider: [0,0,23],
		weaponCollider: [0,0,71],
		leftConeAngle: 10,
		rightConeAngle: 38,
		isVisible: true,
		specialAbility: rogueSpecial
	};

	playerTypeArray = {
		"Knight" : knight,
		"Cavalry" : cavalry,
		"Barbarian" : barb,
		"Mercenary" : mercenary,
		"Rogue" : rogue,
	};
}



function knightSpecial(activated)
{
	if (activated && fullStaminaBar.width > 0) {
		this.healthRate = 0.5;

		reduceStaminaWidth();
		reduceStaminaWidth();ddddddddddddddddd

		console.log("You gain a newfound sense of purpose. Those monsters ain't gonna get an easy kill today! 5X Health Regeneration");
	}
	else {
		if (fullStaminaBar.width == 0) {
			console.log("You snap out of it and realize life is meaningless. 1X Health Regeneration");
		}
		this.healthRate = 0.1;
	}

}

/* Speed increase */
function cavalrySpecial(activated)
{
	if(activated && fullStaminaBar.width > 0)
	{
		this.maxSpeed = 12;

		reduceStaminaWidth();
		reduceStaminaWidth();

		console.log("You give your steed a double espresso! 3X Speed");
	}
	else
	{
		if (fullStaminaBar.width == 0) {
			console.log("Your horse is suffering from caffeine withdrawal. 1X Speed");
		}
		this.maxSpeed = 4;
	}

}

/* Increase in size */
function barbSpecial(activated)
{
	if(activated && fullStaminaBar.width > 0)
	{
		this.sprite.scale = 2;
		this.sprite.sword.scale = 2;

		reduceStaminaWidth();
		reduceStaminaWidth();
		
		console.log("Your size increases to epic proportions!");
	}
	else
	{
		if (activated && fullStaminaBar.width == 0) {
			console.log("You are too sore to buff up anymore.");
		}
		this.sprite.scale = 1.5;
		this.sprite.sword.scale = 1.5;
	}

}

/* Double damage */
function mercenarySpecial(activated)
{
	if(activated && fullStaminaBar.width > 0)
	{
		this.damage = 2.30;

		reduceStaminaWidth();
		reduceStaminaWidth();
		
		console.log("You remember how much money you'll get paid if you survive. 2X base damage");
	}
	else
	{
		if (activated && fullStaminaBar.width == 0) {
			console.log("You also remember you have student loans. 1X base damage.");
		}
		this.damage = 1.15;
	}

}

/* Become invisible to enemies */
function rogueSpecial(activated)
{
	if (activated && fullStaminaBar.width > 0) {
		console.log("You remember that technique your mentor taught you. You are now invisible to monsters");

		this.isVisible = false;

		reduceStaminaWidth();
		reduceStaminaWidth();
	}
	else {
		if (activated && fullStaminaBar.width == 0) {
			console.log("You were busy playing games in class, so you forget that you have to stay quiet, too.");
		}

		this.isVisible = true;
	}

}
