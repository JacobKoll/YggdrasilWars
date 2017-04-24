var mysql = require('mysql');
var express = require('express');
var socket = require('socket.io');
var objects = require('./mapobjectsServer');
var app = express();
var server = app.listen(3000);
var io = socket(server);
var shortid = require('short-id');

var db = mysql.createConnection({
  host: 'mysql.cs.iastate.edu',
  user: 'dbu309la1',
  password: 'OGFjM2RlNDYx',
  database: 'db309la1'
});

var chestArray = {};
// var pointsArray = {};
// var foodArray = {};

var obstacleArray = [];
// var wallsArray = [];
// var treeArray = [];


db.connect(function(err){
  if (err) console.log(err);
});

setInterval(heartbeat, 1000/60);

app.use(express.static('../public'));

console.log("Starting YggdrasillServer...\n");
generateMap();
console.log("\nThe server is ready! \n");

function heartbeat()
{

}



io.sockets.on('connection', function(client)
{

    console.log('New Connection ' + client.id);

    client.on('disconnect', function(){
      console.log("client disconnected");
    });

   	client.on('requestMap', function()
   	{
   		client.emit('initObstacles', obstacleArray);
   	});

    //client.on('openChest')


});

function generateMap()
{
	var i;
	var tempID;


	for(i = 0; i < 20; i++ )
	{
		tempID = shortid.generate();

		chestArray[tempID] = new objects.chest(tempID, randInt(200, 3800), randInt(200, 3800)); 
	}
	console.log("   Generated chests.");

	for(i = 0; i < 100; i++ )
	{
		tempID = shortid.generate();

		obstacleArray.push(new objects.obstacle(randInt(200, 3800), randInt(200, 3800), rand(1, 2))); 
	}
	console.log("   Generated obstacles.");
}

/* Random integer within a range */
function randInt(min, max)
{
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}

/* Random float within a range */
function rand(min, max)
{
	return Math.floor(Math.random() * (max - min)) + min;
}