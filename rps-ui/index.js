const options = ["rock", "paper", "scissors"];
const gameButtons = document.getElementById('game-button-container').querySelectorAll('button');
const gameButtonContainer = document.getElementById('game-button-container');
const gameButtonText = document.getElementById('game-button-text')

const gameOverModalContainer = document.getElementById('game-over-modal-container');
const gameOverModal = document.getElementById('game-over-modal');
const gameOverModalTitle = document.createElement('p');

const infoOverlay = document.getElementById('info-overlay');
const infoModal = document.getElementById('info-modal');
//const infoModalInner = document.getElementById('info-modal-inner');

function openInfoModal() {
    infoOverlay.style.display = 'flex';
    infoModal.style.display = 'block';
 //   infoModalInner.style.display = 'block';
}


const userHealth = document.getElementById("user-health");
const cpuHealth = document.getElementById("cpu-health");

const userContainer = document.getElementById("user-container");
const cpuContainer = document.getElementById("cpu-container");

const canvas = document.getElementById("canvas");

const userFist = document.createElement('img');
const cpuFist = document.createElement('img');

const lightsOnSfx = new Audio('sounds/light-turning-on.mp3');
const backgroundSfx = new Audio('sounds/background.mp3');
backgroundSfx.volume = 0.8;

let soundOn = true;

function playBackgroundSfx(){
    if (soundOn){
    backgroundSfx.play();
    }
}

function toggleSound(){
    if (soundOn){
        soundOn = false;
    } else if (!soundOn){
        soundOn = true;
    }
}


function turnSoundOn(){}

let numberOfRounds;
let userHealthCopy; //Background user score to circumvent animation delays
let cpuHealthCopy; //Background cpu score to circumvent animation delays
let userScore = 0; //keeps count of how many rounds won
let cpuScore = 0 //see above

function playTablePoundsSfx() {
    const tablePounds = new Audio('sounds/table-pounds-1.mp3');
    tablePounds.volume = 0.4;
    if (soundOn) {
        tablePounds.play();
    }
}

// Asks user to input number of rounds, which dictates initial score
function getNumberOfRounds() {
    numberOfRounds = document.getElementById('number-of-rounds').value;
    userHealth.value = Math.floor((numberOfRounds / 2)+1);
    userHealth.max = Math.floor((numberOfRounds / 2)+1);
    cpuHealth.value = Math.floor((numberOfRounds / 2)+1);
    cpuHealth.max = Math.floor((numberOfRounds / 2)+1);
    userHealthCopy = Math.floor((numberOfRounds / 2)+1);
    cpuHealthCopy = Math.floor((numberOfRounds / 2)+1);
}

function exitStartScreen () {
    const startScreen = document.getElementById('start-game-screen');
    startScreen.classList.add('cinematic-wipe');
    const inputRoundsContainer = document.getElementById('input-rounds-container');
    const soundToggleContainer = document.getElementById('sound-toggle-container');
    const playButtonContainer = document.getElementById('play-button-container');
    inputRoundsContainer.style.display='none';
    soundToggleContainer.style.display='none';
    playButtonContainer.style.display='none';

}


function dropFists() {
    userFist.src = 'images/left-rock.png';
    cpuFist.src = 'images/right-rock.png';
    userContainer.appendChild(userFist);
    cpuContainer.appendChild(cpuFist);
    userFist.classList.add('user-fist-intro', 'user-fist');
    cpuFist.classList.add('cpu-fist-intro', 'cpu-fist');
    setTimeout(function(){
        userFist.classList.add('user-fist-float');
        cpuFist.classList.add('cpu-fist-float');
    },2000);
}

//the first time fists are shown the timing is staggered
function dropFistsInitial() {
    userFist.src = 'images/left-rock.png';
    cpuFist.src = 'images/right-rock.png';
    userContainer.appendChild(userFist);
    setTimeout(function(){
        cpuContainer.appendChild(cpuFist);
    }, 600);
    userFist.classList.add('user-fist-intro', 'user-fist');
    setTimeout(function(){
        cpuFist.classList.add('cpu-fist-intro', 'cpu-fist');
    }, 600);
    setTimeout(function(){
        userFist.classList.add('user-fist-float');
        cpuFist.classList.add('cpu-fist-float');
    }, 1600);
}

//displays game buttons for the first time
function displayGameButtonsInitial () {
    setTimeout(function(){
        gameButtonContainer.style.display='flex';
        gameButtonText.style.display='block';
    }, 3000);
}


const userName = document.getElementById('user-name');
const cpuName = document.getElementById('cpu-name');

//the players' names and scores appear in sync with the fists
function displayPlayerNames(){
    setTimeout(function(){
        userName.style.display = 'inline';
    }, 1000);
    setTimeout(function(){
        cpuName.style.display = 'inline';
    }, 1600);
}

function awardUserPoint(){
    userName.textContent = `YOU: ${userScore}`;
}

function awardCpuPoint(){
    cpuName.textContent = `THEM: ${cpuScore}`;
}

function displayHealthContainer(){
    setTimeout(function(){
        healthContainer.style.display = 'flex';
    }, 3000);
}

const title = document.getElementById('title');
const rockTitle = document.getElementById('rock-title');
const paperTitle = document.getElementById('paper-title');
const scissorsTitle = document.getElementById('scissors-title');
const healthTitle = document.getElementById('health-title');
const healthContainer = document.getElementById('health-container');
const userHealthContainer = document.getElementById('user-health-container');
const cpuHealthContainer = document.getElementById('cpu-health-container');
const footer = document.getElementById('footer')

function lightUpTitles(){
    setTimeout(function(){
        rockTitle.classList.remove('dim-text');
        rockTitle.classList.add('light-up-text');
        paperTitle.classList.remove('dim-text');
        paperTitle.classList.add('light-up-text');
        scissorsTitle.classList.remove('dim-text');
        scissorsTitle.classList.add('light-up-text');
        title.classList.add('light-up-border');
    }, 2250);
    setTimeout(function(){
        healthContainer.classList.remove('dim-text');
        healthContainer.classList.add('footer-box-shadow')
    }, 3000);
}





function resetFists(){
    userFist.classList.remove('user-fist-intro', 'shake-user-fist', 'user-fist-float');
    cpuFist.classList.remove('cpu-fist-intro', 'shake-cpu-fist', 'cpu-fist-float');
    userContainer.innerHTML = '';
    cpuContainer.innerHTML = '';
}

let isGameOver = false;

function getCpuSelection(){
    const selection = options[Math.floor(Math.random() * options.length)];
    return selection;
}

function gameStatus(){
    if (cpuHealthCopy === 1){
        isGameOver = true;
        displayUserWinsModal(); 
    } else if (userHealthCopy === 1){
        isGameOver = true;
        displayUserLosesModal();
    }
}

//Hide game buttons and display User Wins Modal in their place
function displayUserWinsModal(){
    setTimeout(function(){
        hideGameButtons();
    },2000);
    gameOverModalContainer.style.display = "block";
    gameOverModalContainer.classList.add("fade-in-modal");
    gameOverModalTitle.classList.add("win-title");
    gameOverModal.prepend(gameOverModalTitle);
    gameOverModalTitle.innerHTML = "YOU WIN!";
    playAgain.style.display = "block";

}

//hide game buttons and display User Loses Modal in their place
function displayUserLosesModal(){
    setTimeout(function(){
        hideGameButtons();
    },2000);
    gameOverModalContainer.style.display = "block";
    gameOverModalContainer.classList.add("fade-in-modal");
    gameOverModalTitle.classList.add("lose-title");
    gameOverModal.prepend(gameOverModalTitle);
    gameOverModalTitle.innerHTML = "YOU LOSE";
    playAgain.style.display = "block";
}

function removeGameButtons(){
    gameButtonContainer.innerHTML = '';
}

const playAgain = document.getElementById('play-again-button');
playAgain.addEventListener('click', resetGame);

function resetGame() {
    isGameOver = false;
    getNumberOfRounds();
    userScore = 0;
    cpuScore = 0;
    userName.textContent = `YOU`;
    cpuName.textContent = `THEM`;
}

playAgain.addEventListener('click', resetModal);

//hide and reset Modal for next round
function resetModal() {
    gameOverModalContainer.style.display='none';
    gameOverModalTitle.className = ''
    gameOverModalTitle.innerHTML = '';
    gameOverModal.removeChild(gameOverModalTitle)
}

playAgain.addEventListener('click', resetGame);
playAgain.addEventListener('click', resetFists);
playAgain.addEventListener('click', dropFists)              
playAgain.addEventListener('click', displayGameButtons);

function playRound (userSelection, cpuSelection) {
        
    //combinations where user and cpu tie:
    if ((userSelection == "rock") && (cpuSelection == "rock")){
            userRockAnimation();
            cpuRockAnimation();
    } else if ((userSelection == "paper") && (cpuSelection == "paper")){
            userPaperAnimation();
            cpuPaperAnimation();
    } else if ((userSelection == "scissors") && (cpuSelection == "scissors")){
            userScissorsAnimation();
            cpuScissorsAnimation();

    //combinations where user beats cpu:
    } else if ((userSelection == "rock" && cpuSelection == "scissors")){
            userRockAnimation();
            cpuScissorsAnimation();
            userScore += 1;
            cpuHealthCopy -= 1;
            setTimeout(function(){
                cpuHealthHit(), awardUserPoint();
            },2750);
    } else if ((userSelection == "paper" && cpuSelection == "rock")){
            userPaperAnimation();
            cpuRockAnimation();
            userScore += 1;
            cpuHealthCopy -= 1;
            setTimeout(function(){
                cpuHealthHit(), awardUserPoint();
            },2750);
    } else if ((userSelection == "scissors" && cpuSelection == "paper")){
            userScissorsAnimation();
            cpuPaperAnimation();
            userScore += 1;
            cpuHealthCopy -= 1;
            setTimeout(function(){
                cpuHealthHit(), awardUserPoint();
            },2750);
            
    //combinations where user loses to cpu:
    } else if ((userSelection == "rock" && cpuSelection == "paper")){
            userRockAnimation();
            cpuPaperAnimation();
            cpuScore += 1;
            userHealthCopy -= 1;
            setTimeout(function(){
                userHealthHit(), awardCpuPoint();
            },2750);
    } else if ((userSelection == "paper" && cpuSelection == "scissors")){
            userPaperAnimation();
            cpuScissorsAnimation();
            cpuScore += 1;
            userHealthCopy -= 1;
            setTimeout(function(){
                userHealthHit(), awardCpuPoint();
            },2750);
    } else if ((userSelection == "scissors" && cpuSelection == "rock")){
            userScissorsAnimation();
            cpuRockAnimation();
            cpuScore += 1;
            userHealthCopy -= 1;
            setTimeout(function(){
                userHealthHit(), awardCpuPoint();
            },2750);
    }

    //check if game is won, lost, or still ongoing
        gameStatus();

    //if game is still ongoing, reset fists and buttons for next round
    if (!isGameOver){
        
        setTimeout(function(){
        resetFists();
        },4700);
       
        setTimeout(function(){
        dropFists();
        },4750);
    
        setTimeout(function(){
        displayGameButtons();
        },5600);
   
    }
        
}  

//dock user health points for a lost round
function userHealthHit () {
    userHealth.value -= 1;
}

//dock CPU health points for a lost round
function cpuHealthHit () {
    cpuHealth.value -= 1;
}

function shakeFists() {
    userFist.classList.remove('shake-user-fist');
    cpuFist.classList.remove('shake-cpu-fist');
    setTimeout(function(){
        userFist.classList.add('shake-user-fist');
        cpuFist.classList.add('shake-cpu-fist');
      },10);
   }
  
function shakeCanvas() {
    canvas.classList.remove('shake-canvas');
    setTimeout(function(){
        canvas.classList.add('shake-canvas');
      },10);
}

function hideGameButtons() {
    gameButtonContainer.classList.remove('fade-in-buttons');
    gameButtonText.classList.remove('fade-in-buttons');
    setTimeout(function(){
        gameButtonText.classList.add('fade-out-text'),
        gameButtonContainer.classList.add('fade-out-buttons');
      },10);
    setTimeout(function(){
        gameButtonContainer.style.display = "none";
      },250);
    
}

function displayGameButtons() {
    gameButtonContainer.style.display = "flex";
    gameButtonContainer.classList.add('fade-in-buttons');
    gameButtonText.classList.add('fade-in-buttons');
    setTimeout(function(){
        gameButtonContainer.classList.remove('fade-out-buttons');
        gameButtonText.classList.remove('fade-out-text');
      },10);
}

gameButtons.forEach((button) => {
        button.addEventListener('click', () => {
            shakeCanvas(), 
            shakeFists(), 
            hideGameButtons(), 
            setTimeout(function(){
                playTablePoundsSfx();
              },510);
      });
    });

function userRockAnimation() {
    const userRock = document.createElement('img');
    userRock.src = "images/left-rock.png";
    userContainer.appendChild(userRock);
    userRock.classList.add("user-rock", "user-movement");
}

function userPaperAnimation() {
    const userPaper = document.createElement('img');
    userPaper.src = "images/left-paper.png";
    userContainer.appendChild(userPaper);
    userPaper.classList.add("user-paper", "user-movement");
}

function userScissorsAnimation() {
    const userScissors = document.createElement('img');
    userScissors.src = "images/left-scissors.png";
    userContainer.appendChild(userScissors);
    userScissors.classList.add("user-scissors", "user-movement");
}

function cpuRockAnimation() {
    const cpuRock = document.createElement('img');
    cpuRock.src = "images/right-rock.png";
    cpuContainer.appendChild(cpuRock);
    cpuRock.classList.add("cpu-rock", "cpu-movement");
}

function cpuPaperAnimation() {
    const cpuPaper = document.createElement('img');
    cpuPaper.src = "images/right-paper.png";
    cpuContainer.appendChild(cpuPaper);
    cpuPaper.classList.add('cpu-paper', 'cpu-movement');
}

function cpuScissorsAnimation() {
    const cpuScissors = document.createElement('img');
    cpuScissors.src = "images/right-scissors.png";
    cpuContainer.appendChild(cpuScissors);
    cpuScissors.classList.add('cpu-scissors', 'cpu-movement');
}


//function resetFist (){
  //  setTimeout(function(){
    //userFist.classList.remove('shake-fist');
   // },5000);
//}
    
    
gameButtons.forEach((button) => {
  button.addEventListener('click', () => {
    playRound(button.value, getCpuSelection())
    });
});


















