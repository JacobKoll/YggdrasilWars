var spaceboys = [];

function SpaceBoy(x, y, rotation, id)
{
  this.x = x;
  this.y = y;
  this.sprite = createSprite(x,y);
  this.flail_animation = loadAnimation('../public/assets/spaceboy/flail/spaceboy0000.png', 'assets/spaceboy/flail/spaceboy0008.png');
  this.love_animation = loadAnimation('../public/assets/spaceboy/love/spacelove0000.png', 'assets/spaceboy/love/spacelove0008.png');
  this.sprite.addAnimation('flail', flail_animation);
  this.sprite.addAnimation('love', love_animation);
  this.id = id;
  this.rotation = rotation;
}

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

        var spaceboy = new SpaceBoy(data.x, data.y, data.rotation, socket.id);
        spaceboys.push(spaceboy);

      }
    );

      socket.on('update',
        function(data){
          var spaceboy;
          for(var i = 0; i < spaceboys.length; i++){
            if(socket.id == spaceboys[i].id){
              spaceboy = spaceboys[i];
              spaceboy.position.x = data.x;
              spaceboy.position.y = data.y;
              spaceboy.rotation = data.rotation;
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
