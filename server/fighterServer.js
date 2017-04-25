
function Fighter(x, y, rotation, type, id)
{
	this.x = x;
	this.y = y;
	this.rotation = rotation;
	this.type = type;
	this.id = id;
	this.isAttacking = false;
	this.isWalking = false;
}

module.exports = Fighter;
