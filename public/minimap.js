
/**
 * @Author: Andrew Messerly
 */

var redDotGroup;
var redDot;

function miniMap(x,y,enemySymbols){

	this.x = x;
	this.y = y;


	this.sprite = createSprite(this.x,this.y, 900,625);
	this.sprite.shapeColor = "black";
	this.sprite.visible = false;
	this.sprite.enemySymbol;


}

miniMap.prototype.createDots = function(enemyGroup){

	redDotGroup = new Group();

	enemySymbols.clear();
	
	for(var j = 0; j < enemyGroup.length;j++)
	{
		this.sprite.enemySymbol = createSprite(enemyGroup[j].position.x  ,enemyGroup[j].position.y,4,4);

		//up and to the left
		if(enemyGroup[j].position.x < this.sprite.position.x && 
			(enemyGroup[j].position.y < this.sprite.position.y)){
		
		this.sprite.enemySymbol.position.x += (this.sprite.position.x ) - (this.sprite.width/2);
		this.sprite.enemySymbol.position.y += (this.sprite.position.y ) - (this.sprite.height/2);
		this.sprite.enemySymbol.visible = false;
		this.sprite.enemySymbol.shapeColor = "red";
			enemySymbols.add(this.sprite.enemySymbol);	

		}
		//left
		else if(enemyGroup[j].position.x < this.sprite.position.x &&
		 ((this.sprite.position.y <  enemyGroup[j].position.y )< this.sprite.position.y + this.sprite.height)){

		
		this.sprite.enemySymbol.position.x += (this.sprite.position.x - this.sprite.width/2);
		this.sprite.enemySymbol.shapeColor = "red";
			this.sprite.enemySymbol.visible = false;
			enemySymbols.add(this.sprite.enemySymbol); 	

		}
		//down and to the left
		else if(enemyGroup[j].position.x < this.sprite.position.x &&
		 (enemyGroup[j].position.y > this.sprite.position.y)){

		this.sprite.enemySymbol.position.x += (this.sprite.position.x - this.sprite.width/2);
		this.sprite.enemySymbol.position.y -= (this.sprite.position.y - this.sprite.height/2);
		this.sprite.enemySymbol.shapeColor = "red";
			this.sprite.enemySymbol.visible = false;
			enemySymbols.add(this.sprite.enemySymbol);	

		}
		//up
		else if((( this.sprite.position.x < enemyGroup[j].position.x)<this.sprite.position.x + this.sprite.width) &&
		 (enemyGroup[j].position.y < this.sprite.position.y)){

		
		this.sprite.enemySymbol.position.y += (this.sprite.position.y - this.sprite.height/2);
		this.sprite.enemySymbol.shapeColor = "red";
			this.sprite.enemySymbol.visible = false;
		enemySymbols.add(this.sprite.enemySymbol); 	

		}
		//upper right
		
		else if(enemyGroup[j].position.x > this.sprite.position.x &&
		 (enemyGroup[j].position.y<this.sprite.position.y)){

		
		this.sprite.enemySymbol.position.x -= (this.sprite.position.x - this.sprite.width/2);
		this.sprite.enemySymbol.position.y += (this.sprite.position.y - this.sprite.height/2);
		this.sprite.enemySymbol.shapeColor = "red";
			this.sprite.enemySymbol.visible = false;
		enemySymbols.add(this.sprite.enemySymbol);

		}
		//right
	
		else if(enemyGroup[j].position.x > this.sprite.position.x &&
		 ((this.sprite.position.y <  enemyGroup[j].position.y )< this.sprite.position.y + this.sprite.height)){

		this.sprite.enemySymbol.position.x -= (this.sprite.position.x - this.sprite.width/2);
		this.sprite.enemySymbol.shapeColor = "red";
		this.sprite.enemySymbol.visible = false;
			enemySymbols.add(this.sprite.enemySymbol);	

		}


		//down and right
				
		else if(enemyGroup[j].position.x > this.sprite.position.x &&
		 (enemyGroup[j].position.y>this.sprite.position.y)){

	
		this.sprite.enemySymbol.position.x -= (this.sprite.position.x - this.sprite.width/2);
		this.sprite.enemySymbol.position.y -= (this.sprite.position.y - this.sprite.height/2);
		this.sprite.enemySymbol.shapeColor = "red";
			this.sprite.enemySymbol.visible = false;
			enemySymbols.add(this.sprite.enemySymbol); 	

		}

		//down
		
		else if(((this.sprite.position.x < enemyGroup[j].position.x)<this.sprite.position.x + this.sprite.width) &&
		 (enemyGroup[j].position.y > this.sprite.position.y)){

	
		this.sprite.enemySymbol.position.y += (this.sprite.position.y - this.sprite.height/2);
		this.sprite.enemySymbol.shapeColor = "red";
			this.sprite.enemySymbol.visible = false;
			enemySymbols.add(this.sprite.enemySymbol);	

		}
		
		//in map

		else if(((this.sprite.position.x < enemyGroup[j].position.x)<this.sprite.position.x + this.sprite.width) &&
		 (this.sprite.position.y < enemyGroup[j].position.y)<this.sprite.position.y + this.sprite.height){

		this.sprite.enemySymbol.shapeColor = "red";
			this.sprite.enemySymbol.visible = false;
		enemySymbols.add(this.sprite.enemySymbol);

		}
		

	}

};


miniMap.prototype.move = function(mapX, mapY){

for(var k = 0; k < enemySymbols.length; k++){
	enemySymbols[k].maxSpeed = 5;
	enemySymbols[k].position.x += mapX;
	enemySymbols[k].position.y += mapY;

}


};

miniMap.prototype.update = function(){

	for(var j = 0; j < enemySymbols.length; j++){
		
		if(enemyGroup[j].position.x < this.sprite.position.x && 
			(enemyGroup[j].position.y < this.sprite.position.y)){
		
		enemySymbols[j].position.x = ((this.sprite.position.x ) - (this.sprite.width/2)) + enemyGroup[j].position.x;
		enemySymbols[j].position.y = ((this.sprite.position.y ) - (this.sprite.height/2)) + enemyGroup[j].position.y;

	}

	else if(enemyGroup[j].position.x < this.sprite.position.x &&
		 ((this.sprite.position.y <  enemyGroup[j].position.y )< this.sprite.position.y + this.sprite.height)){		
		
		enemySymbols[j].position.x = (this.sprite.position.x ) - (this.sprite.width/2) + enemyGroup[j].position.x;
	

	}	
	else if(enemyGroup[j].position.x < this.sprite.position.x &&
		 (enemyGroup[j].position.y > this.sprite.position.y)){



		enemySymbols[j].position.x = (this.sprite.position.x ) - (this.sprite.width/2) + enemyGroup[j].position.x;
		enemySymbols[j].position.y = (this.sprite.position.y ) - (this.sprite.height/2) - enemyGroup[j].position.y;

}

	else if((( this.sprite.position.x < enemyGroup[j].position.x)<this.sprite.position.x + this.sprite.width) &&
		 (enemyGroup[j].position.y < this.sprite.position.y)){

	enemySymbols[j].position.y = (this.sprite.position.y - this.sprite.height/2) + enemyGroup[j].position.y;

}

		
		else if(enemyGroup[j].position.x > this.sprite.position.x &&
		 (enemyGroup[j].position.y<this.sprite.position.y)){
		 	enemySymbols[j].position.x = (this.sprite.position.x - this.sprite.width/2) - enemyGroup[j].position.x;
	enemySymbols[j].position.y = (this.sprite.position.y - this.sprite.height/2) + enemyGroup[j].position.y;

		}


	else if(enemyGroup[j].position.x > this.sprite.position.x &&
	 ((this.sprite.position.y <  enemyGroup[j].position.y )< this.sprite.position.y + this.sprite.height)){
	enemySymbols[j].position.x = (this.sprite.position.x - this.sprite.width/2) - enemyGroup[j].position.x;
	}

	else if(enemyGroup[j].position.x > this.sprite.position.x &&
		 (enemyGroup[j].position.y>this.sprite.position.y)){

		enemySymbols[j].position.x = (this.sprite.position.x - this.sprite.width/2) - enemyGroup[j].position.x;
		enemySymbols[j].position.y = (this.sprite.position.y - this.sprite.height/2) - enemyGroup[j].position.y;

}

else if(((this.sprite.position.x < enemyGroup[j].position.x)<this.sprite.position.x + this.sprite.width) &&
		 (enemyGroup[j].position.y > this.sprite.position.y)){

	enemySymbol[j].position.y = (this.sprite.position.y - this.sprite.height/2) + enemyGroup[j].position.y;

}



	else if(((this.sprite.position.x < enemyGroup[j].position.x)<this.sprite.position.x + this.sprite.width) &&
		 (this.sprite.position.y < enemyGroup[j].position.y)<this.sprite.position.y + this.sprite.height){

	enemySymbol[j].position.x = enemyGroup[j].position.x;
	enemySymbol[j].position.y = enemyGroup[j].position.y;

}
}
};

miniMap.prototype.delete = function(){

for(var l = 0; l < enemySymbols.length; l++){
	
	enemySymbols[l].visible = false;
	
}

};

miniMap.prototype.show = function(){

	for(var m = 0; m< enemySymbols.length; m++){
			enemySymbols[m].visible = true;
	}
};


