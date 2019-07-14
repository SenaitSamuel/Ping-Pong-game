
// select canvas element
var  canvas = document.getElementById("myCanvas");
 canvas.style.display="none"

// getContext of canvas 
var ctx = canvas.getContext('2d');

var winnerScore = 10;

var showingWinScreen = false;


// Ball object
var  ball = {
    x : canvas.width/2,
    y : canvas.height/2,
    radius : 10,
    velocityX : 0,
    velocityY : 0,
    speed : 7,
    color : "#A3FF24",
}

// player 1 Paddle
var  player1 = {
    x : 40, // left side of canvas
    y : (canvas.height - 100)/2, 
    width : 10,
    height : 100,
    score : 0,
    color : "red",
  
}

// AI Paddle
var  AI = {
    x : canvas.width - 40, // 
    y : (canvas.height - 100)/2, 
    width : 10,
    height : 100,
    score : 0,
    color : "#A3FF24",
 
}

// NET
var net = {
    x : (canvas.width - 2)/2,
    y : 0,
    height : 10,
    width : 2,
    color : "#A3FF24"
}



/// draw the player1's paddle
function drawRectPlayer1(x, y, w, h, color){
    ctx.fillStyle = player1.color;
    ctx.fillRect(player1.x, player1.y, player1.width, player1.height);
}
/// draw the player2's paddle
function drawRectPlayer2(x, y, w, h, color){
    ctx.fillStyle =AI.color;
    ctx.fillRect(AI.x, AI.y, AI.width, AI.height);
}

// draw circle, will be used to draw the ball
function drawBall(x, y, r, color){
    ctx.fillStyle = ball.color;
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius,0,Math.PI*2,true);
    ctx.closePath();
    ctx.fill();
}
// draw the net
function drawNet(){
    for(let i = 0; i <= canvas.height; i+=15){
        ctx.fillStyle =net.color;
        ctx.fillRect(net.x, net.y + i, net.width, net.height);
    }
}

//  draw the player1 score to the left
function drawTextPlayer1(text,x,y){
    ctx.fillStyle = "#A3FF24";
    ctx.font = "20px fantasy";
    ctx.fillText(player1.score,canvas.width/4,canvas.height/5);
}

//draw the AI score to the right
function drawTextAI(text,x,y){
    ctx.fillStyle = "#A3FF24";
    ctx.font = "20px fantasy";
    ctx.fillText(AI.score,3*canvas.width/4,canvas.height/5);
}  

//  draw the player1 name to the left
function drawTextPlayer1Name(text,x,y){
    ctx.fillStyle = "#A3FF24";
    ctx.font = "20px fantasy";
    ctx.fillText(localStorage.entry,canvas.width/7,canvas.height/5);
}

//draw the AI name to the right
function drawTextAIName(text,x,y){
    ctx.fillStyle = "#A3FF24";
    ctx.font = "20px fantasy";
    ctx.fillText("AI",3*canvas.width/5,canvas.height/5);
} 

// listening to the mouse
canvas.addEventListener('click', startCanvas)
 
function startCanvas(event) {
    levelButton = event.target
    console.log(event.target)
   if  (  ball.velocityX === 0 && ball.velocityY === 0 ){
       if(levelButton.classList.contains("levelMedium")) {
        ball.velocityX = 7
        ball.velocityY =  7
        ball.speed= 10 
        ball.color="blue"
           console.log("medium")
       }
      else if (levelButton.classList.contains("levelHard")){
        console.log("hard")
        ball.velocityX = 15
        ball.velocityY =  7
        ball.speed= 15
        ball.color="orange"
    }
    else{
        console.log("esay")
        ball.velocityX = 4
        ball.velocityY =  4
        ball.speed= 10 
        ball.color="red"
    }
     }
     
  
}


canvas.addEventListener("mousemove", mousePos);

function mousePos(evt){
    let rect = canvas.getBoundingClientRect();
    player1.y = evt.clientY - rect.top - player1.height/2;
}
canvas.addEventListener('mousedown',handleMouseClick);
function handleMouseClick(evt) {
    if(showingWinScreen){
        player1.score = 0;
        AI.score = 0;
        showingWinScreen = false;
    }
}
// when AI or player1 scores, we reset the ball
function resetBall(){
    if (player1.score >= winnerScore ||
        AI.score >= winnerScore) {
            showingWinScreen = true;
    }

    ball.x = canvas.width/2;
    ball.y = canvas.height/2;
    ball.velocityX = 0;
    ball.velocityY = 0;
    ball.speed = 7;
}
function collides(b,p){
    p.top = p.y;
    p.bottom = p.y + p.height;
    p.left = p.x;
    p.right = p.x + p.width;
    
    b.top = b.y - b.radius;
    b.bottom = b.y + b.radius;
    b.left = b.x - b.radius;
    b.right = b.x + b.radius;
    
    // paddle hit  top/bottom boarder
  
    if(p.left < b.right && p.top < b.bottom && p.right > b.left && p.bottom > b.top){
        ball.velocityX = -ball.velocityX;
    } ;
}

function update(){
    
    if(showingWinScreen){
        return;
    } 
    // change the score of players,
    if( ball.x - ball.radius < 0 ){
        AI.score++;
        resetBall();
    }else if( ball.x + ball.radius > canvas.width){
        player1.score++;
        resetBall();
    }
 
    // the ball has a velocity
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
    
    // when the ball collides  top walls we inverse the x and y velocity.
    if(ball.x  < 0 || ball.x  > canvas.width){
        ball.velocityX = -ball.velocityX;
    }
    //whne the ball collides with bottom
    if(ball.y  < 0 || ball.y  > canvas.height){
        ball.velocityY = -ball.velocityY;
    }
    // AIputer movemnt with the ball
 
    AI.y = ball.y
    

    // we check if the paddle hit the player1 or the AI paddle
    let player = (ball.x  < canvas.width/2) ? player1 : AI;
    
    // if the ball hits a paddle
    if(collides(ball,player)){
    
        ball.velocityY =  -ball.velocityY
    }
    
  
}
// render function
function render(){ 
    // clear the canvas
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // draw the Winning name to the left
    if(showingWinScreen){
        highScoreList.style.display="inline-block"
        if (player1.score >= winnerScore){
            ctx.fillStyle = '#A3FF24';
            ctx.textAlign = "center"
            ctx.fillText(localStorage.entry + " " + "Win",canvas.width/2,canvas.height/3);
            ctx.textBaseline = "middle";
            ctx.font = "40px Arial"
           

        } else if (AI.score >= winnerScore) {
            ctx.fillStyle = '#A3FF24';
            ctx.textAlign = "center"
            ctx.fillText("AI Win",canvas.width/2,canvas.height/3);
            ctx.textBaseline = "middle";
            ctx.font = "40px Arial"
        }
        ctx.fillStyle = '##A3FF24';
        ctx.textAlign = "center"
        ctx.fillText("Click to Play again",canvas.width/2,canvas.height/2);
        ctx.textBaseline = "middle";
        ctx.font = "40px Arial"
        return;
        
    }
    
    // draw the player1 name to the left
    drawTextPlayer1()
  
     // draw the player1 name to the  right
     drawTextAI()
    
    // draw the net
    drawNet();
    
    // draw the player1's paddle
    drawRectPlayer1();
    
    // draw the AI's paddle
    drawRectPlayer2()
    
    // draw the ball
    drawBall();
    //  draw the player1 name to the left
    drawTextPlayer1Name()
    //  draw the AI name to the right
    drawTextAIName()
}
function pong(){
    update();
    render();
}

//call pong 
let loop = setInterval(pong,1000/50);

