// select page wrapper element
var  page = document.getElementById("page-wrapper"); 

// select welcomepage  element
var  welcomePage = document.getElementById("welcomePage"); 
welcomePage.addEventListener('click', function(){
    welcomePage.style.display="none"
    form.style.display="block"
})

// Write username element
 var  form = document.getElementById("form");
 form.style.display="none"
 var  registeredUserName = document.getElementById("registeredUserName");
  
  var userName= document.getElementById("registeredForm");
  userName.addEventListener('click' , UserNameForm  ) 
    
  function UserNameForm(){
    userNameInput = registeredUserName.value
   
    if (userNameInput){
    localStorage.setItem('Username', userNameInput);
      console.log( localStorage.Username)
      form.style.display="none" 
       theme.style.display="block"
    }
        
  else {
  console.log("please fill the username ")
   }
   
  } 
  
//select the theme button
var  theme = document.getElementById("theme");
theme.addEventListener('click' , showTheme  ) ; 
theme.style.display="none"

function showTheme (event) {
  var selectedTheme = event.target    
  if (selectedTheme.classList.contains("buttonThemeSnow")){
      page.style.backgroundColor="red"
  }
 else if (selectedTheme.classList.contains("buttonThemeSpace")){
      page.style.backgroundColor="green"
  }
  theme.style.display="none"
  level.style.display="block"

  event.stopPropagation()
}

 //select the level button
var level = document.getElementById("level");
level.style.display="none"
level.addEventListener('click', showLevel)
   
function showLevel(event) {
    startGame.style.display="block"
    level.style.display="none" 
    var selectedLevel = event.target

    if (selectedLevel.classList.contains("buttonLevelMedium")){
        ball.velocityX = 7
        ball.velocityY =  7
        ball.speed= 10 
        ball.color="blue"
       
        
    }
   else if (selectedLevel.classList.contains("buttonLevelHard")){
        ball.velocityX = 15
        ball.velocityY =  7
        ball.speed= 15
        ball.color="green" 
        console.log(ball.speed)
    }
   else{
       ball.color="yellow"
   }
    event.stopPropagation()
}  
 // exit
 var  startGame = document.getElementById("startGame");
 startGame.style.display="none"
 startGame.addEventListener('click', start )
  
  function start(){
    startGame.style.display="none"
    canvas.style.display="block"
    exit.style.display="block" 
    highScore.style.display="block"
  }

  // exit
 var  exit = document.getElementById("exit");
 exit.style.display="none"
  exit.addEventListener('click', exitButton )
  
  function exitButton(){
    level.style.display="block" 
    canvas.style.display="none"
    exit.style.display="none" 
  }

   // exit
 var  highScore = document.getElementById("highScore");
 var  score = document.getElementsByClassName("score")
 highScore.style.display="none"
  highScore.addEventListener('click', scoreButton )
  
  function scoreButton(){
    level.style.display="block" 
    canvas.style.display="none"
    exit.style.display="none" 
    highScore.style.display="none" 
    
    userScore = user.score
    userName = localStorage.Username,
    comScore = com.score
    comName =  "com"
    if(userName  && userScore)
    localStorage.setItem(userName, userScore);
  
    if(comName  && comScore)
    localStorage.setItem(comName, comScore);
   
     
    
    for(var i = 0; i<localStorage.length; i++){
        var key = localStorage.key(i)
        var value = localStorage.getItem(key)
         console.log( key + value )
        
    }
     
  }

// select canvas element
var  canvas = document.getElementById("myCanvas");
 canvas.style.display="none"

 
// getContext of canvas = methods and properties to draw and do a lot of thing to the canvas
var ctx = canvas.getContext('2d');

var winnerScore = 2;

var showingWinScreen = false;


// Ball object
var  ball = {
    x : canvas.width/2,
    y : canvas.height/2,
    radius : 10,
    velocityX : 0,
    velocityY : 0,
    speed : 5,
    color : "#A3FF24",
}

// User Paddle
var  user = {
    x : 40, // left side of canvas
    y : (canvas.height - 100)/2, // -100 the height of paddle
    width : 10,
    height : 100,
    score : 0,
    color : "#A3FF24",
}

// COM Paddle
var  com = {
    x : canvas.width - 40, // - width of paddle
    y : (canvas.height - 100)/2, // -100 the height of paddle
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



// draw a rectangle, will be used to draw paddles
function drawRect(x, y, w, h, color){
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}

// draw circle, will be used to draw the ball
function drawArc(x, y, r, color){
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x,y,r,0,Math.PI*2,true);
    ctx.closePath();
    ctx.fill();
}
// draw the net
function drawNet(){
    for(let i = 0; i <= canvas.height; i+=15){
        drawRect(net.x, net.y + i, net.width, net.height, net.color);
    }
}

// draw text
function drawText(text,x,y){
    ctx.fillStyle = "#A3FF24";
    ctx.font = "20px fantasy";
    ctx.fillText(text, x, y);
} 


// listening to the mouse
canvas.addEventListener('click',startMouseClick);

function startMouseClick(evt) {
    
    if(ball.velocityX === 0 && ball.velocityY === 0){
        ball.velocityX = 7
        ball.velocityY =  7
        ball.speed= 10   
       
    }

 
}
canvas.addEventListener("mousemove", mousePos);

function mousePos(evt){
    let rect = canvas.getBoundingClientRect();
    user.y = evt.clientY - rect.top - user.height/2;
}
canvas.addEventListener('mousedown',handleMouseClick);
function handleMouseClick(evt) {
    if(showingWinScreen){
        user.score = 0;
        com.score = 0;
        showingWinScreen = false;
    }
}
// when COM or USER scores, we reset the ball
function resetBall(){
    if (user.score >= winnerScore ||
        com.score >= winnerScore) {
            showingWinScreen = true;
    }

    ball.x = canvas.width/2;
    ball.y = canvas.height/2;
    ball.velocityX = 0;
    ball.velocityY = 0;
    ball.speed = 7;
}
// collision detection

function collision(b,p){
    p.top = p.y;
    p.bottom = p.y + p.height;
    p.left = p.x;
    p.right = p.x + p.width;
    
    b.top = b.y - b.radius;
    b.bottom = b.y + b.radius;
    b.left = b.x - b.radius;
    b.right = b.x + b.radius;
    
    if(p.left < b.right && p.top < b.bottom && p.right > b.left && p.bottom > b.top){
        ball.velocityX = -ball.velocityX;
    } ;
}
// update function, the function that does all calculations



function update(){
    
    if(showingWinScreen){
        return;
    } 
  // change the score of players, if the ball goes to the left "ball.x<0" computer win, else if "ball.x > canvas.width" the user win
  if( ball.x - ball.radius < 0 ){
    com.score++;
    resetBall();
}else if( ball.x + ball.radius > canvas.width){
    user.score++;
    resetBall();
}
    // the ball has a velocity
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
    
    // when the ball collides with bottom and top walls we inverse the x and y velocity.
    if(ball.x  < 0 || ball.x  > canvas.width){
        ball.velocityX = -ball.velocityX;
    }

    if(ball.y  < 0 || ball.y  > canvas.height){
        ball.velocityY = -ball.velocityY;
    }
    // computer movemnt
    com.y = ball.y

    
   
    // we check if the paddle hit the user or the com paddle
    let player = (ball.x  < canvas.width/2) ? user : com;
    
    // if the ball hits a paddle
    if(collision(ball,player)){
    
  // we check where the ball hits the paddle
        let collidePoint = (ball.y - (player.y + player.height/2));
        collidePoint = collidePoint / (player.height/2);
        
        // when the ball hits the top of a paddle we want the ball, to take a -45degees angle
        // when the ball hits the center of the paddle we want the ball to take a 0degrees angle
        // when the ball hits the bottom of the paddle we want the ball to take a 45degrees
        // Math.PI/4 = 45degrees
        let angleRad = (Math.PI/4) * collidePoint;
        
        // change the X and Y velocity direction
        let direction = (ball.x + ball.radius < canvas.width/2) ? 1 : -1;
        ball.velocityX = direction * ball.speed * Math.cos(angleRad);
        ball.velocityY = ball.speed * Math.sin(angleRad);
        
        // speed up the ball everytime a paddle hits it.
        ball.speed += 0.1;
    }
    
  
}

// render function, the function that does al the drawing
function render(){
    
    // clear the canvas
    drawRect(0, 0, canvas.width, canvas.height, "#000");
    if(showingWinScreen){
        if (user.score >= winnerScore){
            ctx.fillStyle = '#A3FF24';
            ctx.fillText(user.name,canvas.width/2,canvas.height/3);
           

        } else if (com.score >= winnerScore) {
            ctx.fillStyle = '#A3FF24';
            ctx.fillText("Com Win",canvas.width/2,canvas.height/3);
        }
        ctx.fillStyle = '##A3FF24';
        ctx.fillText("click to continue",canvas.width/2,canvas.height/2);
        return;
    }
    
    // draw the user score to the left
    drawText(user.score,canvas.width/4,canvas.height/5);
    
    // draw the COM score to the right
    drawText(com.score,3*canvas.width/4,canvas.height/5);
  
    // draw the user name to the left
    drawText(localStorage.Username,canvas.width/7,canvas.height/5);
  
   
     // draw the user name to the left
     drawText("com",3*canvas.width/5,canvas.height/5);
    
    
    
    // draw the net
    drawNet();
    
    // draw the user's paddle
    drawRect(user.x, user.y, user.width, user.height, user.color);
    
    // draw the COM's paddle
    drawRect(com.x, com.y, com.width, com.height, com.color);
    
    // draw the ball
    drawArc(ball.x, ball.y, ball.radius, ball.color);
     
}
function game(){
    update();
    render();
}
// number of frames per second
let framePerSecond = 50;

//call the game function 50 times every 1 Sec
let loop = setInterval(game,1000/framePerSecond);

