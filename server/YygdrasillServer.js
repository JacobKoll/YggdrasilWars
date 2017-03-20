var mysql = require('mysql');

var express = require("express");

var socket = require("socket.io");

var app = express();

var server = app.listen(3000);

var io = socket(server);

var FPS = 24;

var fighterArr = [];
var spawnerArr = [];
var enemyArr = [];
var obstacleArr = [];
var chestArr = [];

app.use(express.static("../public"));

console.log("The server is running...\n");


