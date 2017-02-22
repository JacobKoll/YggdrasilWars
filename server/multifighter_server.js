// This is the code for the multi-fighter game.
var _FPS = 30;

// Make sure that we have express library (?)
var express = require("express");


// Every FPS, call heartbeat()
setInterval(heartbeat, 1000/_FPS);

// Tells the client to do something marked with 'heartbeat'
function heartbeat()
{
	io.sockets.emit('heartbeat')
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

// When someone connnects to the socket, do this:
io.sockets.on('connection',
	function(socket)
	{
		console.log('New Connection ' + socket.id);

		socket.on('start', 
			function(data)
			{
				console.log(socket.id + " " + data.x + " " + data.y + "\n");
			}
		);

		socket.on('update',
			function(data)
			{
			}
		);

		// When someone disconnects, do this
		socket.on('disconnect',
			function()
			{
				console.log("client disconnected");
			}
		);
	}
);