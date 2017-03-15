
var FPS = 30;

var express = require("express");
var app = express();
app.use(express.static("../public"));

var server = app.listen(3000);

var socket = require("socket.io");
var io = socket(server);


// var fighterArr;
// var spawnerArr;
// var enemyArr;
// var obstacleArr;
// var chestArr;



/**
 * This is reference code for the server. This will be turned into the server code soon.
 */
// var mysql = require('mysql');
//
// var express = require("express");
//
// var socket = require("socket.io");
//
// var app = express();
//
// var server = app.listen(3000);
//
// var io = socket(server);
//
// var FPS = 24;
//
// var fightersArr = [];
//
// var db = mysql.createConnection({
//   host: 'mysql.cs.iastate.edu',
//   user: 'dbu309la1',
//   password: 'OGFjM2RlNDYx',
//   database: 'db309la1'
// });
//
//
// app.use(express.static("../public"));
//
//
// console.log("The server is running...\n");
//
//
// function Fighter(id, health, alive, x, y, swinging, currAnimation, spriteDebug, swordDebug, rot)
// {
// 	this.id = id;
// 	this.health = health;
// 	this.alive = alive;
// 	this.x = x;
// 	this.y = y;
// 	this.swinging = swinging;
// 	this.currAnimation = currAnimation;
// 	this.spriteDebug = spriteDebug;
// 	this.swordDebug = swordDebug;
// 	this.rot = rot;
// }
//
// // Tells the client to do something marked with 'heartbeat'
// // function heartbeat()
// // {
// // 	io.sockets.emit('heartbeat', fightersArr);
// // }
//
//
// io.sockets.on('connection',function(socket){
//
// 	setInterval(heartbeat, 1000/FPS);
//
// 	function heartbeat()
// 	{
// 		socket.broadcast.emit('heartbeat', fightersArr);
// 	}
//
// 	socket.on('checkUserDB',function(data){
// 		db.query('select UserName from Login where UserName = ?', data.UserName, function(err, result){
// 			if(err){
// 				console.error(err);
// 				return;
// 			}
// 			else if(result[0] == null){
// 				data = false;
// 			}
// 			io.sockets.emit('checkedUserDB', data);
//
// 		});
// 	});
//
// 	socket.on('checkDB',function(data){
// 		db.query('select Pass from Login where UserName = ?', data.UserName, function(err, result){
// 			if(err){
// 				console.error(err);
// 				return;
// 			}
// 			else if(result[0] == null || result[0].Pass != data.Pass){
// 				data = false;
// 			}
// 			io.sockets.emit('checkedDB', data);
//
// 		});
// 	});
//
// 	socket.on('insertDB',function(data){
// 		var query = db.query('insert into Login set ?', data, function(err, result){
// 			if(err){
// 				console.error(err);
// 				return;
// 			}
// 			console.error(result);
// 		});
// 	});
//
// 	socket.on('start',function(data){
// 		console.log((socket.id).substring(0,3) + " has connected!\n");
// 		var fighter = new Fighter(socket.id, data.health, data.alive, data.x, data.y, data.swinging, data.currAnimation, data.spriteDebug, data.swordDebug, data.rot);
// 		fightersArr.push(fighter);
// 	});
//
//
// 	socket.on('update',function(data){
// 		var fighter;
//
// 		for(var i = 0; i < fightersArr.length; i++){
//
// 			if(socket.id == fightersArr[i].id){
// 				fighter = fightersArr[i];
// 				fighter.health = data.health;
// 				fighter.alive = data.alive;
// 				fighter.x = data.x;
// 				fighter.y = data.y;
// 				fighter.swinging = data.swinging;
// 				fighter.currAnimation = data.currAnimation;
// 				fighter.spriteDebug = data.spriteDebug;
// 				fighter.swordDebug = data.swordDebug;
// 				fighter.rot = data.rot;
// 			}
// 		}
// 	});
//
// 	// When someone disconnects, do this
// 	socket.on('disconnect',function(){
// 		console.log((socket.id).substring(0,3) + " has disconnected!\n");
// 		for(var i = 0; i < fightersArr.length; i++){
//
// 			if(socket.id == fightersArr[i].id){
// 				// console.log((socket.id).substring(0,3) + " was spliced.");
// 		    	fightersArr.splice(i,1);
// 			}
// 		}
// 	});
// });




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
