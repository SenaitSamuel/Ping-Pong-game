// Listening to the mouse for welcomepage
welcomePage.addEventListener('click', function(){
    welcomePage.style.display="none"
    aboutPage.style.display="block"
    page.classList.add("aboutPage")
    page.classList.remove("pageWrapper")
})
 
// Listening to the mouse for  about page
aboutPage.addEventListener('click', showAboutPage )

function showAboutPage(){
    var selectedPage = event.target 
    console.log(selectedPage)   
    if (selectedPage.classList.contains("playButton")){
        aboutPage.style.display="none"
        form.style.display="block"  
        console.log("playclick")
        console.log(selectedPage) 
    }
   else if (selectedPage.classList.contains("aboutGameButton ")){
    aboutPage.style.display="none"
    aboutGame.style.display="block"
    console.log("aboutgame")
    console.log(selectedPage) 
    }
    else{
        howTOPlay.style.display="block"
        aboutPage.style.display="none"
        console.log("how to play")
        console.log(selectedPage) 
    }
   
    event.stopPropagation()
    
}
 
// Listening to the mouse for about the game

aboutGame.addEventListener('click', aboutButton)
function aboutButton(){
    aboutGame.style.display="none"
    aboutPage.style.display="block"
}

// Listening to the mouse for about the game

howTOPlay.addEventListener('click', InfoButton )

function InfoButton(){
    selectedHowToPlay = event.target
    if (selectedHowToPlay.classList.contains("playButton")){
        howTOPlay.style.display="none"
        form.style.display="block"  
        console.log(selectedHowToPlay)
    }
    else{
        howTOPlay.style.display="none"
        aboutPage.style.display="block"
        console.log(selectedHowToPlay)
    }
   
}

// localStorage for saving highScore

 function savaHighScore(){
    var  userNameInput = registeredUserName.value
    var userScore = user.score
    var userList = localStorage.getItem('userScore')
    arr = [];
    if (userList)   // initialize if null
    arr = userList.split(",")
    arr.push( `<th>${userNameInput} </th>  <td> ${userScore} </td>  `);
    arr.sort()
    userList = arr.join("<br>");
    console.log(arr.sort())

    localStorage.setItem("userScore", userList);

    // List of all entries
    console.log(localStorage.getItem("userScore"));


};

 
// Listening to  for username

 var  registeredUserName = document.getElementById("registeredUserName");
 var error = document.querySelector(".error-message")
  var userName= document.getElementById("registeredForm");
  userName.addEventListener('click' , UserNameForm  ) 
  
  function UserNameForm(e){ 
     e.preventDefault();

    if(registeredUserName.value == " "){
        error.style.display=" block"
       theme.style.display=" none"
    }
   else{
    localStorage.setItem("entry", registeredUserName.value);
    form.style.display="none" 
    theme.style.display="inline-block"

    console.log(localStorage.getItem("entry"));
   }
   
    }
   

// Listening to the mouse for theme button
theme.addEventListener('click' , showTheme  ) ; 

function showTheme (event) {
  var selectedTheme = event.target    
  if (selectedTheme.classList.contains("buttonThemeSnow")){
    page.classList.add("themeSand")
    page.classList.remove("pageWrapper")
    page.classList.remove("themeSpace")     
  }
 else if (selectedTheme.classList.contains("buttonThemeSpace")){
    page.classList.add("themeSpace")
    page.classList.remove("pageWrapper")
    page.classList.remove("themeSand")
  }
  theme.style.display="none"
  canvas.style.display="none"
  level.style.display="inline-block" 
  

  event.stopPropagation()
}

// Listening to the mouse for Level button

 level.addEventListener('click', showLevel)
    
 function showLevel(event) {
     level.style.display="none" 
     theme.style.display="none";
     canvas.style.display="block"
     exit.style.display="inline-block" 
   highScoreList.style.display="inline-block"
  
     console.log(event)
     diffuclity()
     
 }        
 
 function diffuclity(){
    var selectedLevel = event.target
  
     console.log(selectedLevel)
    event.preventDefault()
 
    if (selectedLevel.classList.contains("buttonLevelMedium")) {
      
        
        console.log(ball.velocityX)
        console.log(ball.velocityY )
        canvas.classList.add("levelMedium")
        canvas.classList.remove("levelHard")
        canvas.classList.remove("levelEsay")
       
    }   
    
   else if (selectedLevel.classList.contains("buttonLevelHard")) {
   
        
        canvas.classList.add("levelHard")
        canvas.classList.remove("levelMedium")
        canvas.classList.remove("levelEsay")
        console.log(ball.velocityX )
        console.log(ball.velocityY )
    }
   else{
  
    canvas.classList.add("levelEsay")
    canvas.classList.remove("levelMedium")
    canvas.classList.remove("levelHard")
    console.log(ball.velocityX )
    console.log(ball.velocityY )
   }
    event.stopPropagation()
  

 }
 

  // Listening to the mouse for exit button

  exit.addEventListener('click', exitButton )
  
  function exitButton(){
    level.style.display="block" 
    canvas.style.display="none"
    exit.style.display="none" 
    highScoreList.style.display="none"
  }

  
// Listening to the mouse for highscore
 
 highScoreList.addEventListener('click', scoreButton )
 var  score = document.getElementById("score")

  function scoreButton(){
    canvas.style.display="none"
    exit.style.display="none" 
    highScoreList.style.display="none"
    tableList.style.display="block"
     score.innerHTML= ""
    
     savaHighScore()
     if (typeof (localStorage.getItem("userScore")) != null && (localStorage.length != 0)){
        var user = localStorage.getItem('userScore');

          score.innerHTML += user;
        
        } 
     }
 // Listening to the mouse for back to page\
     tableList.addEventListener('click', playAgain )
     function  playAgain(){
        canvas.style.display="block"
        exit.style.display="inline-block" 
        highScoreList.style.display="inline-block"
        tableList.style.display="none"
     
}
      
 
     
 