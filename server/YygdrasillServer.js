
var FPS = 30;

var express = require("express");
var app = express();
app.use(express.static("../public"));

var server = app.listen(3000);

var socket = require("socket.io");
var io = socket(server);

var fighterArr = [];
var spawnerArr = [];
var enemyArr = [];
var obstacleArr = [];
var chestArr = [];

console.log("Server is runnning...");

function updateAll()
{
	for (var i = 0; i < spawnerArr.length; i++) {
		spawnerArr[i].spawn();
		spawnerArr[i].updateAll(fighterArr);
	}
}



