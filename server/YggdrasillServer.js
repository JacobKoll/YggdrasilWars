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

setInterval(heartbeat, 1000/60);

app.use(express.static('../public'));



function heartbeat(){

}

console.log("My socket server is running\n");


io.sockets.on('connection', function(socket){

    console.log('New Connection ' + socket.id);


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

  	socket.on('insertDB',function(data){
  		var query = db.query('insert into Login set ?', data, function(err, result){
  			if(err){
  				console.error(err);
  				return;
  			}
  			console.error(result);
  		});
  	});




    socket.on('disconnect', function(){
      console.log("socket disconnected");
    });
});
