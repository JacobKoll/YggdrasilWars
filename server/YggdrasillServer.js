
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

app.use(express.static("../public"));

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
	for (var i=0; i<20; i++) {
		var a = Math.floor((Math.random())*2000/45)*(45);
		var b = Math.floor((Math.random())*1450/45)*(45);
		var obsData = {x: a, y: b};
		obstacleArr.push(obsData);
	}
	console.log("Obstacles Generated");

	/**
	 * Initialize chests
	 */
	 for (var i=0; i<4; i++) {
		var a = Math.floor((Math.random())*2000/45)*(45);
		var b = Math.floor((Math.random())*1450/45)*(45);
		var chestData = {x: a, y: b};
		chestArr.push(chestData);
	}
	console.log("Chests Generated");

	console.log("The Yygdrasill Wars server is open and running... \n");
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
		console.log(client.id + " added it's fighter\n");
	});

	/**
	 * Update all of the sprites to be rendered client-side for all clients.
	 */
	function heartbeat()
	{
		io.sockets.emit('updateFighters' , fighterArr);
		io.sockets.emit('updateSpawners' , spawnerArr);
		io.sockets.emit('updateEnemies'  , enemyArr);
		io.sockets.emit('updateObstacles', obstacleArr);
		io.sockets.emit('updateChests'   , chestArr);

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
	});
}

io.on('connection', onSocketConnect);

init();

