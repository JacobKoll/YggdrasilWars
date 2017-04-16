
var points; 


function partyScreen(x,y, characterText, healthText, pointsText){

	this.x = x;
	this.y = y;



	this.sprite = createSprite(this.x,this.y, 900,625);
	this.sprite.shapeColor = "black";
	this.sprite.visible = false;

	this.characterString = characterText;
	this.healthString = healthText;
	this.pointsString = pointsText;


	this.sprite.healthBar;



}


//text("character", camera.position.x, camera.position.y);


//names may be replaced by the player array if possible. 
partyScreen.prototype.draw = function(names){

	healthBars = new Group();

	drawSprite(this.sprite);
		stroke('white');
  		textSize(32);
  		fill('white');
  		textFont('Georgia');
	text(this.characterString,this.sprite.position.x + 10,this.sprite.position.y);
	text(this.healthString,this.sprite.position.x + 20,this.sprite.position.y);
	
	text(this.pointsString, this.sprite.position.x + 30,this.sprite.position.y);


	for(var i = 0; i < names.length; i++){



		this.sprite.healthBar = createSprite(20, 10, names[i].health, 8);
		this.sprite.healthBar.position.x += this.sprite.position.x + 20;

		this.sprite.healthBar.position.y += this.sprite.position.y + 10;
		this.sprite.healthBar.shapeColor = "red";
		this.sprite.healthBar.visible = false; 

		healthBars.add(this.sprite.healthBar);

		
	}

};

partyScreen.prototype.show = function(){
	for(var i = 0; i < healthBars.length; i++){

		healthBars[i].visible = true;
		console.log(healthBars[i].position.x);
	}

};



partyScreen.prototype.move = function(mapX, mapY, arr){

for(var k = 0; k < healthBars.length; k++){
	healthBars[k].maxSpeed = 5;
	healthBars[k].position.x = mapX + k;
	healthBars[k].position.y = mapY + k;
	healthBars[k].width = fullHealthBar.width;

}




};

partyScreen.prototype.delete = function(){
	for(var i = 0; i < healthBars.length; i++){

		healthBars[i].visible = false;
	}

};

partyScreen.prototype.addNames = function(playerArr){

	for(var i = 0; i < playerArr.length; i++){

		text("knight", camera.position.x - 400, (camera.position.y - 200 + (50*i)));

	}
	
};

partyScreen.prototype.addPoints = function(playerArr){

	for(var i = 0; i < playerArr.length; i++){

		text(score, camera.position.x - 100, (camera.position.y - 200 + (50*i)));
	}

};