document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('pongCanvas');
    const ctx = canvas.getContext('2d');

    const paddleWidth = 20;
    const paddleHeight = 100;
    const ballRadius = 10;

    let paddle1Y = (canvas.height - paddleHeight) / 2;
    let paddle2Y = (canvas.height - paddleHeight) / 2;

    let ballX = canvas.width / 2;
    let ballY = canvas.height / 2;
    let ballSpeedX = 5;
    let ballSpeedY = 5;

    const keys = {
        w: false,
        s: false,
        ArrowUp: false,
        ArrowDown: false
    };

    document.addEventListener('keydown', (e) => {
        if (e.key in keys) keys[e.key] = true;
    });

    document.addEventListener('keyup', (e) => {
        if (e.key in keys) keys[e.key] = false;
    });

    function drawRect(x, y, width, height, color) {
        ctx.fillStyle = color;
        ctx.fillRect(x, y, width, height);
    }

    function drawCircle(x, y, radius, color) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2, false);
        ctx.closePath();
        ctx.fill();
    }

    function movePaddles() {
        if (keys.w && paddle1Y > 0) {
            paddle1Y -= 7;
        }
        if (keys.s && paddle1Y < canvas.height - paddleHeight) {
            paddle1Y += 7;
        }
        if (keys.ArrowUp && paddle2Y > 0) {
            paddle2Y -= 7;
        }
        if (keys.ArrowDown && paddle2Y < canvas.height - paddleHeight) {
            paddle2Y += 7;
        }
    }

    function moveBall() {
        ballX += ballSpeedX;
        ballY += ballSpeedY;

        if (ballY + ballRadius > canvas.height || ballY - ballRadius < 0) {
            ballSpeedY = -ballSpeedY;
        }

        if (ballX - ballRadius < paddleWidth) {
            if (ballY > paddle1Y && ballY < paddle1Y + paddleHeight) {
                ballSpeedX = -ballSpeedX;
            } else if (ballX - ballRadius < 0) {
                resetBall();
            }
        }

        if (ballX + ballRadius > canvas.width - paddleWidth) {
            if (ballY > paddle2Y && ballY < paddle2Y + paddleHeight) {
                ballSpeedX = -ballSpeedX;
            } else if (ballX + ballRadius > canvas.width) {
                resetBall();
            }
        }
    }

    function resetBall() {
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
        ballSpeedX = -ballSpeedX;
    }

    function draw() {
        drawRect(0, 0, canvas.width, canvas.height, '#000');
        drawRect(0, paddle1Y, paddleWidth, paddleHeight, '#fff');
        drawRect(canvas.width - paddleWidth, paddle2Y, paddleWidth, paddleHeight, '#fff');
        drawCircle(ballX, ballY, ballRadius, '#fff');
    }

    function gameLoop() {
        movePaddles();
        moveBall();
        draw();
        requestAnimationFrame(gameLoop);
    }

    gameLoop();
});
