const options = ["rock", "paper", "scissors"];

function getComputerChoice (){
    const choice = options[Math.floor(Math.random() * options.length)];
    return choice;
}

let playerScore = 0;
let computerScore = 0;

function playRound (playerSelection, computerSelection) {

    if (playerSelection == computerSelection){
        return "You tie!";
    }

    else if (playerSelection == "rock" && computerSelection == "scissors"){
        playerScore += 1;
        return `You win! Rock beats scissors` 
    }    
    
    else if (playerSelection == "rock" && computerSelection == "paper"){
        computerScore += 1;
        return `You lose! Paper beats rock`
    }
    
    else if (playerSelection == "scissors" && computerSelection == "paper"){
        playerScore += 1;
        return `You win! Scissors beats paper`
    }

    else if (playerSelection == "scissors" && computerSelection == "rock"){
        return `You lose! Rock beats scissors`
        computerScore += 1;
    }

    else if (playerSelection == "paper" && computerSelection == "rock"){
        playerScore += 1;
        return `You win! Paper beats rock`
    }

    else if (playerSelection == "paper" && computerSelection == "scissors"){
        computerScore += 1;
        return `You lose! Scissors beats paper`
    }
    else {
        return `Please enter a valid choice, ya dummy!`
    }
}



function game(){
    for (let i = 0; i < 5; i++) {
    const computerSelection = getComputerChoice ();
    let playerSelection = prompt("Choose, bitch")
    playerSelection =  playerSelection.toLowerCase();
    playRound()
    console.log(playRound(playerSelection, computerSelection));
    console.log("Your score is " + playerScore);
    console.log("The computer\'s score is " + computerScore);
}      
    if (playerScore > computerScore){
        console.log(`Player wins the round!`)
    }
    else if (playerScore < computerScore){
        console.log(`Computer wins the round!`)
    }
    else {
        console.log(`The round is a tie!`)
    }
}

game()







