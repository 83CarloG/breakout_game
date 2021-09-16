import * as components from './components';
import './style.css';

// SELECT CANVAS ELEMET
const cvs = document.getElementById("breckout");
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
let SCORE = 0;
const SCORE_UNIT = 10;
let LEVEL = 1;
const LEVEL_MAX = 3;
let GAME_OVER = false;
let leftArrow = false;
let rightArrow = false;
let SOUND_IMG = components.SOUND_ON;


// CREATE PADDLE
const paddle = {
    x : cvs.width/2 - PADDLE_WIDTH/2,
    y : cvs.height - PADDLE_MARGIN_BOTTOM - PADDLE_HEIGHT,
    width : PADDLE_WIDTH,
    height : PADDLE_HEIGHT,
    dx :5
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

// RESET PADDLE
function resetPaddle() {
    paddle.x = cvs.width/2 - PADDLE_WIDTH/2,
    paddle.y = cvs.height - PADDLE_MARGIN_BOTTOM - PADDLE_HEIGHT
}

// CREATE BALL
const ball = {
        x: cvs.width /2,
        y: paddle.y - BALL_RADIUS,
        radius: BALL_RADIUS,
        speed: 4,
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

// BALL AND WALL COLLISION
function ballWallCollision(){
        if(ball.x + ball.radius > cvs.width || ball.x - ball.radius < 0){
            ball.dx = -ball.dx;
            components.WALL_HIT.play();
        } else if (ball.y - ball.radius < 0){
            ball.dy = -ball.dy;
            components.WALL_HIT.play();
        }
        if(ball.y + ball.radius > cvs.height){
            LIFE--;
            resetPaddle();
            resetBall();
    }
}

// RESET THE BALL
function resetBall(){
    ball.x = cvs.width /2;
    ball.y = paddle.y - BALL_RADIUS;
    ball.dx = 3 *(Math.random() * 2  - 1);
    ball.dy = -3;
}

// BALL AND PADDLE COLLISION
function ballPaddleCollision(){
    if (ball.x < paddle.x + paddle.width && ball.x > paddle.x && paddle.y < paddle.y + paddle.height && ball.y > paddle.y) {
        components.PADDLE_HIT.play();
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

// CREATE THE BRICKS
const brick = {
    row: 3,
    column: 5,
    width: 55,
    height: 20,
    offSetLeft: 20,
    offSetTop: 20,
    marginTop: 40,
    fillColor: '#2e3548',
    strokeColor: '#FFF'
}

let bricks = [];

function createBricks() {
    for (let r = 0; r < brick.row; r++) {
        bricks[r] = [];
        for (let c = 0; c < brick.column; c++) {
            bricks[r][c] = {
                x: c * (brick.offSetLeft + brick.width) + brick.offSetLeft,
                y: r * (brick.offSetTop + brick.height) + brick.offSetTop + brick.marginTop,
                status: true
            }
            
        }
    }
}

createBricks();


// DRAW THE BRICKS
function drawBricks() {
    for (let r = 0; r < brick.row; r++) {
        for (let c = 0; c < brick.column; c++) {
            let b = bricks[r][c];
            if (b.status) {
                ctx.fillStyle = brick.fillColor;
                ctx.fillRect(b.x, b.y, brick.width, brick.height)

                ctx.strokeStyle = brick.strokeColor;
                ctx.strokeRect(b.x, b.y, brick.width, brick.height);

            }            
        }
    }
}

// BALL BRICKS COLLISION
function ballBrickCollision() {
    for (let r = 0; r < brick.row; r++) {
        for (let c = 0; c < brick.column; c++) {
            let b = bricks[r][c];
            if (b.status) {
                if (ball.x + ball.radius > b.x && ball.x - ball.radius < b.x + brick.width && ball.y + ball.radius > b.y
                    && ball.y - ball.radius < b.y + brick.height) {
                    components.BRICK_HIT.play();
                    ball.dy = - ball.dy;
                    b.status = false;
                    SCORE += SCORE_UNIT;
                }

            }            
        }
    }
    
}

// SHOW GAMES STATS
function showGameStats(text, textX, textY, img, imgX, imgY) {
    // draw text
    ctx.fillStyle = '#FFF';
    ctx.font = '25px Germania One';
    ctx.fillText(text, textX, textY);

    // draw images
    ctx.drawImage(img, imgX, imgY, 25,  25);

    
}

// GAME OVER
function gameOver() {
    if (LIFE <= 0) {
        showYouLose();
        GAME_OVER = true;
    }
}

//LEVEL UP
function levelUp() {
    let isLevelDone = true;
     for (let r = 0; r < brick.row; r++) {
        for (let c = 0; c < brick.column; c++) {
            isLevelDone = isLevelDone && ! bricks[r][c].status;
        }
     }
    if (isLevelDone) {
        components.WIN.play();
        if (LEVEL >= LEVEL_MAX) {
            showYouWin();
            GAME_OVER = true;
            return;
        }
        brick.row++;
        createBricks();
        ball.speed += 0.5;
        resetPaddle();
        resetBall();
        LEVEL++;
    }

}


// DRAW FUNCTION
function draw() {
    drawPaddle();

    drawBall();

    drawBricks();

    // show score
    showGameStats(SCORE, 35, 25, components.SCORE_IMG, 5, 5);
    // show life
    showGameStats(LIFE, cvs.width - 25, 25, components.LIFE_IMG, cvs.width - 55, 5);
    // show level
    showGameStats(LEVEL, cvs.width / 2, 25, components.LEVEL_IMG, cvs.width / 2 - 30, 5);
    // show sound on/off
    showGameStats('', cvs.width / 2, 25, SOUND_IMG , 20 , cvs.height - 35);



}

// UPDATE GAME FUNCTION
function update() {
    movePaddle();

    moveBall();

    ballWallCollision();

    ballPaddleCollision();

    ballBrickCollision();

    gameOver();
    
    levelUp();

}

//GAME LOOP
function loop() {
    // CLEAR THE CANVAS
    ctx.drawImage(components.BG_IMG, 0,0)

    draw();

    update();

    if (! GAME_OVER) {
        requestAnimationFrame(loop);
    }
}
loop();


// SELECT SOUND ELEMENT


cvs.addEventListener('click', function (e) {
    let elemLeft = cvs.offsetLeft - 200;
    let elemTop = cvs.offsetTop - 250 ;
    let xVal = e.pageX;
    let yVal = e.pageY ;
    if (xVal - elemLeft > 20 && xVal - elemLeft < 45 && yVal - elemTop > cvs.height - 60 && yVal - elemTop < cvs.height - 10) {
        audioManager()
      }
   });

function audioManager() {
    SOUND_IMG = SOUND_IMG  == components.SOUND_ON ? components.SOUND_OFF : components.SOUND_ON;
    //mute and unmute sounds
    components.WALL_HIT.muted = components.WALL_HIT.muted ? false : true;
    components.LIFE_LOST.muted = components.LIFE_LOST.muted ? false : true;
    components.PADDLE_HIT.muted = components.PADDLE_HIT.muted ? false : true;
    components.WIN.muted = components.WIN.muted ? false : true;
    components.BRICK_HIT.muted = components.BRICK_HIT.muted ? false : true;
}

// SHOW GAME OVER MESSAGE
const gameover = document.getElementById('gameover');
const youwon = document.getElementById('youwon');
const youlose = document.getElementById('youlose');
const restart = document.getElementById('restart');

restart.addEventListener('click', function(){
    location.reload();
})

function showYouWin() {
    gameover.style.display = 'block';
    youwon.style.display = 'block';
}
function showYouLose() {
    gameover.style.display = 'block';
    youlose.style.display = 'block';
}
