// This is the code for the multi-fighter game.
var FPS = 30;

var fightersArr = [];

var turnSpeed = 1.57;
var acceleration = 1.753;
var maxSpeed = 2;
var friction = .5;

function Fighter(id, health, alive, x, y, swinging, currAnimation, spriteDebug, swordDebug, rot)
{
	this.id = id;
	this.health = health;
	this.alive = alive;
	this.x = x;
	this.y = y;
	this.swinging = swinging;
	this.currAnimation = currAnimation;
	this.spriteDebug = spriteDebug;
	this.swordDebug = swordDebug;
	this.rot = rot;
}

// Make sure that we have express library (?)
var express = require("express");


// Every FPS, call heartbeat()
setInterval(heartbeat, 1000/FPS);

// Tells the client to do something marked with 'heartbeat'
function heartbeat()
{

	io.sockets.emit('heartbeat', fightersArr);
}

// Make an "express" variable
var app = express();

// Open the server and listen on port '3000'
var server = app.listen(3000);

// What older contains the files that the server needs to use?
app.use(express.static("../public"));

// Make sure that we have socket.io
var socket = require("socket.io");

// Open a socket on the server we made
var io = socket(server); 

console.log("The server is running...\n");

// When someone connnects to the socket, do this:
io.sockets.on('connection', 
	function(socket)
	{
		console.log((socket.id).substring(0,3) + " has connected!\n");

		socket.on('start', 
			function(data)
			{
				var fighter = new Fighter(socket.id, data.health, data.alive, data.x, data.y, data.swinging, data.currAnimation, data.spriteDebug, data.swordDebug, data.rot);
				fightersArr.push(fighter);
			}
		);

		socket.on('update',
			function(data)
			{
				var fighter;

				for(var i = 0; i < fightersArr.length; i++)
				{
					if(socket.id == fightersArr[i].id)
					{
						fighter = fightersArr[i];
						fighter.health = data.health;
						fighter.alive = data.alive;
						fighter.x = data.x;
						fighter.y = data.y;
						fighter.swinging = data.swinging;
						fighter.currAnimation = data.currAnimation;
						fighter.spriteDebug = data.spriteDebug;
						fighter.swordDebug = data.swordDebug;
						fighter.rot = data.rot;
					}
				}
			}
		);

		// When someone disconnects, do this
		socket.on('disconnect',
			function()
			{
				console.log((socket.id).substring(0,3) + " has disconnected!\n");
				for(var i = 0; i < fightersArr.length; i++)
				{
					console.log(socket.id + ", " + fightersArr[i].id)
					if(socket.id == fightersArr[i].id)
					{
						console.log((socket.id).substring(0,3) + "was spliced");
				    	fightersArr.splice(i);
					}
				}
			}
		);
	}
);