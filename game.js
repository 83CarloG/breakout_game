// SELECT CANVAS ELEMET
const cvs = document.getElementById("breackout");
const ctx = cvs.getContext("2d");

// ADD BORDER TO CANVAS
cvs.style.border = "1px solid #0ff";

// MAKE LINE THIK WHEN DRAWING TO CANVAS
ctx.lineWidth = 3;

// GAME VARIABLES AND COSTANTS
const PADDLE_WIDTH = 100;
const PADDLE_MARGIN_BOTTOM = 50;
const PADDLE_HEIGHT = 20;
const BALL_RADIUS = 8;
let LIFE = 3;  
let leftArrow = false;
let rightArrow = false;


// CREATE PADDLE
const paddle = {
    x: cvs.width/2 - PADDLE_WIDTH/2,
    y: cvs.height - PADDLE_WIDTH - PADDLE_MARGIN_BOTTOM,
    width: PADDLE_WIDTH,
    height: PADDLE_HEIGHT,
    dx: 5
}

// DRAW PADDLE
function drawPaddle(){
    ctx.fillStyle ="#2e3548";
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
    ctx.strokeStyle = "#ffcd05";
    ctx.strokeRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

// CONTROL THE PADDLE
document.addEventListener("keydown", function(e) {
    if(e.keyCode == 37){
        leftArrow = true;
    } else if(e.keyCode == 39){
        rightArrow = true;
    }
})
document.addEventListener("keyup", function(e) {
    if(e.keyCode == 37){
        leftArrow = false;
    } else if(e.keyCode == 39){
        rightArrow = false;
    }
})
function movePaddle(){
    if(rightArrow && paddle.x + paddle.width < cvs.width){
    paddle.x += paddle.dx;
    } else if(leftArrow && paddle.x > 0){
        paddle.x -= paddle.dx;
    }
}

// CREATE BALL
const ball = {
        x: cvs.width /2,
        y: paddle.y - BALL_RADIUS,
        radius: BALL_RADIUS,
        speed: 3,
        dx: 3 *(Math.random() * 2  - 1),
        dy: -3
}

// DRAW THE BALL
function drawBall()  {
        ctx.beginPath();
        ctx.arc(ball.x, ball.y,ball.radius,0,Math.PI*2);
        ctx.fillStyle = ("#ffcd05");
        ctx.fill();
        ctx.strokeStyle = "#2e3548";
        ctx.stroke();
        ctx.closePath();
}
    
// MOVE THE BALL
function moveBall(){
    ball.x += ball.dx;
    ball.y += ball.dy;
}

// BALL WALL COLLISION
function ballWallCollision(){
        if(ball.x + ball.radius > cvs.width || ball.x - ball.radius < 0){
            ball.dx = -ball.dx;
        } else if (ball.y - ball.radius < 0){
            ball.dy = -ball.dy;
        }
        if(ball.y + ball.radius > cvs.height){
            LIFE--;
            resetBall();
    }
}

// RESET THE BALL
function resetBall(){
    ball.x = cvs.width /2;
    ball.y = paddle.y - BALL_RADIUS;
    /*
    let min = Math.ceil(-ball.dx);
    let max = Math.floor(ball.dx);
    ball.dx = Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
    */
    ball.dx = 3 *(Math.random() * 2  - 1);
    ball.dy = -3;
}

// BALL AND PADDLE COLLISION
function ballPaddleCollision(){
    if(ball.x < paddle.x + paddle.width && ball.x > paddle.x && paddle.y < paddle.y + paddle.height && ball.y > paddle.y){
        // CHECK WHERE THE BALL HIT THE PADDLE
        let collidePoint = ball.x - (paddle.x + paddle.width / 2);
        // NORMALIZE THE VALUES
        collidePoint = collidePoint / (paddle.width / 2);
        // CALCULATE THE ANGLE OT THE BALL
        let angle = collidePoint * (Math.PI/3);
        ball.dx = ball.speed * Math.sin(angle);
        ball.dy = -ball.speed * Math.cos(angle);
    }
}
       

// DRAW FUNCTION
function draw() {
    drawPaddle();

    drawBall();
}

// UPDATE GAME FUNCTION
function update() {
    movePaddle();

    moveBall();

    ballWallCollision();

    ballPaddleCollision();

}

//GAME LOOP
function loop() {
    // CLEAR THE CANVAS
    ctx.drawImage(BG_IMG, 0,0)

    draw();

    update();

    requestAnimationFrame(loop);
}
loop();