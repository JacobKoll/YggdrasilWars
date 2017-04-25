var mysql = require('mysql');
var express = require('express');
var socket = require('socket.io');
var objects = require('./mapobjectsServer');
var EnemySpawner = require('./enemyspawnerServer');
var Enemy = require('./enemyServer');
var enemyTypes = require('./enemyServerTypes');

var Fighter = require('./fighterServer');
var app = express();
var server = app.listen(3000);
var io = socket(server);
var shortid = require('short-id');

var timer = 0;

var db = mysql.createConnection({
  host: 'mysql.cs.iastate.edu',
  user: 'dbu309la1',
  password: 'OGFjM2RlNDYx',
  database: 'db309la1'
});

var chestArray = {};
var enemyArray = {};
var fighterArray = {};

var obstacleArray = [];
var spawnerArray = [];


db.connect(function(err){
  if (err) console.log(err);
});


app.use(express.static('../public'));

console.log("Starting YggdrasillServer...\n");
generateMap();
console.log("\nThe server is ready! \n");

setInterval(heartbeat, 1000/60);

function heartbeat()
{

	for(var i = 0; i < spawnerArray.length; i++)
	{
		let curr = spawnerArray[i];

		if(curr.spawn(timer))
		{
			let id = shortid.generate();
			let tempEnemy = new Enemy(curr.x, curr.y, curr.type, id);
			enemyArray[id] = tempEnemy;
			io.sockets.emit('addEnemy', tempEnemy);
		}
	}
	
	for(var key in enemyArray)
	{
		enemyArray[key].update(fighterArray);
	}

    io.sockets.emit('updateAllies', fighterArray);
	io.sockets.emit('updateEnemies', enemyArray);

	timer++;
}

io.sockets.on('connection', function(client)
{
    console.log('New Connection: ', client.id);

    client.on('disconnect', function()
    {
      console.log("client disconnected");
    });


   	client.on('requestMap', function()
   	{
   		client.emit('initObstacles', obstacleArray);
   		client.emit('initChests', chestArray);
   		client.emit('initSpawners', spawnerArray);	
   		client.emit('initEnemies', enemyArray);	
   	});

    client.on('requestAllies', function()
    {
        for(var key in fighterArray)
        {
            if(key != client.id)
            {
                client.emit('addAlly', fighterArray[key]);
            }
        }
    });

    client.on('initPlayer', function(data)
    {
      var fighter = new Fighter(data.x, data.y, data.rotation, data.type, client.id);
      console.log(fighter.id, fighter.x, fighter.y, fighter.rotation, fighter.type, fighter.isAlive, "\n");
      fighterArray[fighter.id] = fighter;
      client.broadcast.emit('addAlly', fighter);
    });

    client.on('updatePlayer', function(player)
    {
        fighterArray[client.id].x = player.x;
        fighterArray[client.id].y = player.y;
        fighterArray[client.id].rotation = player.rotation;
        fighterArray[client.id].isAttacking = player.isAttacking;
        fighterArray[client.id].isWalking = player.isWalking;
    });

    client.on('hurtEnemy', function(enemyID, damage)
    {

    	if(enemyArray[enemyID].health - damage <= 0)
    	{
    		console.log("Enemy ", enemyID, " has been defeated.");
    		delete enemyArray[enemyID];
    		client.emit('removeEnemy', enemyID);
    	}
    	else
    	{
	    	enemyArray[enemyID].health -= damage;
    	}
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

  	client.on('openChest', function(key){
  		chestArray[key].isOpen = true;
  		console.log("The chest ", key, "has been opened.");
  		io.sockets.emit('updateChest', key);
  	});

    client.on('addChest', function(newChestX, newChestY){
        var tempID = shortid.generate();
        chestArray[tempID] = new objects.chest(tempID, newChestX, newChestY);
        io.sockets.emit('placeNewChest', chestArray[tempID]);
  	});

    client.on('addObstacle', function(newObstacleX, newObstacleY){
        var newObject = new objects.obstacle(newObstacleX, newObstacleY, 1);
        obstacleArray.push(newObject);
        io.sockets.emit('placeNewObject', newObject);
  	});


    client.on('disconnect', function(){
      console.log("  ", client.id, " disconnected.");
      for(var key in fighterArray){
        if(client.id == fighterArray[key].id){
          delete fighterArray[key];
          io.sockets.emit('removeAlly', key);
        }
      }

    });
});

function generateMap()
{
	var i;
	var tempID;
	var minBounds = 30;
	var maxBounds = 3970;

	for(i = 0; i < 5; i++ )
	{
		tempID = shortid.generate();
		chestArray[tempID] = new objects.chest(tempID, randInt(minBounds, maxBounds), randInt(minBounds, maxBounds)); 
	}
	console.log("   Generated chests.");

	for(i = 0; i < 20; i++ )
	{
		obstacleArray.push(new objects.obstacle(randInt(minBounds, maxBounds), randInt(minBounds, maxBounds), rand(1.4, 2.1))); 
	}
	console.log("   Generated obstacles.");

	for(i = 0; i < 7; i++)
	{
		let chosenType;
		switch(randInt(0,3))
		{
			case 0:
				chosenType = enemyTypes.goblin;
				break;
			case 1:
				chosenType = enemyTypes.spider;
				break;
			case 2:
				chosenType = enemyTypes.bat;
				break;
			default:
				chosenType = enemyTypes.goblin;
				break;
		}

		spawnerArray.push(new EnemySpawner(randInt(minBounds, maxBounds), randInt(minBounds, maxBounds), chosenType, rand(.9, 1.5), randInt(10, 20)));
	}
	console.log("   Generated Spawners.");

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
