
var mysql = require('mysql');
var express = require("express");
var socket = require("socket.io");
var app = express();
var server = app.listen(3000);
var io = socket(server);

var FPS = 24;

var fighterArr = [];
var spawnerArr = [];
var enemyArr = [];
var obstacleArr = [];
var chestArr = [];
var numSpawners = 2;

app.use(express.static("../public"));


/**
 * @author Chandler Davis and Andrew Messerly
 */

/**
 * Constructs a spawner that spawns Enemy objects/sprites
 * @constructor
 *
 * @param {int} x         Initial x-position of the spawner
 * @param {int} y         Initial y-position of the spawner
 * @param {function} enemyType The constructor for the Enemy that it will spawn
 * @param {int} rate      The rate (per second) that the spawner will emit a new Enemy
 * @param {int} limit     The maximum amount of Enemies that this spawner will emit
 * @param {Image} image     The image for the EnemySpawner sprite
 */
function EnemySpawner(x, y, rate, limit) 
{
	this.x = x;
	this.y = y;
	this.rate = rate;
	this.limit = limit;
	this.spawnCount = 0;
	this.curDepth = 100;

	this.enemyArr = [];
	this.spawn;
	this.timer = 0;
}	

/**
 * Spawns Enemies given the values initialized in the constructor function
 * @function
 * 
 */
EnemySpawner.prototype.spawn = function(enemyGroup) 
{
	if((this.timer % (100/this.rate)) == 0 && this.enemyArr.length < this.limit)
	{
		this.spawnCount++;

		tempEnemy = new Enemy(this.x, this.y, this.enemyType);
		tempEnemy.sprite.depth = this.curDepth;
		this.curDepth++;
		this.enemyArr.push(tempEnemy);
		enemyGroup.push(tempEnemy.sprite);

	}
	
	this.timer++;
};

EnemySpawner.prototype.updateAll = function(fighterArr) 
{
	for (var i = 0; i < this.enemyArr.length; i++) 
	{
		this.enemyArr[i].update(fighterArr);
	}
};

var chestArr;
/**
 * Initializes everything that the server will need.
 */
function init()
{
	fighterArr = [];

	spawnerArr = [];
	enemyArr = [];

	/**
	 * Initialize obstacles
	 */
	for (var i=0; i<60; i++) {
		var a = Math.floor((Math.random())*4000/45)*(45);
		var b = Math.floor((Math.random())*4000/45)*(45);
		var obsData = {x: a, y: b};
		obstacleArr.push(obsData);
	}
	console.log("Obstacles Generated");

	/**
	 * Initialize chests
	 */
	 for (var i=0; i<10; i++) {
		var a = Math.floor((Math.random())*4000/45)*(45);
		var b = Math.floor((Math.random())*4000/45)*(45);
		var chestData = {x: a, y: b};
		chestArr.push(chestData);
	}
	console.log("Chests Generated");

	/**
	 * Initialize spawners
	 */
	 for (i=0; i<numSpawners; i++) {
	 	spawnerArr[i] = new EnemySpawner()
	 }

	console.log("The Yggdrasill Wars server is open and running... \n");
}

/**
 * This handles the events that occur whenever someone joins the server.
 * @param  {socket} client [The socket that the client uses to connect to the server]
 */


function onSocketConnect(client)
{

	setInterval(heartbeat, 1000/FPS);

	/* When connected, add the client's fighter to the array. */
	client.on('start', function(newFighter)
	{
		io.sockets.emit('generateObstacles', obstacleArr);
		io.sockets.emit('generateChests', chestArr);
		io.sockets.emit('generateSpawners', spawnerArr);
		console.log(client.id + " added it[s fighter\n");
	});

	/**
	 * Update all of the sprites to be rendered client-side for all clients.
	 */
	function heartbeat()
	{
		/* Fighter data */
		var gameData = {

		};
		io.sockets.emit('updateFighters' , fighterArr);
		io.sockets.emit('updateSpawners' , spawnerArr);
		io.sockets.emit('updateEnemies'  , enemyArr);
		io.sockets.emit('updateObstacles', obstacleArr);
		io.sockets.emit('updateChests'   , chestArr);
		for (var i=0; i<spawnerArr.length; i++) {
			spawnerArr[i].spawn;
		}
		io.sockets.emit('updateGame', gameData)

	}

	console.log(client.id + " has connected to the server.\n");

	client.on('addChest', function(givenX, givenY)
	{
		var chestData = {x: givenX, y: givenY};
		chestArr.push(chestData);
		console.log(client.id + " added a chest at (" + givenX + ", " + givenY + ")\n");
	});

	client.on('addObstacle', function(givenX, givenY)
	{
		var obstacleData = {x: givenX, y: givenY};
		obstacleArr.push(obstacleData);
		console.log(client.id + " added an obstacle at (" + givenX + ", " + givenY + ")\n");
	});

	io.on('disconnect', function()
	{
		console.log(client.id + " has disconnected from the server.\n");
		for(var i = 0; i < fighterArr.length; i++){
            if(client.id == fighterArr[i].id){
                fighterArr.splice(i,1);
            }
        }
	});
}

io.on('connection', onSocketConnect);

init();

