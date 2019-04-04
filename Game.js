var enemyYPositions = [];
var enemyXPositions = [];
var avatarX = 0;
var avatarY = 0;
var avatarImage;
var enemyImage;
var ticksSurvived = 0;
var mostTicksSurvived;
var gravity = -1.1;
var horizontalSpeed = 0.1;

function setUpGame() {
    var gameCanvas = document.getElementById("gameCanvas");
    avatarImage = new Image();
    enemyImage = new Image();
    enemyImage.src = "enemy.png";
    avatarImage.src = "avatar.png";

    gameCanvas.getContext("2d").drawImage(avatarImage, Math.random() * 100, Math.random() * 100);

    gameCanvas.addEventListener("mousemove", handleMouseMovement);
    setInterval(handleTick, 25);
    
    if (localStorage.getItem("bestScore")) {
        mostTicksSurvived = localStorage.getItem("BestScore");
    }
}

function handleMouseMovement(mouseEvent) {
    avatarX = mouseEvent.offsetX;
    avatarY = mouseEvent.offsetY;
}

function handleTick() {
    var gameCanvas = document.getElementById("gameCanvas");
    var currentEnemyNumber = 0;
    var numberOfEnemies = enemyXPositions.length;

    if (Math.random() < 1 / 100) {
        enemyYPositions.push(0);
        enemyXPositions.push(Math.random() * 400);
    }

    while (currentEnemyNumber < numberOfEnemies) {
        enemyYPositions[currentEnemyNumber] = enemyYPositions[currentEnemyNumber] + 1;
        currentEnemyNumber = currentEnemyNumber + 1;
        
    }

    gameCanvas.width = 400; //this erases the contents of the canvas
    gameCanvas.getContext("2d").drawImage(avatarImage, avatarX, avatarY);

    currentEnemyNumber = 0;
    while (currentEnemyNumber < numberOfEnemies) {
        gameCanvas.getContext("2d").drawImage(enemyImage, enemyXPositions[currentEnemyNumber], enemyYPositions[currentEnemyNumber]);
        currentEnemyNumber = currentEnemyNumber + 1;
    }
    gameCanvas.getContext("2d").font = "18px Really-Awesome";
    gameCanvas.getContext("2d").textBaseline = "top";
    gameCanvas.getContext("2d").fillText("Score: " + ticksSurvived, 5, 5);
    currentEnemyNumber = 0;
    while (currentEnemyNumber < numberOfEnemies) {
        if (((avatarX < enemyXPositions[currentEnemyNumber] && enemyXPositions[currentEnemyNumber] < avatarX + 30) || (enemyXPositions[currentEnemyNumber] < avatarX && avatarX < enemyXPositions[currentEnemyNumber] + 30)) && ((avatarY < enemyYPositions[currentEnemyNumber] && enemyYPositions[currentEnemyNumber] < avatarY + 33) || (enemyYPositions[currentEnemyNumber] < avatarY && avatarY < enemyYPositions[currentEnemyNumber] + 30))) {
            alert("You hit an enemy! Ticks survived:" + ticksSurvived + " ticks");
            if (ticksSurvived > mostTicksSurvived) {
                alert("You beat your old high score by " + (ticksSurvived - mostTicksSurvived) + " ticks!");
                mostTicksSurvived = TicksSurvived;
                localStorage.setItem("bestScore", mostTicksSurvived);
                
            }
            startNewGame();
        }
        currentEnemyNumber = currentEnemyNumber + 1;
    }

    ticksSurvived = ticksSurvived + 1;
}

function startNewGame() {
    enemyXPositions = [];
    enemyYPositions = [];
    ticksSurvived = 0;
}

function playerBounds() {

}


