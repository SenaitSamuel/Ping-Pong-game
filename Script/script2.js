// select page wrapper element

var registeredUser= {
    username: '',
    password: '',

  };
 var loginUser = {
    username: '',
    password: '',
  };
  var  form = document.getElementById("form");
  var  highScore = document.getElementById("highScore");
  var  registeredUserName = document.getElementById("registeredUserName");
  var  registeredPassword = document.getElementById("registeredPassword");
  
  var  loginUserName = document.getElementById("loginUserName");
  var  loginPassword = document.getElementById("loginPassword");

  var createForm= document.getElementById("registeredForm");
  createForm.addEventListener('click' , registeredForm  ) 
  
  var loginForm = document.getElementById("loginForm");
  loginForm.addEventListener('click' , login ) 
  
  function registeredForm(event ){

    registeredUser.username = registeredUserName.value
    registeredUser.password = registeredPassword.value

    localStorage.setItem('Username', registeredUser.username);
    localStorage.setItem('Password', registeredUser.password);
    theme.style.display="block" 
  } 
  
  function login(event){
     
        loginUser.username  = loginUserName.value
        loginUser.password =  loginPassword.value
       
        if(loginUser.username !== localStorage.getItem('Username')) {
            console.log("please enter username")
        }
        else if(loginUser.password !== localStorage.getItem('Password')) {
            console.log("pelase enter passwaord")
        }
        else{
            theme.style.display="block" 
            form.style.display="none" 
        }
        

    
  } 






























var canvas;
var canvasContext;
var ballX = 50;
var ballY = 50;
var ballSpeedX = 10;
var ballSpeedY = 4;
    
var player1Score = 0;
var player2Score = 0;
const WINNING_SCORE = 3;

var showingWinScreen = false;
    
var paddle1Y = 250;
var paddle2Y = 250;
const PADDLE_THICKNESS = 10;
const PADDLE_HEIGHT = 100;
    
function calculateMousePos(evt){
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;
    return {
        x:mouseX,
        y:mouseY
    };
}
    
    
function handleMouseClick(evt) {
    if(showingWinScreen){
        player1Score = 0;
        player2Score = 0;
        showingWinScreen = false;
    }
}
    
window.onload = function () {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    drawEverything();
    
    var framesPerSecond = 30;
    setInterval(function(){
        moveEverything();
        drawEverything();
    },1000/framesPerSecond);
    
    canvas.addEventListener('mousedown',handleMouseClick);
    
    canvas.addEventListener('mousemove',
                       function(evt) {
    var mousePos = calculateMousePos(evt);
    paddle1Y = mousePos.y-(PADDLE_HEIGHT/2);
})
}

function ballReset(){
    if (player1Score >= WINNING_SCORE ||
        player2Score >= WINNING_SCORE) {
            showingWinScreen = true;
    }
    
    ballSpeedX = -ballSpeedX;
    ballX = canvas.width/2;
    ballY = canvas.height/2;
}


function computerMovement(){
    var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT/2);
    if(paddle2YCenter < ballY-35){
        paddle2Y += 6;
    } else if (paddle2YCenter > ballY-35) {
        paddle2Y -= 6;
    }
}
    console.log (paddle2Y);
    
    
function moveEverything () {    
    if(showingWinScreen){
        return;
    }
    
    computerMovement();
    
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    
    if(ballX > canvas.width) {
        // ballSpeedX = -ballSpeedX;
        if(ballY > paddle2Y && ballY < paddle2Y+PADDLE_HEIGHT) {
            ballSpeedX = -ballSpeedX;
            
            var deltaY = ballY -(paddle2Y+PADDLE_HEIGHT/2);
            ballSpeedY = deltaY * 0.35;
            
            
        } else {
            player1Score++; //must be before ballreset
            ballReset();
        }
    }
    
    if(ballX < 0) {
        // ballSpeedX = -ballSpeedX;
        if(ballY > paddle1Y && ballY < paddle1Y+PADDLE_HEIGHT) {
            ballSpeedX = -ballSpeedX;
            
            var deltaY = ballY -(paddle1Y+PADDLE_HEIGHT/2);
            ballSpeedY = deltaY * 0.35;
            
            
        } else {
            player2Score++;
            ballReset();
            
        }
    }
    
    if(ballY > canvas.height) {
        ballSpeedY = -ballSpeedY;
    }
    
    if(ballY < 0) {
        ballSpeedY = -ballSpeedY;
    }
}

function drawNet() {
    for(var i=0; i<canvas.height; i+=40) {
        colorRect(canvas.width/2-1,i,2,20,'black');
    }
}
    
function drawEverything(){
    // draws the game field
    colorRect(0,0,canvas.width,canvas.height,'#FFEFB8');
    
    if(showingWinScreen){
        if (player1Score >= WINNING_SCORE){
            canvasContext.fillStyle = '#411103';
            canvasContext.fillText("YOU WIN",canvas.width/2-50,100);
        } else if (player2Score >= WINNING_SCORE) {
            canvasContext.fillStyle = '#411103';
            canvasContext.fillText("PC WINS",canvas.width/2-50,100);
        }
        canvasContext.fillStyle = '#411103';
        canvasContext.fillText("click to continue",canvas.width/2-100,350);
        return;
    }
    
    drawNet();
    
    // left player
    colorRect(0,paddle1Y,PADDLE_THICKNESS,PADDLE_HEIGHT,'#411103');
    
    // right player
    colorRect(canvas.width-PADDLE_THICKNESS,paddle2Y,PADDLE_THICKNESS,PADDLE_HEIGHT,'#411103');
    
    // the ball
    colorCircle(ballX, ballY, 10, '#411103');
    
    canvasContext.font="30px sans-serif";
    canvasContext.fillText(player1Score,200,100);
    canvasContext.fillText(player2Score,canvas.width-200,100);
}
    
function colorCircle(centerX,centerY,radius,drawColor){
    // the ball
    canvasContext.fillStyle = drawColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX,centerY,radius,0,Math.PI*2, true);
    canvasContext.fill();
}
    
function colorRect(leftX,topY, width,height,drawColor){
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftX,topY, width,height,drawColor);
}