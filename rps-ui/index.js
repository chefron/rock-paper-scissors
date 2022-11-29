const options = ["rock", "paper", "scissors"];
const buttons = document.getElementById('button-container').querySelectorAll('button');
const buttonContainer = document.getElementById('button-container');
const roundResults = document.querySelector('#roundResults');
const score = document.querySelector('#score');
const gameResults = document.querySelector('#gameResults');

const modalContainer = document.getElementById('modal-container');
const modal = document.getElementById('modal');
const modalTitle = document.createElement('p');

const userHealth = document.getElementById("user-health");
const cpuHealth = document.getElementById("cpu-health");

const userContainer = document.querySelector('.user-container');
const cpuContainer = document.querySelector('.cpu-container')

const canvas = document.querySelector('.canvas');

const userFist = document.createElement('img');
const cpuFist = document.createElement('img');

const tableHit = new Audio('sounds/tablehit.mp3');

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

dropFists()

function resetFists(){
    userFist.classList.remove('user-fist-intro', 'shake-user-fist', 'user-fist-float');
    cpuFist.classList.remove('cpu-fist-intro', 'shake-cpu-fist', 'cpu-fist-float');
    userContainer.innerHTML = '';
    cpuContainer.innerHTML = '';
}

let userScore = 0;
let cpuScore = 0;
let isGameOver = false;

function getCpuSelection(){
    const selection = options[Math.floor(Math.random() * options.length)];
    return selection;
}

function gameStatus(){
    if (userScore === 1){
        isGameOver = true;
        displayUserWinsModal(); 
    } else if (cpuScore === 1){
        isGameOver = true;
        displayUserLosesModal();
    }
}

//hide game buttons and display User Wins Modal in their place
function displayUserWinsModal(){
    setTimeout(function(){
        hideButtons();
    },2000);
    modalContainer.style.display = "block";
    modalTitle.classList.add("win-title");
    modal.prepend(modalTitle);
    modalTitle.innerHTML = "YOU WIN!";
}

//hide game buttons and display User Loses Modal in their place
function displayUserLosesModal(){
    setTimeout(function(){
        hideButtons();
    },2000);
    modalContainer.style.display = "block";
    modalTitle.classList.add("lose-title");
    modal.prepend(modalTitle);
    modalTitle.innerHTML = "YOU LOSE";
}

function removeButtons(){
    const buttonContainer = document.querySelector('#button-container');
    buttonContainer.innerHTML = '';
}

const playAgain = document.getElementById('play-again-button');

playAgain.addEventListener('click', resetGame);

function resetGame() {
    isGameOver = false;
    userScore = 0;
    cpuScore = 0;
    userHealth.value = 100;
    cpuHealth.value = 100;
}

playAgain.addEventListener('click', resetModal);

//hide and reset Modal for next round
function resetModal() {

    modalContainer.style.display='none';
    modalTitle.className = ''
    modalTitle.innerHTML = '';
    modal.removeChild(modalTitle)
}

playAgain.addEventListener('click', resetFists);
playAgain.addEventListener('click', dropFists)              
playAgain.addEventListener('click', displayButtons);

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
            setTimeout(function(){
                cpuHealthHit();
            },2750);
    } else if ((userSelection == "paper" && cpuSelection == "rock")){
            userPaperAnimation();
            cpuRockAnimation();
            userScore += 1;
            setTimeout(function(){
                cpuHealthHit();
            },2750);
    } else if ((userSelection == "scissors" && cpuSelection == "paper")){
            userScissorsAnimation();
            cpuPaperAnimation();
            userScore += 1;
            setTimeout(function(){
                cpuHealthHit();
            },2750);
            
    //combinations where user loses to cpu:
    } else if ((userSelection == "rock" && cpuSelection == "paper")){
            userRockAnimation();
            cpuPaperAnimation();
            cpuScore += 1;
            setTimeout(function(){
                userHealthHit();
            },2750);
    } else if ((userSelection == "paper" && cpuSelection == "scissors")){
            userPaperAnimation();
            cpuScissorsAnimation();
            cpuScore += 1;
            setTimeout(function(){
                userHealthHit();
            },2750);
    } else if ((userSelection == "scissors" && cpuSelection == "rock")){
            userScissorsAnimation();
            cpuRockAnimation();
            cpuScore += 1;
            setTimeout(function(){
                userHealthHit();
            },2750);
    }

    //check if game is won, lost, or still ongoing
    gameStatus();

    //if game is still ongoing, reset fists and buttons for next round
    if (!isGameOver){
        
        setTimeout(function(){
        resetFists();
        },4900);
       
        setTimeout(function(){
        dropFists();
        },5000);
    
        setTimeout(function(){
        displayButtons();
        },5800);
   
    }
        
}  

//dock user health points for a lost round
function userHealthHit () {
    userHealth.value -= 20;
}

//dock CPU health points for a lost round
function cpuHealthHit () {
    cpuHealth.value -= 20;
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

function hideButtons() {
    buttonContainer.classList.remove('fade-in-buttons');
    setTimeout(function(){
        buttonContainer.classList.add('fade-out-buttons');
      },10);
}

function displayButtons() {
    buttonContainer.classList.add('fade-in-buttons');
    setTimeout(function(){
        buttonContainer.classList.remove('fade-out-buttons');
      },10);
}

buttons.forEach((button) => {
        button.addEventListener('click', () => {
            shakeCanvas(), shakeFists(), hideButtons();
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
    
    
buttons.forEach((button) => {
  button.addEventListener('click', () => {
    playRound(button.value, getCpuSelection())
    });
});


















