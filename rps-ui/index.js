const options = ["rock", "paper", "scissors"];
const buttons = document.getElementById('buttonContainer').querySelectorAll('button');
const results = document.querySelector('#results');
const score = document.querySelector('#score');
const gameResults = document.querySelector('#gameResults');

const canvas = document.querySelector('.canvas');
const userContainer = document.querySelector('.user-container');

const newGame = document.getElementById('newGame').querySelector('button');
newGame.style.display = 'none';

const tableHit = new Audio('sounds/tablehit.mp3');

function resetAnimation() { 
const userFist = document.createElement('img');
userFist.src = "images/left-rock.png";
userContainer.appendChild(userFist);
userFist.classList.add('user-fist-intro');
userFist.classList.add('user-fist');
setTimeout(function(){
    userFist.classList.add('user-fist-float');
  },2400);
}

resetAnimation()

function resetGame(){
    newGame.style.display = 'block';
}

let userScore = 0;
let cpuScore = 0;

function getCpuSelection(){
    const selection = options[Math.floor(Math.random() * options.length)];
    return selection;
}

function gameStatus(){
    if (userScore === 5){
        gameResults.textContent = "You win the game!";
        gameOver();
        resetGame();
    } else if (cpuScore === 5){
        gameResults.textContent = "The Computer wins the game!";
        gameOver();
        resetGame();
    }
}

function gameOver(){
    const buttonContainer = document.querySelector('#buttonContainer')
    buttonContainer.style.display = 'none';
}

newGame.addEventListener('click', () => {
    buttonContainer.style.display = 'block';
    newGame.style.display = 'none';
    userScore = 0;
    cpuScore = 0
    score.textContent = `Your score: ${userScore}, Computer score: ${cpuScore}.`;
    results.textContent = "";
    gameResults.textContent = "";
  });

function playRound (userSelection, cpuSelection) {
        
    //combinations where user and cpu tie:
    
    if ((userSelection == "rock") && (cpuSelection == "rock")){
            userRockAnimation();
            //cpuRockAnimation();
            results.textContent = `You both selected rock! It\'s a tie!`;
    } else if ((userSelection == "paper") && (cpuSelection == "paper")){
            userPaperAnimation();
            //cpuPaperAnimation();
            results.textContent = `You both selected paper! It\'s a tie!`;
    } else if ((userSelection == "scissors") && (cpuSelection == "scissors")){
            userScissorsAnimation();
            //cpuScissorsAnimation();
            results.textContent = `You both selected scissors! It\'s a tie!`;

    //combinations where user beats cpu:
    
    } else if ((userSelection == "rock" && cpuSelection == "scissors")){
            userRockAnimation();
            //cpuScissorsAnimation();
            userScore += 1;
            results.textContent = `You selected rock and the computer selected scissors! You win!`;
    } else if ((userSelection == "paper" && cpuSelection == "rock")){
            userPaperAnimation();
            //cpuRockAnimation();
            userScore += 1;
            results.textContent = `You selected paper and the computer selected rock! You win!`;
    } else if ((userSelection == "scissors" && cpuSelection == "paper")){
            userScissorsAnimation();
            //cpuPaperAnimation();
            userScore += 1;
            results.textContent = `You selected scissors and the computer selected paper! You win!`;
    
    //combinations where user loses to cpu:
    
    } else if ((userSelection == "rock" && cpuSelection == "paper")){
            userRockAnimation();
            //cpuPaperAnimation();
            cpuScore += 1;
            results.textContent = `You selected rock and the computer selected paper! You lose!`;
    } else if ((userSelection == "paper" && cpuSelection == "scissors")){
            userPaperAnimation();
            //cpuScissorsAnimation();
            cpuScore += 1;
            results.textContent = `You selected paper and the computer selected scissors! You lose!`;
    } else if ((userSelection == "scissors" && cpuSelection == "rock")){
            userScissorsAnimation();
            //cpuRockAnimation();
            cpuScore += 1;
            results.textContent = `You selected scissors and the computer selected rock! You lose!`;
    }
       
    score.textContent = `Your score: ${userScore}, Computer score: ${cpuScore}.`;

        gameStatus();
        //resetFist();
    }  

function shakeFist() {
    const userFist = document.querySelector('.user-fist');
    userFist.classList.remove('shake-fist');
    setTimeout(function(){
        userFist.classList.add('shake-fist');
      },10);
   }

  

function shakeCanvas() {
    canvas.classList.remove('shake-canvas');
    setTimeout(function(){
        canvas.classList.add('shake-canvas');
      },10);
   }

buttons.forEach((button) => {
        button.addEventListener('click', () => {
            shakeCanvas(), shakeFist();
      });
    });

function userRockAnimation() {
    const userRock = document.createElement('img');
    userContainer.appendChild(userRock);
    userRock.src = "images/left-rock.png";
    userRock.classList.add("user-rock", "user-movement")
}

function userPaperAnimation() {
    const userPaper = document.createElement('img');
    userContainer.appendChild(userPaper);
    userPaper.src = "images/left-paper.png";
    userPaper.classList.add("user-paper", "user-movement")
}

function userScissorsAnimation() {
    const userScissors = document.createElement('img');
    userContainer.appendChild(userScissors);
    userScissors.src = "images/left-scissors.png";
    userScissors.classList.add("user-scissors", "user-movement")
}
    

//function resetFist (){
  //  setTimeout(function(){
    //userFist.classList.remove('shake-fist');
   // },5000);
//}
    
    
buttons.forEach((button) => {
  button.addEventListener('click', () => {
    playRound(button.value, getCpuSelection())
    });
});




















