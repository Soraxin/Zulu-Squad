window.addEventListener('keydown', function(evt) { onKeyDown(evt); }, false);
window.addEventListener('keyup', function(evt) { onKeyUp(evt); }, false);

var shootTimer = 0
function onKeyDown(event)
{
	if(event.keyCode == 38)
		{
			player.directionY = -1;
		}
    if(event.keyCode == 40)
        {
			player.directionY = 1;
        }
    if(event.keyCode == 39)
        {
			player.directionX = 1;
        }
    if(event.keyCode == 37)
        {
			player.directionX = -1;
        }
    if(event.keyCode == 32 && shootTimer <= 0)
        {
            shootTimer += 0.3;
            playerShoot();
        }
}

function onKeyUp(event)
{
    if(event.keyCode == 38)
	   {
			player.directionY = 0;
	   }
    if(event.keyCode == 40)
        {
			player.directionY = 0;
        }
    if(event.keyCode == 39)
        {
			player.directionX = 0;
        }
    if(event.keyCode == 37)
        {
			player.directionX = 0;
        }
	if(event.keyCode == 13)
		{
			location.reload();
            playerShoot();
		}
}