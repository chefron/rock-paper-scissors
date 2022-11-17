const options = ["rock", "paper", "scissors"];
const buttons = document.getElementById('buttonContainer').querySelectorAll('button');
const results = document.querySelector('#results');
const gameResults = document.querySelector('#gameResults');

const canvas = document.querySelector('.canvas');

const leftHandContainer = document.querySelector('.left-hand-container');





const tableHit = new Audio('sounds/tablehit.mp3');

function resetAnimation () { 
const leftFist = document.createElement('img');
leftFist.src = "images/left-rock.png";
leftHandContainer.appendChild(leftFist);
leftFist.classList.add('left-fist-intro');
leftFist.classList.add('left-fist');
setTimeout(function(){
    leftFist.classList.add('left-fist-float');
  },2400);
}

resetAnimation()






function getComputerSelection (){
    const selection = options[Math.floor(Math.random() * options.length)];
    return selection;
}

let playerScore = 0;
let computerScore = 0;





function resetGame(){
    newGame.style.display = 'block';
}


function gameOver (){
    const buttonContainer = document.querySelector('#buttonContainer')
    buttonContainer.style.display = 'none';
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


const newGame = document.getElementById('newGame').querySelector('button');
newGame.style.display = 'none';

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
            leftPaperAnimation ();
    
        } else if (playerSelection == "rock"){
            leftRockAnimation ();
        
        } else if (playerSelection == "scissors"){
            leftScissorsAnimation ();
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
    const leftFist = document.querySelector('.left-fist');
    leftFist.classList.remove('shake-fist');
    setTimeout(function(){
        leftFist.classList.add('shake-fist');
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

function leftRockAnimation () {
    const leftRock = document.createElement('img');
    leftRock.src = "images/left-rock.png";
    leftRock.classList.add("left-rock", "left-movement")
    leftHandContainer.appendChild(leftRock);
}

function leftPaperAnimation () {
    const leftPaper = document.createElement('img');
    leftHandContainer.appendChild(leftPaper);
    leftPaper.src = "images/left-paper.png";
    leftPaper.classList.add("left-paper", "left-movement")
}

function leftScissorsAnimation () {
    const leftScissors = document.createElement('img');
    leftHandContainer.appendChild(leftScissors);
    leftScissors.src = "images/left-scissors.png";
    leftScissors.classList.add("left-scissors", "left-movement")
}
    

//function resetFist (){
  //  setTimeout(function(){
    //leftFist.classList.remove('shake-fist');
   // },5000);
//}
    
    
buttons.forEach((button) => {
  button.addEventListener('click', () => {
    playRound(button.value, getComputerSelection())
    });
});




















