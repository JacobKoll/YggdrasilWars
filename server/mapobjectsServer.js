/**
 * @author Ashley Young
 */

/**
 * Creates an immutable Obstacle object, represented by the image of a bush
 * @constructor
 *
 * @param      {Number}     x       x-coordinate of the obstacle
 * @param      {Number}     y       y-coordinate of the obstacle
 * @param      {Number}     width   The width of the obstacle
 * @param      {Number}     height  The height of the obstacle
 * @param      {.png}    image   The image to represent the obstacle
 */
function Obstacle(x, y, width, height, image) {
	this.sprite = createSprite(x, y, width, height);
	this.sprite.immovable = true;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.image = image;
	this.sprite.addImage('image', image);
}

Obstacle.prototype.update = function() {
	this.sprite.changeAnimation('image');
};


/**
 * Creates a treasure chest that can be opened, and will later give points when opened
 * @constructor
 *
 * @param      {Number}  x            x-coordinate of chest
 * @param      {Number}  y            y-coordinate of chest
 * @param      {.png}  openImage    image to represent chest's open state
 * @param      {.png}  closedImage  image to represent chest's closed state
 */
function Chest(x, y, openImage, closedImage, unlockCode, lockStrength) 
{
	this.itemStash = gameItems[round(random(0,4))];
	this.sprite = createSprite(x, y, width, height);
	this.sprite.immovable = true;

	this.sprite.addImage('open', openImage);
	this.sprite.addImage('closed', closedImage);
	
	this.isOpen = false;
	
	this.x = x;
	this.y = y;
	
	this.unlockCode = unlockCode;
	this.lockStrength = lockStrength;
}

Chest.prototype.open = function() 
{
	this.sprite.changeImage('open');
	this.isOpen = true;
	chestItemDrop(this.itemStash);
	this.itemStash = gameItems[0];
};

Chest.prototype.setUnlockCode = function()
{
	for(var i = 0; i< 3; i++)
	{
		this.unlockCode[i] = setRandomLetter();
	}
};
