
function Obstacle(x, y, scale) {
	this.x = x;
	this.y = y;
	this.scale = scale;
}

function Chest(id, x, y) 
{
	this.isOpen = false;
	
	this.x = x;
	this.y = y;
}


module.exports = {
	obstacle: Obstacle,
	chest: Chest
};