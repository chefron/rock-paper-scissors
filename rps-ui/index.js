const options = ["rock", "paper", "scissors"];

function getComputerSelection (){
    const selection = options[Math.floor(Math.random() * options.length)];
    return selection;
}

let playerScore = 0;
let computerScore = 0;

const results = document.querySelector('#results');
const gameResults = document.querySelector('#gameResults');

function gameStatus (){
    if (playerScore === 5){
        gameResults.textContent = "You win the game!";
        
    } else if (computerScore === 5){
        gameResults.textContent = "The Computer wins the game!";
    }
}

function playRound (playerSelection, computerSelection) {
        if (playerSelection == computerSelection){
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


const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
button.addEventListener('click', () => {
    playRound(button.value, getComputerSelection())
  });
});









