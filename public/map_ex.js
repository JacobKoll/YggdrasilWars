var img;
var canvas;
// var socket;
// var lines;
// var obstacle;
var obstacles = [];
// var tile;
// var tiles = [];

function preload() {
	lines = loadStrings('data/testmap1.txt');
}

function setup() {
	img = loadImage('data/adventure_background.jpg');
	canvas = createCanvas(706, 706);
	frameRate(30);
    
    //socket = io.connect('http://proj-309-la-1.cs.iastate.edu:3000');
    socket = io.connect("http://localhost:3000");
    for (var i=0; i<10; i++) {
    	obstacles[i] = {x: random(607), y: random(607), width: 50, height: 50};
    }
    // obstacle = new Obstacle()

    // socket.emit('start', tiles);
    // socket.on('heartbeat', function(data) {
    // 	tiles = data;
    // });

    // console.log(tiles);
}

function draw() {
	canvas.background(img);
	for (var i=0; i<obstacles.length; i++) {
		rect(obstacles[i].x, obstacles[i].y, obstacles[i].width, obstacles[i].height);
	}
	update();
}

function update() {
	for (var i=0; i<obstacles.length; i++) {
		obstacles[i].x += random(-5, 5);
		obstacles[i].y += random(-5, 5);
	}
}



// function Obstacle(id, x, y, width, height) {
// 	this.x = x;
// 	this.y = y;
// 	this.width = width;
// 	this.height = height;
// 	this.id = id;
// }

// function makeTilesArray() {
// 	for (var i=0; i < lines.length; i++) {
// 		tiles[i] = [];
// 		for (var j = 0; j < lines[i].length; j++) {
// 			var t;
// 			if (lines[i][j] == "G") {
// 				t = new Grass_tile(30*i, 30*j);
// 			}
// 			else if (lines[i][j] == "W") {
// 				t = new Water_tile(30*i, 30*j);
// 			}
// 			else {
// 				t = new Dirt_tile(30*i, 30*j);
// 			}
// 			t.draw();
// 			tiles[i].push(t);
// 		}
// 	}
// 	console.log(lines);
// }

// function draw() {
// 	background(0);
// 	for (var i = 0; i < tiles.length; i++) {
// 		tiles[i].draw();
// 	}
// }

// class generic_tile {
// 	constructor(type, src_img, hardness, x, y) {
// 		this.type = type;
// 		this.src_img = src_img;
// 		this.hardness = hardness;
// 		this.y = y;
// 		this.x = x;
// 		this.occupied = false;
// 	}

// 	is_occupied() {
// 		return occupied==true;
// 	}

// 	set_occupied(value) {
// 		this.occupied = value;
// 	}

// 	draw() {
// 		image(src_img, x, y);
// 	}
// }

// class Grass_tile extends generic_tile {
// 	constructor(x, y) {
// 		super("grass", "grass.png", 0, x, y);
// 	}
// }
// class Dirt_tile extends generic_tile {
// 	constructor(x, y) {
// 		super("dirt", "dirt.png", 10, x, y);
// 	}
// }
// class Water_tile extends generic_tile {
// 	constructor(x, y) {
// 		super("water", "water.png", Infinity, x, y);
// 	}
// }

	// function updateGameArea()
	// {
	// 	setTimeout(function(){
	// 			requestAnimationFrame(updateGameArea)
	// 	}, 1000/ 12);

	// 	for(i = 0; i < tile.length; i++)
	// 	{
	// 		tiles[i].update();
	// 	}
	// }