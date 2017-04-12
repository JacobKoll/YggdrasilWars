function PreparationScreen(characterImages)
{
	this.characterImages = characterImages;
	this.current = characterImages.size() / 2; // Start in the middle of the group
	this.left =  this.current - 1;
	this.right = this.current + 1;

	this.hasSelected = false;

	this.currentSprite = createSprite(128, height/2,128,128);
	this.leftSprite = createSprite(64, height/2,128,128);
	this.rightSprite = createSprite(192, height/2,128,128);

	for (var i = 0; i < characterImages.length; i++)
	{
		this.currentSprite.addImage(characterImages[i]);
		this.leftSprite.addImage(characterImages[i]);
		this.rightSprite.addImage(characterImages[i]);
	}
}

PreparationScreen.prototype.changeSelection = function(direction) 
{
	if(direction == "right")
	{
		if(this.current == this.characterImages.size() - 1)
		{
			this.current = 0;
			this.right = 1;
		}
	}
	else
	{
		if(this.current == 0)
		{
			this.current = this.characterImages.size()-1;
			this.left = this.current - 1;
		}
	}

	this.currentSprite.addImage(characterImages[this.current]);
	this.leftSprite.addImage(characterImages[this.left]);
	this.rightSprite.addImage(characterImages[this.right]);



}

PreparationScreen.prototype.chooseSelection = function() 
{
		this.hasSelected = true;
		return this.currentSprite;	
};
