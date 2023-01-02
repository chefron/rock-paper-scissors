// LOADING SCREEN:

window.addEventListener("load", (event) => {
    document.querySelector("#loading-page").style.display = 'none';
  });

// START SCREEN:

let numberOfRounds; // The # of rounds per game, as chosen by user
const userHealth = document.getElementById("user-health-meter");
const cpuHealth = document.getElementById("cpu-health-meter");
let userHealthCopy; // Background user health score to bypass animation delay
let cpuHealthCopy; // Background CPU health score to bypass animation delay

// Asks user to input number of rounds, which dictates starting health score
function getNumberOfRounds() {
    numberOfRounds = document.getElementById('number-of-rounds').value;
    userHealth.value = Math.floor((numberOfRounds / 2)+1);
    userHealth.max = Math.floor((numberOfRounds / 2)+1);
    cpuHealth.value = Math.floor((numberOfRounds / 2)+1);
    cpuHealth.max = Math.floor((numberOfRounds / 2)+1);
    userHealthCopy = Math.floor((numberOfRounds / 2)+1);
    cpuHealthCopy = Math.floor((numberOfRounds / 2)+1);
}

let soundOn = true;

// Allows user to turn sound off or on
function toggleSound(){
    if (soundOn){
        soundOn = false;
    } else if (!soundOn){
        soundOn = true;
    }
}

// Collection of functions that initialize game when play button is clicked 
function startGame (){
    getNumberOfRounds(); 
    exitStartScreen(); 
    dropFistsInitial(); 
    displayPlayerNames(); 
    displayGameButtonsInitial(); 
    displayHealthContainer(); 
    lightUpTitles(); 
    playBackgroundSfx()
}

// Closes start screen so game can begin
function exitStartScreen () {
    const startScreen = document.getElementById('start-game-screen');
    startScreen.classList.add('cinematic-wipe');
    const inputRoundsWrapper = document.getElementById('input-rounds-wrapper');
    inputRoundsWrapper.style.display='none';
    const soundToggleWrapper = document.getElementById('sound-toggle-wrapper');
    soundToggleWrapper.style.display='none';
    const playButtonWrapper = document.getElementById('play-button-wrapper');
    playButtonWrapper.style.display='none';
}


// GAME LOGIC:

let userScore = 0; // Keeps count of how many rounds user has won
let cpuScore = 0 // Keeps count of how many rounds CPU has won
let isGameOver = false;

const options = ["rock", "paper", "scissors"];

// Randomly generates CPU's choice of rock, paper, or scissors
function getCpuSelection(){
    const selection = options[Math.floor(Math.random() * options.length)];
    return selection;
}

const gameButtons = document.getElementById('game-button-container').querySelectorAll('button');

// User chooses rock, paper, or scissors by clicking button
gameButtons.forEach((button) => {
    button.addEventListener('click', () => {
      playRound(button.value, getCpuSelection())
      });
  });
  
// Main rock paper scissors logic
function playRound (userSelection, cpuSelection) {
        
    //combinations where user and CPU tie:
    if ((userSelection == "rock") && (cpuSelection == "rock")){
            userRockAnimation();
            cpuRockAnimation();
    } else if ((userSelection == "paper") && (cpuSelection == "paper")){
            userPaperAnimation();
            cpuPaperAnimation();
    } else if ((userSelection == "scissors") && (cpuSelection == "scissors")){
            userScissorsAnimation();
            cpuScissorsAnimation();

    //combinations where user beats CPU:
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
            
    //combinations where user loses to CPU:
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

    gameStatus();

    // If game is still ongoing, reset fists and buttons for next round
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

// Checks if either player has won or game is still ongoing
function gameStatus(){
    if (cpuHealthCopy === 0){
        isGameOver = true;
        displayUserWinsModal(); 
    } else if (userHealthCopy === 0){
        isGameOver = true;
        displayUserLosesModal();
    }
}

// Docks user one health point for a lost round
function userHealthHit () {
    userHealth.value -= 1;
}

// Docks CPU one health point for a lost round
function cpuHealthHit () {
    cpuHealth.value -= 1;
}

// Displays user score
function awardUserPoint(){
    userName.textContent = `YOU: ${userScore}`;
}

// Displays CPU score
function awardCpuPoint(){
    cpuName.textContent = `THEM: ${cpuScore}`;
}


// HAND ANIMATION:

const userContainer = document.getElementById("user-container"); // User's half of screen
const userFist = document.createElement('img');
userFist.src = 'images/left-rock.png';
const cpuContainer = document.getElementById("cpu-container"); // CPU's half of screen
const cpuFist = document.createElement('img');
cpuFist.src = 'images/right-rock.png';

// Shows fists for the first time
function dropFistsInitial() {
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

// Shows fists at start of each round
function dropFists() {
    userContainer.appendChild(userFist);
    cpuContainer.appendChild(cpuFist);
    userFist.classList.add('user-fist-intro', 'user-fist');
    cpuFist.classList.add('cpu-fist-intro', 'cpu-fist');
    setTimeout(function(){
        userFist.classList.add('user-fist-float');
        cpuFist.classList.add('cpu-fist-float');
    },2000);
}

// Fists pound table after selections are made
function shakeFists() {
    userFist.classList.remove('shake-user-fist');
    cpuFist.classList.remove('shake-cpu-fist');
    setTimeout(function(){
        userFist.classList.add('shake-user-fist');
        cpuFist.classList.add('shake-cpu-fist');
      },10);
}

// Screen shakes when fists pound table
function shakeCanvas() {
    const gameplayCanvas = document.getElementById("gameplay-canvas");
    gameplayCanvas.classList.remove('shake-canvas');
    setTimeout(function(){
        gameplayCanvas.classList.add('shake-canvas');
      },10);
}

// User plays rock
function userRockAnimation() {
    const userRock = document.createElement('img');
    userRock.src = "images/left-rock.png";
    userContainer.appendChild(userRock);
    userRock.classList.add("user-rock", "user-movement");
    setTimeout(function(){
        playRockWhoosh();
    },2340);
}

// User plays paper
function userPaperAnimation() {
    const userPaper = document.createElement('img');
    userPaper.src = "images/left-paper.png";
    userContainer.appendChild(userPaper);
    userPaper.classList.add("user-paper", "user-movement");
    setTimeout(function(){
        playPaperWhoosh();
    },2340);
}

// User plays scissors
function userScissorsAnimation() {
    const userScissors = document.createElement('img');
    userScissors.src = "images/left-scissors.png";
    userContainer.appendChild(userScissors);
    userScissors.classList.add("user-scissors", "user-movement");
    setTimeout(function(){
        playScissorsWhoosh();
    },2340);
}

// CPU plays rock
function cpuRockAnimation() {
    const cpuRock = document.createElement('img');
    cpuRock.src = "images/right-rock.png";
    cpuContainer.appendChild(cpuRock);
    cpuRock.classList.add("cpu-rock", "cpu-movement");
}

// CPU plays paper
function cpuPaperAnimation() {
    const cpuPaper = document.createElement('img');
    cpuPaper.src = "images/right-paper.png";
    cpuContainer.appendChild(cpuPaper);
    cpuPaper.classList.add('cpu-paper', 'cpu-movement');
}

// CPU plays scissors
function cpuScissorsAnimation() {
    const cpuScissors = document.createElement('img');
    cpuScissors.src = "images/right-scissors.png";
    cpuContainer.appendChild(cpuScissors);
    cpuScissors.classList.add('cpu-scissors', 'cpu-movement');
}

// Resets fists for next round
function resetFists(){
    userFist.classList.remove('user-fist-intro', 'shake-user-fist', 'user-fist-float');
    cpuFist.classList.remove('cpu-fist-intro', 'shake-cpu-fist', 'cpu-fist-float');
    userContainer.innerHTML = '';
    cpuContainer.innerHTML = '';
}


// GAME BUTTONS:

const gameButtonContainer = document.getElementById('game-button-container');
const gameButtonText = document.getElementById('game-button-text');

// Displays game buttons for the first time
function displayGameButtonsInitial () {
    setTimeout(function(){
        gameButtonContainer.style.display='flex';
        gameButtonText.style.display='block';
    }, 3000);
}

// Display game buttons at start of each round
function displayGameButtons() {
    gameButtonContainer.classList.add('fade-in-buttons');
    gameButtonText.classList.add('fade-in-buttons');
    setTimeout(function(){
        gameButtonContainer.classList.remove('fade-out-buttons');
        gameButtonText.classList.remove('fade-out-text');
      },10);
    setTimeout(function(){
        enableHover();
      },800);
}

// User's selection triggers hand animations
gameButtons.forEach((button) => {
    button.addEventListener('click', () => {
        shakeCanvas(), 
        shakeFists(),
        buttonClickSfx(), 
        hideGameButtons(), 
        setTimeout(function(){
            playTablePoundsSfx();
          },510);
  });
});

// Hides game buttons after user makes selection
function hideGameButtons() {
    disableHover();
    gameButtonContainer.classList.remove('fade-in-buttons');
    gameButtonText.classList.remove('fade-in-buttons');
    setTimeout(function(){
        gameButtonText.classList.add('fade-out-text'),
        gameButtonContainer.classList.add('fade-out-buttons');
      },10);
}

// Disables hover animation after user makes selection
function disableHover(){
    const gameButtonImages = document.querySelectorAll('.game-button-img');
    gameButtonImages.forEach(button => {
        button.classList.add('disable-hover');
    });
}

// Enables hover animation when buttons reappear next round
function enableHover(){
    const gameButtonImages = document.querySelectorAll('.game-button-img');
    gameButtonImages.forEach(button => {
        button.classList.remove('disable-hover');
    });
}


// HEADER AND FOOTER:

const title = document.getElementById('title');
const rockTitle = document.getElementById('rock-title'); 
const paperTitle = document.getElementById('paper-title');
const scissorsTitle = document.getElementById('scissors-title');
const footer = document.getElementById('footer')
const healthContainer = document.getElementById('health-container');

// Turns on Rock Paper Sciccors sign at start of game
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
        footer.classList.add('footer-shine'); // Adds glow to footer
    }, 3000);
}

const userName = document.getElementById('user-name');
const cpuName = document.getElementById('cpu-name');

// Displays players' names at start of game
function displayPlayerNames(){
    setTimeout(function(){
        userName.style.display = 'inline';
    }, 1000);
    setTimeout(function(){
        cpuName.style.display = 'inline';
    }, 1600);
}

// Displays health meters at start of game
function displayHealthContainer(){
    setTimeout(function(){
        healthContainer.style.display = 'flex';
    }, 3000);
}


// GAME OVER SCREEN:

const gameOverModalContainer = document.getElementById('game-over-modal-container');
const gameOverModal = document.getElementById('game-over-modal');
const gameOverModalTitle = document.createElement('p'); // User Wins or User Loses message
const playAgain = document.getElementById('play-again-button');

// Hides game buttons and display User Wins message
function displayUserWinsModal(){
    setTimeout(function(){
        hideGameButtons();
    },2000);
    setTimeout(function(){
        playCheerSfx();
    },3000);
    gameOverModalContainer.style.display = "flex";
    gameOverModalContainer.classList.add("fade-in-modal");
    gameOverModalTitle.classList.add("win-title");
    gameOverModal.prepend(gameOverModalTitle);
    gameOverModal.classList.add("win-background");
    gameOverModalTitle.innerHTML = "YOU<br>WIN!";
    playAgain.style.display = "block";
}

// Hides game buttons and display User Loses message
function displayUserLosesModal(){
    setTimeout(function(){
        hideGameButtons();
    },2000);
    setTimeout(function(){
        playGroanSfx();
    },3000);
    gameOverModalContainer.style.display = "flex";
    gameOverModalContainer.classList.add("fade-in-modal", "lose-background");
    gameOverModalTitle.classList.add("lose-title");
    gameOverModal.prepend(gameOverModalTitle);
    gameOverModalTitle.innerHTML = "YOU<br>LOSE";
    playAgain.style.display = "block";
}

// Collection of Play Again button click events 
playAgain.addEventListener('click', resetGame);
playAgain.addEventListener('click', resetModal);
playAgain.addEventListener('click', resetFists);
playAgain.addEventListener('click', dropFists)              
playAgain.addEventListener('click', displayGameButtons);

// Resets number of rounds and players' scores for next game
function resetGame() {
    isGameOver = false;
    getNumberOfRounds();
    userScore = 0;
    cpuScore = 0;
    userName.textContent = `YOU`;
    cpuName.textContent = `THEM`;
}

// Hides and resets modal for next game
function resetModal() {
    gameOverModalContainer.style.display ='none';
    gameOverModalContainer.className = '';
    gameOverModalTitle.className = '';
    gameOverModalTitle.innerHTML = '';
    gameOverModal.className = '';
    gameOverModal.removeChild(gameOverModalTitle)
}


// INFORMATION MODAL

const infoModalBackground = document.getElementById('info-modal-background');
const infoModal = document.getElementById('info-modal');

// Opens modal by clicking info button
function openInfoModal() {
    infoModalBackground.style.display = 'flex';
    infoModal.style.display = 'block';
    buttonClickSfx();
}

// Closes modal by clicking close icon with onclick event
function closeInfoModal() {
    infoModalBackground.style.display = 'none';
    infoModal.style.display = 'none';
}

// Closes modal by clicking anywhere outside of modal
window.onclick = function(event) {
    if (event.target == infoModalBackground) {
        infoModalBackground.style.display = 'none';
    }
}


// MUSIC & SFX:

const backgroundSfx = new Audio('sounds/background.mp3');
backgroundSfx.preload = 'auto';

function playBackgroundSfx(){
    backgroundSfx.loop = true;
    backgroundSfx.volume = 0.75;
    if (soundOn){
        backgroundSfx.play();
    }
}

function playCheerSfx() {
    const cheerSfx = new Audio('sounds/crowd-cheer.mp3');
    cheerSfx.volume = 0.5;
    if (soundOn) {
        cheerSfx.play();
    }
}

function playGroanSfx() {
    const groanSfx = new Audio('sounds/crowd-groan.mp3');
    groanSfx.volume = 0.7;
    if (soundOn) {
        groanSfx.play();
    }
}

const rockWhoosh = new Audio('sounds/rock-whoosh.mp3');
rockWhoosh.preload = 'auto';

function playRockWhoosh(){
    rockWhoosh.volume = 0.8;
    if (soundOn) {
        rockWhoosh.play();
    }
}

const paperWhoosh = new Audio('sounds/paper-whoosh.mp3');
paperWhoosh.preload = 'auto';

function playPaperWhoosh(){
    paperWhoosh.volume = 0.4;
    if (soundOn) {
        paperWhoosh.play();
    }
}

const scissorsWhoosh = new Audio('sounds/scissors-whoosh.mp3');
scissorsWhoosh.preload = 'auto';

function playScissorsWhoosh(){
    scissorsWhoosh.volume = 0.35;
    if (soundOn) {
        scissorsWhoosh.play();
    }
}

const tablePounds = new Audio('sounds/table-pounds-1.mp3');
tablePounds.preload = "auto";
tablePounds.volume = 0.35;

function playTablePoundsSfx() {
    if (soundOn) {
        tablePounds.play();
    }
}

const buttonClick = new Audio('sounds/button-click.mp3');
buttonClick.preload = "auto";

function buttonClickSfx() {
    buttonClick.volume = 0.3;
    if (soundOn) {
        buttonClick.play();
    }
}

// MISCELLANEOUS:

// Changes screen orientation to full screen if landscape mode;

const requestFullscreen = document.getElementById('request-fullscreen');
const fullscreenButton = document.getElementById('fullscreen-button');

let landscape = window.matchMedia('(orientation: landscape)');
let portrait = window.matchMedia('(orientation: portrait)');

landscape.addEventListener('change', function(e) {
    if(e.matches && window.innerHeight < 430) {
        requestFullscreen.style.display = 'flex';
        console.log('landscape mode');
    }
})

fullscreenButton.addEventListener('click', becomeFullscreen);

portrait.addEventListener("change", function(e) {
    if(e.matches) {
        requestFullscreen.style.display = 'none';
        closeFullscreen();
        console.log('portrait mode');
    }
})

var elem = document.documentElement;

function becomeFullscreen() {
    requestFullscreen.style.display = 'none';
    if (elem.requestFullscreen) {
    elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
    /* Firefox */
    elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
    /* Chrome, Safari and Opera */
    elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
    /* IE/Edge */
    elem.msRequestFullscreen();
    }
}

function closeFullscreen() {
    if (document.exitFullscreen && screen.orientation.type === 'landscape-primary'){
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen && screen.orientation.type === 'landscape-primary'){
        document.webkitExitFullscreen();
    } else if (document.msExitFullScreen && screen.orientation.type === 'landscape-primary'){
        document.msExitFullScreen();
    }
}






























    
    


















