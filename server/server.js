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


  // connection.connect();
  //
  // var Login = {
  //   UserName: "Jacob",
  //   Pass: "Koll"
  // };
  //
  //
  // var query = connection.query('insert into Login set ?', Login, function(err, result){
  //   if(err){
  //     console.error(err);
  //     return;
  //   }
  //   console.error(result);
  // });


var ships = [];
var data = true;



function Ship(id, x, y, r, heading, rotation, red, blue){
  this.id = id;
  this.x = x;
  this.y = y;
  this.r = r;
  this.heading = heading;
  this.rotation = rotation;
  this.red = red;
  this.blue = blue;
}

function heartbeat(){
  io.sockets.emit('heartbeat', ships);
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

    socket.on('start',function(data){
      console.log(socket.id + " " + data.x + " " + data.y + "\n");

      var ship = new Ship(socket.id, data.x, data.y, data.r, data.heading, data.rotation, data.red, data.blue);
      ships.push(ship);
    });

    socket.on('update', function(data){
      var ship;
      for(var i = 0; i < ships.length; i++){
        if(socket.id == ships[i].id){
          ship = ships[i];
          ship.x = data.x;
          ship.y = data.y;
          ship.r = data.r;
          ship.heading = data.heading;
          ship.rotation = data.rotation;
          ship.red = data.red;
          ship.blue = data.blue;
        }
      }
    });

    socket.on('disconnect', function(){
      console.log("client disconnected");

      for(var i = 0; i < ships.length; i++){
        if(socket.id == ships[i].id){
          ships.splice(i,1);
        }
      }
    });
}
);
