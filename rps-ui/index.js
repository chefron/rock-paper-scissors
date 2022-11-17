const options = ["rock", "paper", "scissors"];
const buttons = document.getElementById('buttonContainer').querySelectorAll('button');
const results = document.querySelector('#results');
const gameResults = document.querySelector('#gameResults');

const canvas = document.querySelector('.canvas');
const userContainer = document.querySelector('.user-container');

const newGame = document.getElementById('newGame').querySelector('button');
newGame.style.display = 'none';

const tableHit = new Audio('sounds/tablehit.mp3');

function resetAnimation () { 
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

let playerScore = 0;
let computerScore = 0;

function getComputerSelection (){
    const selection = options[Math.floor(Math.random() * options.length)];
    return selection;
}

function gameStatus (){
    if (playerScore === 5){
        gameResults.textContent = "You win the game!";
        gameOver();
        resetGame();
    } else if (computerScore === 5){
        gameResults.textContent = "The Computer wins the game!";
        gameOver();
        resetGame();
    }
}

function gameOver (){
    const buttonContainer = document.querySelector('#buttonContainer')
    buttonContainer.style.display = 'none';
}

newGame.addEventListener('click', () => {
    buttonContainer.style.display = 'block';
    newGame.style.display = 'none';
    playerScore = 0;
    computerScore = 0
    score.textContent = `Your score: ${playerScore}, Computer score: ${computerScore}.`;
    results.textContent = "";
    gameResults.textContent = "";
  });

function playRound (playerSelection, computerSelection) {

        if (playerSelection == "paper"){
            userPaperAnimation ();
    
        } else if (playerSelection == "rock"){
            userRockAnimation ();
        
        } else if (playerSelection == "scissors"){
            userScissorsAnimation ();
        }

        else if (playerSelection == computerSelection){
            results.textContent = `You both selected ${playerSelection}! It\'s a tie!`;
        } 
  
        else if ((playerSelection == "rock" && computerSelection == "scissors") || (playerSelection == "scissors" && computerSelection == "paper") || (playerSelection == "paper" && computerSelection == "rock")){
           playerScore += 1;
            results.textContent = `You selected ${playerSelection} and the computer selected ${computerSelection}. You win!`;
        }    
        
        else if ((playerSelection == "rock" && computerSelection == "paper") || (playerSelection == "paper" && computerSelection == "scissors") || (playerSelection == "scissors" && computerSelection == "rock")){
            computerScore += 1;
            results.textContent = `You selected ${playerSelection} and the computer selected ${computerSelection}. You lose!`;
        }
        
        const score = document.querySelector('#score');
        score.textContent = `Your score: ${playerScore}, Computer score: ${computerScore}.`;

        gameStatus();
        //resetFist();
    }  

function shakeFist () {
    const userFist = document.querySelector('.user-fist');
    userFist.classList.remove('shake-fist');
    setTimeout(function(){
        userFist.classList.add('shake-fist');
      },10);
   }

  

function shakeCanvas () {
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

function userRockAnimation () {
    const userRock = document.createElement('img');
    userContainer.appendChild(userRock);
    userRock.src = "images/left-rock.png";
    userRock.classList.add("user-rock", "user-movement")
}

function userPaperAnimation () {
    const userPaper = document.createElement('img');
    userContainer.appendChild(userPaper);
    userPaper.src = "images/left-paper.png";
    userPaper.classList.add("user-paper", "user-movement")
}

function userScissorsAnimation () {
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
    playRound(button.value, getComputerSelection())
    });
});




















