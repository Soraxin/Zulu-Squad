var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");
var SCREEN_WIDTH = canvas.width;
var SCREEN_HEIGHT = canvas.height;
var ASTEROID_SPEED = 5;
var PLAYER_SPEED = 3.5;
var PLAYER_TURN_SPEED = 0.07;
var BULLET_SPEED = 8;
var STATE_SPLASH = 0;
var STATE_GAME = 1;
var STATE_GAMEOVER = 2;
var gameState = STATE_SPLASH;
var gameScore = 0;
var time = 1;

var player = {
    image: document.createElement("img"),
    x: SCREEN_WIDTH / 2,
    y: SCREEN_HEIGHT / 2,
    width: 93,
    height: 88,
    directionX: 0,
    directionY: 0,
    angularDirection: 0,
    rotation: 0
};

player.image.src = "Plane.png";