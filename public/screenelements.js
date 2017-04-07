/**
 * This file contains various object functions for elements that appear multiple times per screen and can be used on any string.
 */

function Button(x, y, defaultImage, clickedImage, functionToCall)
{
	this.sprite = createSprite(y, x);
	this.sprite.addImage('default', defaultImage);
	this.sprite.addImage('clicked', clickedImage);

	this.functionToCall = functionToCall;

}

Button.prototype.press = function()
{
	this.sprite.changeImage('clicked');
	this.functionToCall();
	this.sprite.changeImage('default');
};


