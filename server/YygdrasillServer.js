
var FPS = 30;

var express = require("express");
var app = express();
app.use(express.static("../public"));

var server = app.listen(3000);

var socket = require("socket.io");
var io = socket(server);

var fighterArr;
var spawnerArr;
var enemyArr;
var obstacleArr;
var chestArr;


// /**
//  * Initializes everything that the server will need.
//  */
// function init()
// {
// 	fighterArr = [];

// 	spawnerArr = [];
// 	enemyArr = [];

// 	obstacleArr = [];
// 	chestArr = [];

// 	console.log("The Yygdrasill Wars server is open and running... \n");
// }

// /**
//  * This handles the events that occur whenever someone joins the server.
//  * @param  {socket} client [The socket that the client uses to connect to the server]
//  */

// 
// function onSocketConnect(client)
// {

// 	setInterval(heartbeat, 1000/FPS);

// 	/**
// 	 * Update all of the sprites to be rendered client-side for all clients.
// 	 */
// 	function heartbeat()
// 	{
// 		io.sockets.emit('updateFighters' , fighterArr);
// 		io.sockets.emit('updateSpawners' , spawnerArr);
// 		io.sockets.emit('updateEnemies'  , enemyArr);
// 		io.sockets.emit('updateObstacles', obstacleArr);
// 		io.sockets.emit('updateChests'   , chestArr);
// 	}

// 	console.log(client.id + " has connected to the server.\n");

// 	/* When connected, add the client's fighter to te array. */
// 	client.on('start', function(newFighter)
// 	{
// 		fighterArr.push(newFighter);
// 		console.log(client.id + " added it's fighter\n")
// 	});
	
// 	io.on('disconnect', function()
// 	{
// 		console.log(client.id + " has disconnected from the server.\n");

// 	});
// }

// function update()
// {

// }

// io.on('connection', onSocketConnect);


// /* Activate the initialization of the server. */
// init();



