var spaceboys = [];



var express = require('express');


setInterval(heartbeat, 1000/60);

function heartbeat(){
  io.sockets.emit('heartbeat', spaceboys);
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

        var spaceboy = new Ship(socket.id, data.x, data.y, data.r, data.heading, data.rotation, data.red, data.blue);
        spaceboys.push(spaceboy);

      }
    );

      socket.on('update',
        function(data){
          var spaceboy;
          for(var i = 0; i < spaceboys.length; i++){
            if(socket.id == spaceboys[i].id){
              spaceboy = spaceboys[i];
              spaceboy.x = data.x;
              spaceboy.y = data.y;
              spaceboy.r = data.r;
              spaceboy.heading = data.heading;
              spaceboy.rotation = data.rotation;
              spaceboy.red = data.red;
              spaceboy.blue = data.blue;
            }
          }
        }
      );

        socket.on('disconnect',
          function(){
            console.log("client disconnected");
            for(var i = 0; i < spaceboys.length; i++){
              if(socket.id == spaceboys[i].id){
                spaceboys.splice(i,1);
              }
            }
          }
        );
}
);
