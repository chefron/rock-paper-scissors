const options = ["rock", "paper", "scissors"];

function getComputerSelection (){
    const selection = options[Math.floor(Math.random() * options.length)];
    return selection;
}

let playerScore = 0;
let computerScore = 0;

const results = document.querySelector('#results');
const gameResults = document.querySelector('#gameResults');



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


  function leftPaperAnimation () {
    const leftHandContainer = document.querySelector('.left-hand-container')
    const leftPaper = document.createElement('img');
    leftPaper.src = "images/left-paper.png";
    leftPaper.classList.add("left-paper")
    leftHandContainer.appendChild(leftPaper);
}


function playRound (playerSelection, computerSelection) {

        if (playerSelection == "paper"){
            leftPaperAnimation ();
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
    }  


function shake () {
    const leftFist = document.querySelector('.left-fist');
    leftFist.style.animationName = 'shake';
    leftFist.style.animationIterationCount = 1;
   }





const buttons = document.getElementById('buttonContainer').querySelectorAll('button');
buttons.forEach((button) => {
button.addEventListener('click', () => {
    playRound(button.value, getComputerSelection()), shake();
  });
});



















