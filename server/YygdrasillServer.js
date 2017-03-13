var express = require("express");
var app = express();

var server = app.listen(3000);

app.use(express.static("../public"));

var socket = require("socket.io");
var io = socket(server);
console.log("The Yygdrasill Wars server is open and running... \n");

var fighterArr = [];

var spawnerArr = [];
var enemyArr = [];

var obstacleArr = [];
var chestArr = [];


/* Update all of the sprites to be rendered client-side for all clients. */
function heartbeat()
{
	io.sockets.emit('updateFighters' , fighterArr);
	io.sockets.emit('updateSpawners' , spawnerArr);
	io.sockets.emit('updateEnemies'  , enemyArr);
	io.sockets.emit('updateObstacles', obstacleArr);
	io.sockets.emit('updateChests'   , chestArr);
}




