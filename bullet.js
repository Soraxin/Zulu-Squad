var bullets = [];

function playerShoot()
{
    var bullet = {
        image: document.createElement("img"),
        x: player.x,
        y: player.y,
        width: 10,
        height: 10,
        velocityX: 0,
        velocityY: 0
    }
    
    bullet.image.src = "custom_bullet_small.png";
    
    var velX = 0;
    var velY = -1;
    
    var s = Math.sin(player.rotation);
    var c = Math.cos(player.rotation);
    
    var xVel = (velX * c) - (velY * s);
    var yVel = (velX * s) + (velY * c);
    
    bullet.velocityX = xVel * BULLET_SPEED;
    bullet.velocityY = yVel * BULLET_SPEED;
    
    bullets.push(bullet)
    
}