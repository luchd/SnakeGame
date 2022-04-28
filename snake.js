function init() {
    canvas = document.getElementById("snake_board");
    W = H = canvas.width = canvas.height = 555;
    pen = canvas.getContext("2d");
    cell_size = 24;
    gameOver = false;

    score = 0;

    // food = getRandomFood();

    snake = {
        init_len: 3,
        color: "blue",
        cells: [],
        direction: "ArrowRight",
        createSnake: function () {
            for (var i = this.init_len; i > 0; i--) {
                this.cells.push({
                    x: i,
                    y: 0
                });
            }
        },
        drawSnake: function () {
            pen.fillStyle = this.color;
            for (var i = 0; i < this.cells.length; i++) {
                pen.fillRect(this.cells[i].x * cell_size, this.cells[i].y * cell_size, cell_size - 1, cell_size - 1)
            }
        },
        updateSnake: function () {
            // Check snake eats food to generate a new one
            var headX = this.cells[0].x;
            var headY = this.cells[0].y;
            if (headX == food.x && headY == food.y) {
                food = getRandomFood();
                score += 1;
                document.querySelector("#score").textContent = score;
            }
            else {
                this.cells.pop();
            }

            var headX = this.cells[0].x;
            var headY = this.cells[0].y;
            var nextX, nextY;
            if (this.direction == "ArrowRight") {
                nextX = headX + 1;
                nextY = headY;
            }
            else if (this.direction == "ArrowLeft") {
                nextX = headX - 1;
                nextY = headY;
            }
            else if (this.direction == "ArrowDown") {
                nextX = headX;
                nextY = headY + 1;
            }
            else {
                nextX = headX;
                nextY = headY - 1;
            }
            this.cells.unshift({ x: nextX, y: nextY });

            // Check snake out of bound
            var lastX = Math.round(W / cell_size);
            var lastY = Math.round(H / cell_size);
            if (this.cells[0].y < 0 || this.cells[0].x < 0 || this.cells[0].y > lastY || this.cells[0].x > lastX) {
                gameOver = true;

            }
        }
    };
    snake.createSnake();
    food = getRandomFood();
    function keyPressed(e) {
        snake.direction = e.key;
    }
    document.addEventListener("keydown", keyPressed);
}

function draw() {
    // Clear the old frame
    pen.clearRect(0, 0, W, H);
    snake.drawSnake();

    // Draw food
    pen.fillStyle = food.color;
    pen.fillRect(food.x * cell_size, food.y * cell_size, cell_size, cell_size);
}

function update() {
    snake.updateSnake();
}

function getRandomFood() {
    var flag = false;
    var foodX = Math.round((Math.random() * (W - cell_size) / cell_size));
    var foodY = Math.round((Math.random() * (H - cell_size) / cell_size));

    // --- Check food generated on the snake's body to re-generate ---
    // while (true) {
    //     for (var i = 0; i < snake.cells.length; i++) {
    //         console.log(snake.cells[i].x);
    //         console.log(snake.cells[i].y);
    //         console.log(foodX);
    //         console.log(foodY);
    //         if (foodX == snake.cells[i].x && foodY == snake.cells[i].y) {
    //             flag = true;
    //             console.log("B R E A K");
    //             break;
    //         }
    //     }    
    //     if (flag) {
    //         foodX = Math.round((Math.random() * (W - cell_size) / cell_size));
    //         foodY = Math.round((Math.random() * (H - cell_size) / cell_size));
    //     }
    //     else break;
    // }
    
    var food = {
        x: foodX,
        y: foodY,
        color: "red"
    };
    return food;
}

function gameLoop() {
    if (gameOver) {
        clearInterval(gameStart);
        alert("> . G A M E   O V E R . <");
        if (window.confirm("Do you want to restart?")) {
            gameOver = false;
            snake.cells = [];
            snake.direction = "ArrowRight";
            snake.createSnake();
            draw();
            update();
            gameStart = setInterval(gameLoop, 100);
        }
        else {
            return;
        }
    }
    draw();
    update();
}

init();
var gameStart = setInterval(gameLoop, 100);