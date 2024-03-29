// board
let blockSize = 20;
let rows = 20;
let cols = 30;
let board;
let context;

// snake head
let snakeX = blockSize * 5;
let snakeY = blockSize * 5;

// positive X = move RIGHT, positive Y = move DOWN
let velocityX = 0;
let velocityY = 0;

// snake body is stored as an array of coordinates
let snakeBody = [];

// snake food
let foodX;
let foodY;

// game ending condition
let gameOver = false;
let gameOverBox = document.getElementById("game-over");

// score tracking
let scoreDisplay = document.getElementById("score");
let score = 0;
scoreDisplay.innerHTML = "Score: " + score;
let highScoreDisplay = document.getElementById("high-score");
let highScore = 0;

// initialises the game board / snake / food
window.onload = () => {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    //used for drawing on the board
    context = board.getContext("2d");

    placeFood();
    // change direction on key press
    addEventListener("keydown", changeDirection);
    setInterval(update, 1000/10);
}

// updates the board
function update() {
    if (gameOver) {
        gameOverMessage();
        return;
    }

    // board stuff
    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    // food stuff
    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if (snakeX === foodX && snakeY === foodY) {
        snakeBody.push(foodX, foodY);
        placeFood();
        score++;
        scoreDisplay.innerHTML = "Score: " + score;
    }

    // snake body segments move snake-ily
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    // snake stuff
    context.fillStyle = "lime";
    // move by current velocity every update frame
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    // draw snake head
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    // draw snake body
    for (let i = 0; i < snakeBody.length; i++) {
        if (i % 2) {
            context.fillStyle = "lime";
        } else {
            context.fillStyle = "limegreen";
        }
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    // gameOver conditions
    if (snakeX < 0 || snakeX > blockSize * (cols - 1)
        || snakeY < 0 || snakeY > blockSize * (rows - 1)) {
            gameOver = true;
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX === snakeBody[i][0] && snakeY === snakeBody[i][1]) {
            gameOver = true;
        }
    }
}

// changes the direction of the snake head on pressing a key
function changeDirection(e) {
    if (e.code === "ArrowUp" && velocityY !== 1) {
        velocityX = 0;
        velocityY = -1;
    } else if (e.code === "ArrowDown" && velocityY !== -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (e.code === "ArrowLeft" && velocityX !== 1) {
        velocityX = -1;
        velocityY = 0;
    } else if (e.code === "ArrowRight" && velocityX !== -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

// places food at a random coordinate on the canvas
function placeFood() {
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}

// show when game over conditions are met
function gameOverMessage() {
    gameOverBox.style.display = "block";
}

// reinitialise all variables
function restartGame() {
    gameOverBox.style.display = "none";
    snakeX = blockSize * 5;
    snakeY = blockSize * 5;
    velocityX = 0;
    velocityY = 0;
    snakeBody = [];
    gameOver = false;
    if (score > highScore) {
        highScore = score;
        highScoreDisplay.innerHTML = "Top Score: " + highScore;
    }
    score = 0;
    scoreDisplay.innerHTML = "Score: " + score;
}