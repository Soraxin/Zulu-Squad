function drawShip()
{
	context.fillStyle = "#ccc";
	context.fillRect(0, 0, canvas.width, canvas.height);
	context.drawImage(player, x, y);
}

player.onload = drawShip;
asteroids
function intersects(x1,y1,w1,h1,x2,y2,w2,h2)
{
	if(y2 + h2 < y1 || x2 + w2 < x1 || x2 > x1 + w1 || y2 > y1 + h1)
	{
		return false;
	}
	return true;
}

var spawnTimer = 0;

var splashTimer = 3;
function runSplash(deltaTime)
{
    splashTimer -= deltaTime;
    if(splashTimer <= 0)
    {
        gameState = STATE_GAME;
        return;
    }
    
    context.fillStyle = "#7FE81C";
    context.font="84px Imapct";
    context.fillText("Zulu Squad", 270, 340);
}

function runGame(deltaTime)
{
	scrollingTime += scrollingSpeed * deltaTime;
	
	for(var y=0; y<backgroundCountHeight; y++)
	{
		var yPos = y * 32 + scrollingTime;
		var countWrapping = 0;
		while(yPos > SCREEN_HEIGHT)
		{
			yPos -= SCREEN_HEIGHT;
			++countWrapping;
		}
		yPos -= countWrapping * 32;
		
		for(var x=0; x<backgroundCountWidth; x++)
		{
			context.drawImage(background[y][x], x*32,yPos)
		}
	}
	
	context.fillStyle = "#7FE81C";
    context.font="30px Imapct";
    context.fillText("Score", 10, 30);
	
	context.fillStyle = "#7FE81C";
    context.font="30px Imapct";
    context.fillText(gameScore, 30, 60);
	
    if(shootTimer > 0) 
        shootTimer -= 100;
    
    for(var i=0; i<bullets.length; i++)
    {
        bullets[i].x += bullets[i].velocityX;
        bullets[i].y += bullets[i].velocityY;
    }
    
    for(var i=0; i<bullets.length; i++) 
    {
        if(bullets[i].x < -bullets[i].width ||
           bullets[i].x > SCREEN_WIDTH ||
           bullets[i].y < -bullets[i].height ||
           bullets[i].y > SCREEN_HEIGHT) 
            {
                bullets.splice(i,0.1);
                break;
            }
    }
    
    for(var i=0; i<bullets.length; i++)
    {
        context.drawImage(bullets[i].image,
                          bullets[i].x - bullets[i].width/2,
                          bullets[i].y - bullets[i].height/2);
    }
 
    for (var i=0; i<asteroids.length; i++)
	{
		asteroids[i].x = asteroids[i].x + asteroids[i].velocityX;
		asteroids[i].y = asteroids[i].y + asteroids[i].velocityY;
	}
	
	for(var i=0; i<asteroids.length; i++)
	{
		context.drawImage(asteroids[i].image, asteroids[i].x, asteroids[i].y);
	}
	
	var playerHalfWidth = player.width/2
	var playerHalfHeight = player.height/2
	for(var i = 0; i < asteroids.length; ++i)
	{
		var asteroid = asteroids[i];
		var asteroidHalfWidth = asteroid.width/2;
		var asteroidHalfHeight = asteroid.height/2;
		if(intersects (player.x - playerHalfWidth,
					   player.y - playerHalfHeight,
					   player.width, player.height,
					   asteroid.x, asteroid.y,
					   asteroid.width, asteroid.height))
		{
			player.isDead = true;
			gameState = STATE_GAMEOVER;
			asteroids.splice(i, 1);
			break;
		}
	}
	
	spawnTimer -= deltaTime;
	if(spawnTimer <= 0)
	{
		spawnTimer = 0.05;
		spawnAsteroid();
	}
	
    var s = Math.sin(player.rotation);
    var c = Math.cos(player.rotation);
    
    var xDir = (player.directionX * c) - (player.directionY * s);
    var yDir = (player.directionX * s) + (player.directionY * c);
    var xVel = xDir * PLAYER_SPEED;
    var yVel = yDir * PLAYER_SPEED;
    
    player.x += xVel;
    player.y += yVel;
    
    player.rotation += player.angularDirection * PLAYER_TURN_SPEED;
    
    context.save();
        context.translate(player.x, player.y);
        context.drawImage(
            player.image, -player.width/2, -player.height/2);
    context.restore();
	
    
    for(var i=0; i<asteroids.length; i++)
    {
        for(var j=0; j<bullets.length; j++)
        {
            if(intersects(
                bullets[j].x, bullets[j].y,
                bullets[j].width, bullets[j].height,
                asteroids[i].x, asteroids[i].y,
                asteroids[i].width, asteroids[i].height) == true)
            {
				gameScore = gameScore + 100
                asteroids.splice(i, 1);
                bullets.splice(j, 1);
                break;
            }
        }
    }
}

function runGameOver(deltaTime)
{
	context.fillStyle = "#7FE81C";
    context.font="54px Imapct";
    context.fillText("GAME OVER!", 350, 300)
	
	context.fillStyle = "#7FE81C";
    context.font="35px Imapct";
    context.fillText("Press ENTER to play again", 320, 380)
	
	context.fillStyle = "#7FE81C";
    context.font="35px Imapct";
    context.fillText("Your score - ", 400, 460)
	
	context.fillStyle = "#7FE81C";
    context.font="35px Imapct";
    context.fillText(gameScore, 580, 460);
}

function run()
{
    context.fillStyle = "#202020"
	context.fillRect(0, 0, canvas.width, canvas.height);
	
	var deltaTime = getDeltaTime();
    
    switch(gameState)
    {
        case STATE_SPLASH:
            runSplash(deltaTime);
            break;
        case STATE_GAME:
            runGame(deltaTime);
            break;
        case STATE_GAMEOVER:
            runGameOver(deltaTime);
            break;
    }
}
//---------------------------DELTA TIME-----------------------------------

var startFrameMillis = Date.now();
var endFrameMillis = Date.now();
function getDeltaTime()
{
	endFrameMillis = startFrameMillis;
	startFrameMillis = Date.now();
	var deltaTime = (startFrameMillis - endFrameMillis) * 0.001;
	if (deltaTime > 1) 
	{
			deltaTime = 1;
	}
	return deltaTime;
}

//----------------------------REFRESH RATE CODE----------------------------

(function(){
	var onEachFrame;
	if (window.requestAnimationFrame){
	onEachFrame = function(cb){
		var _cb = function(){cb(); window.requestAnimationFrame(_cb);}
	_cb();
	};
} else if (window.mozRequestAnimationFrame){
	onEachFrame = function(cb){
		var _cb = function(){ cb(); window.mozRequestAnoimationFrame(_cb);}
	_cb();
	};
}else{
	onEachFrame = function(cb){
		setInterval(cb, 1000/60);
	}
}
	window.onEachFrame = onEachFrame;
})();

window.onEachFrame(run);