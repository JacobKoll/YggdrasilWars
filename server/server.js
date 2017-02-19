var ships = [];

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

var express = require('express');

setInterval(heartbeat, 1000/60);

function heartbeat(){
  io.sockets.emit('heartbeat', ships);
}

var app = express();
var server = app.listen(3000);

app.use(express.static('../public'));

console.log("My socket server is running\n");

var socket = require('socket.io');
var io = socket(server);

io.sockets.on('connection',

  function(socket){

    console.log('New Connection ' + socket.id);

    socket.on('start',
      function(data){
        console.log(socket.id + " " + data.x + " " + data.y + "\n");

        var ship = new Ship(socket.id, data.x, data.y, data.r, data.heading, data.rotation, data.red, data.blue);
        ships.push(ship);

      }
    );

      socket.on('update',
        function(data){
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
        }
      );

        socket.on('disconnect',
          function(){
            console.log("client disconnected");
            for(var i = 0; i < ships.length; i++){
              if(socket.id == ships[i].id){
                ships.splice(i,1);
              }
            }
          }
        );
}
);
