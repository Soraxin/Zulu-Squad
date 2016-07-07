var space = document.createElement("img");

space.src = "ocean.png";

var background = [];
var scrollingSpeed = 20.0;
var scrollingTime = 0.0;
var backgroundCountWidth = 30;
var backgroundCountHeight = 32;

for(var y=0; y<backgroundCountHeight; y++)
	{
		background[y] = [];
		for(var x=0; x<backgroundCountWidth; x++)
			background[y][x] = space
	}