
var mysql = require('mysql');
var express = require('express');
var socket = require('socket.io');

var app = express();
var server = app.listen(3000);
var io = socket(server);

var db = mysql.createConnection({
  host: 'mysql.cs.iastate.edu',
  user: 'dbu309la1',
  password: 'OGFjM2RlNDYx',
  database: 'db309la1'
});

db.connect(function(err){
  if (err) console.log(err);
});

var FPS = 24;

app.use(express.static("../public"));


/**
 * Initializes everything that the server will need.
 */
function init()
{
	fighterArr = [];
	spawnerArr = [];
	enemyArr = [];

	/**
	 * Initialize obstacles3
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
		var chestData = {x: a, y: b, isOpen: false};
		chestArr.push(chestData);
	}
	console.log("Chests Generated");

	/**
	 * Initialize spawners
	 */
	 for (i=0; i<numSpawners; i++) {
	 	spawnerArr[i] = new EnemySpawner();
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
		console.log(client.id + " added it's fighter\n");
	});

	/**
	 * Update all of the sprites to be rendered client-side for all clients.
	 */
	function heartbeat()
	{
		/* Fighter data */
		var gameData = {
			chests: chestArr
		};
		io.sockets.emit('updateFighters' , fighterArr);
		io.sockets.emit('updateSpawners' , spawnerArr);
		io.sockets.emit('updateEnemies'  , enemyArr);
		io.sockets.emit('updateObstacles', obstacleArr);
		io.sockets.emit('updateChests'   , chestArr);
		for (var i=0; i<spawnerArr.length; i++) {
			spawnerArr[i].spawn;
		}
		io.sockets.emit('updateGame', gameData);

	}

	client.on('updateClient', function(gameData) {
		for (var i=0; i<chestArr.length; i++) {
			chestArr[i].isOpen = gameData.chests[i];
		}
	});

	console.log(client.id + " has connected to the server.\n");

	client.on('addChest', function(givenX, givenY)
	{
		var chestData = {x: givenX, y: givenY, isOpen: false};
		chestArr.push(chestData);
		io.sockets.emit('newChest', chestData);
		console.log(client.id + " added a chest at (" + givenX + ", " + givenY + ")\n");
	});

	client.on('addObstacle', function(givenX, givenY)
	{
		var obstacleData = {x: givenX, y: givenY};
		obstacleArr.push(obstacleData);
		console.log(client.id + " added an obstacle at (" + givenX + ", " + givenY + ")\n");
	});


	client.on('checkUserDB',function(data){
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

	client.on('checkDB',function(data){

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

	client.on('insertDB',function(data){
		var query = db.query('insert into Login set ?', data, function(err, result){
			if(err){
				console.error(err);
				return;
			}
			console.error(result);
		});
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
