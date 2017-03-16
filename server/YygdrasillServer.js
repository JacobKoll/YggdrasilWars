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

var db = mysql.createConnection({
  host: 'mysql.cs.iastate.edu',
  user: 'dbu309la1',
  password: 'OGFjM2RlNDYx',
  database: 'db309la1'
});


app.use(express.static("../public"));


console.log("The server is running...\n");


function updateAll()
{
	for (var i = 0; i < spawnerArr.length; i++) {
		spawnerArr[i].spawn();
		spawnerArr[i].updateAll(fighterArr);
	}
}


// function Fighter(health, x, y, walkAnimation, swingAnimation, deathAnimation, idleAnimation)
// {
// 	this.health = health;// Health of the Fighter
// 	this.x = x;// x position
// 	this.y = y;// y position
// 	/* Initialize the animations */
// 	this.walkAnimation = walkAnimation;// Walk animations
// 	this.swingAnimation = swingAnimation; // Attack animation
// 	this.deathAnimation = deathAnimation; // Death animation
// 	this.idleAnimation = idleAnimation; // Animation for when the player is not moving
// }
//
// function heartbeat()
// {
// 	io.sockets.emit('heartbeat', fighterArr);
// }


io.sockets.on('connection',function(socket){

	console.log((socket.id).substring(0,5) + " has connected!\n");

	// setInterval(heartbeat, 1000/FPS);
	//
	// function heartbeat()
	// {
	// 	socket.broadcast.emit('heartbeat', fighterArr);
	// }
	//
	// 	socket.on('start',function(data){
	// 	console.log((socket.id).substring(0,3) + " has connected!\n");
	// 	var fighter = new Fighter(data.health,data.x, data.y, data.walkAnimation, data.swingAnimation, data.deathAnimation, data.idleAnimation);
	// 	fighterArr.push(fighter);
	// });

	/* Checks whether the data is a UserName in the database */
	socket.on('checkUserDB',function(data){
		db.query('select UserName from Login where UserName = ?', data.UserName, function(err, result){
			if(err){
				console.error(err);
				return;
			}
			else if(result[0] == null){
				data = false;
			}
			io.sockets.emit('checkedUserDB', data);

		});
	});
	/* Checks whether the data is equivalent to the pass where the data is equal to the UserName in the database */
	socket.on('checkDB',function(data){
		db.query('select Pass from Login where UserName = ?', data.UserName, function(err, result){
			if(err){
				console.error(err);
				return;
			}
			else if(result[0] == null || result[0].Pass != data.Pass){
				data = false;
			}
			io.sockets.emit('checkedDB', data);

		});
	});
	/* Inserts the data into the database */
	socket.on('insertDB',function(data){
		var query = db.query('insert into Login set ?', data, function(err, result){
			if(err){
				console.error(err);
				return;
			}
			console.error(result);
		});
	});


	// socket.on('update',function(data){
	// 	var fighter;
	//
	// 	for(var i = 0; i < fighterArr.length; i++){
	//
	// 		if(socket.id == fighterArr[i].id){
	// 			fighter = fighterArr[i];
	// 			fighter.health = data.health;
	// 			fighter.alive = data.alive;
	// 			fighter.x = data.x;
	// 			fighter.y = data.y;
	// 			fighter.swinging = data.swinging;
	// 			fighter.currAnimation = data.currAnimation;
	// 			fighter.spriteDebug = data.spriteDebug;
	// 			fighter.swordDebug = data.swordDebug;
	// 			fighter.rot = data.rot;
	// 		}
	// 	}
	// });

	// When someone disconnects, do this
	socket.on('disconnect',function(){
		console.log((socket.id).substring(0,5) + " has disconnected!\n");
		// for(var i = 0; i < fighterArr.length; i++){
		//
		// 	if(socket.id == fighterArr[i].id){
		// 			console.log((socket.id).substring(0,3) + " was spliced.");
		//     	fighterArr.splice(i,1);
		// 	}
		// }
	});
});
