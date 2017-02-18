var img;
function preload() {
	img = loadImage('water.png')
}

function setup() {
	var myCanvas = createCanvas(600,400);
	myCanvas.parent('myContainer');
	line(15, 25, 70, 90);
	img(img, 0, 0);

	drawingContext.shadowOffsetX = 5;
    drawingContext.shadowOffsetY = -5;
    drawingContext.shadowBlur = 10;
    drawingContext.shadowColor = "black";
    background(200);
    ellipse(width/2, height/2, 50, 50);
}
/*
	 Parent tile type -- contains common properties of tiles 
	class generic_tile {
		//this.y_pos = y_pos;
		//this.x_pos = x_pos;
		constructor(type, src_img, hardness) {
			this.type = type;
			this.src_img = src_img;
			this.hardness = hardness;
			occupied = false;
		}

		is_occupied() {
			return occupied==true;
		}

		set_occupied(value) {
			occupied = value;
		}
	}

	class grass_tile extends generic_tile {
		constructor() {
			super("grass", "grass.png", 0);
		}
	}
	class sand_tile extends generic_tile {
		constructor() {
			super("sand", "sand.png", 10);
		}
	}
	class water_tile extends generic_tile {
		constructor() {
			super("water", "water.png", Infinity);
		}
	}
	class forest_tile extends generic_tile {
		constructor() {
			super("forest", "forest.png", 25);
		}
	}
	class mountain_tile extends generic_tile {
		constructor() {
			super("mountain", "mountain.png", Infinity);
		}
	}

	var lines; 

	var tiles = [[]];

	function tile(x, y, width, height, src)
	{
		this.x =x;
		this.y =y;
		this.width = width;
		this.height = height;
		this.src = src;

		this.image = new Image();

		this.update = function()
		{
			ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
		}
	}

	function start()
	{
		myGameArea.start();
		draw_map();
	}

	var myGameArea = {

		canvas: document.createElement("canvas"),

		start: function(){
			this.canvas.width = 150;
			this.canvas.height = 150;
			this.context = this.canvas.getContext("2d");
			this.context.imageSmoothingEnabled = false;
			document.body.insertBefore(this.canvas, document.body.childNodes[0]);
		}
	}

	document.getElementById('filechoice').onchange = function(){

			var file = this.files[0];

			var reader = new FileReader();

			lines = reader.readAsText(file);

		reader.onload = function(progressEvent){
			// Entire file

	    	// By lines
	    	lines = this.result.split('\n');
	    	console.log(lines);
	    	console.log(Array.isArray(lines));

	    	for(line = 0; line < lines.length; line++){
	      		lines[line] = lines[line].split(""); 
	      		//document.getElementById('demo')
	    	}


		};
		console.log(lines)

		start();

	};

	function draw_map() {
		for (y=0; y< lines.length; y++) {
			for (x=0; x<lines[0].length; x++) {
				switch(lines[y][x])
				{
					case 'G':
						tiles.push(new tile(x*30, y*30, 30, 30, "grass.png"));
						break;
					case 'D':
						tiles.push(new tile(x*30, y*30, 30, 30, "dirt.png"));
						break;
					case 'W':
						tiles.push(new tile(x*30, y*30, 30, 30, "water.png"));
						break;
				}
				console.log(lines[y][x]);
			}
		}
	}

	function updateGameArea()
	{
		setTimeout(function(){
				requestAnimationFrame(updateGameArea)
		}, 1000/ 12);

		for(i = 0; i < tile.length; i++)
		{
			tiles[i].update();
		}
	}*/