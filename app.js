
let gameseq = [];
let userseq = [];

let started = false;
let level = 0;

let btn = ["red", "blue", "yellow", "green"];

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function() {
    if (started == false) {
        console.log("Game Started");
        started = true;
        levelup(); // Start the first level
    }
});

function gameflash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 250);
}

function userflash(btn) {
    btn.classList.add("userflash");
    setTimeout(function() {
        btn.classList.remove("userflash");
    }, 250);
}

function levelup() {
    userseq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4); // Change to 4 to include all buttons
    let randColor = btn[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);

    gameseq.push(randColor);
    console.log(gameseq);
    gameflash(randBtn);

    // Play the sequence for the user
    playSequence();
}

function playSequence() {
    let i = 0;
    let interval = setInterval(function() {
        if (i < gameseq.length) {
            let color = gameseq[i];
            let btn = document.querySelector(`.${color}`);
            gameflash(btn);
            i++;
        } else {
            clearInterval(interval);
        }
    }, 1000); // Adjust timing as needed
}

function checkAns(idx) {
    if (userseq[idx] == gameseq[idx]) {
        if (userseq.length == gameseq.length) {
            setTimeout(levelup, 1000); // Move to the next level after a delay
        }
    } else {
        h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press any key to start the game`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout( function(){
            document.querySelector("body").style.backgroundColor = "white";

        },150 );
        resetGame(); // Reset the game
    }
}

function resetGame() {
    gameseq = [];
    userseq = [];
    level = 0;
    started = false; // Reset started to allow the game to start again
}

function btnpress() {
    let btn = this;
    userflash(btn);

    let userColor = btn.getAttribute("class").split(' ')[1]; // Get the color from the class
    userseq.push(userColor);
    checkAns(userseq.length - 1); // Check the last entered answer
}

let allbtns = document.querySelectorAll(".btn");
for (let butn of allbtns) {
    butn.addEventListener("click", btnpress);
}