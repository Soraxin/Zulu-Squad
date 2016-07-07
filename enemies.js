var asteroids = [];

function rand(floor, ceil)
{
	return Math.floor((Math.random()* (ceil-floor)) +floor);
}

function spawnAsteroid()
{
	var type = rand(0, 3);
	
	var asteroid = {};
	
	asteroid.image = document.createElement("img");
	asteroid.image.src = "enemy.png";
	asteroid.width = 69;
	asteroid.height = 75;
	
	var x = SCREEN_WIDTH/2;
	var y = SCREEN_HEIGHT/2;
	
	var dirX = rand (-10,10);
	var dirY = rand (-7,-5);
	
	var magnitude = (dirX * dirX) + (dirY * dirY);
	if(magnitude != 0)
	{
		var oneOverMag = 1 / Math.sqrt(magnitude);
		dirX *= oneOverMag;
		dirY *= oneOverMag;
	}
	
	var movX = dirX + (0.5 * SCREEN_WIDTH);
	var movY = dirY * (1 * SCREEN_HEIGHT);
	
	asteroid.x = 10 + movX;
	asteroid.y = movY;
	
	asteroid.velocityX = -dirX / (0.1*ASTEROID_SPEED);
	asteroid.velocityY = -dirY * ASTEROID_SPEED;
	
	asteroids.push(asteroid);
}