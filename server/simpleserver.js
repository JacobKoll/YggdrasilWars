/* This is just to host a server that does nothing to allow local tests to use pictures. */
var socket = require('socket.io');
var express = require('express');

var app = express();
var server = app.listen(3000, '127.0.0.1');
var io = socket(server);

app.use(express.static('../public'));

//console.log("Simple Server is Running!");
//Look!