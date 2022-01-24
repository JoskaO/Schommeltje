const startID = document.getElementById('start');
const woordenlijstID = document.getElementById('woordenlijst');
const keyButtons = document.getElementsByClassName('key');
const wordDiv = document.getElementById('word');
const livesDiv = document.getElementById('lives');
const allSwings = document.getElementsByClassName('swingClass');
const rightWord = document.getElementById('text');
const gameCounter = document.getElementById('gameCounter');

let gameWord;
let letter;
let lengthWord;
let lives;
let countGames = 0;
let gameWin = 0;
let gameLose = 0;

rightWord.classList.add("displayNone");

startID.addEventListener("click", startPopUp);
woordenlijstID.addEventListener("click", startWoordenlijst);

function startPopUp(){
    start();
    // setTimeout(inputGameWord, 75);
    function inputGameWord(){
        do { 
            gameWord = prompt("Met welk woord wil jij spelen?");
        }while (gameWord == "" )
    }
    inputGameWord()
    word();
    wordLive();
};

function startWoordenlijst(){
    start();
    let aantalWoorden = woordenlijst.length;
    let random = Math.floor(Math.random() * (aantalWoorden) );
    gameWord = woordenlijst[random];

    word();
    wordLive();
}

function start(){
    // levens
    lives = 12;
    // livesDiv.style.color = "var(--primairdark)"; 
 
    // winner/loser verwijderen
    rightWord.classList.add("displayNone");
    body.classList.remove("gameover");
    body.classList.remove("winner");

    // alle kleuren van de toetsen afhalen
    Array.from(keyButtons).forEach(function(keyButton) {
        keyButton.classList.remove("rightKey");
        keyButton.classList.remove("wrongKey");
        keyButton.disabled = false;
    });

    // schommel weg
    Array.from(allSwings).forEach(function(swingClass) {
        swingClass.classList.add("displayNone");
    });
};

// woord genereren
function word(){
    gameWord = gameWord.trim();
    gameWord = gameWord.toLowerCase();
    console.log(gameWord);

    lengthWord = gameWord.length;
    const underscore = "_";    
    wordDiv.innerHTML = underscore.repeat(lengthWord);
};

// # letters en # levens
function wordLive(){
    livesDiv.innerHTML = `Je woord heeft ${lengthWord} letters. Je kan nog ${lives} verkeerde letters kiezen`;
}

// toetsenbord
Array.from(keyButtons).forEach(function(keyButton) {
    keyButton.addEventListener("click", keyboard);
});

function keyboard(button) {
    letter = button.target.id;
    button.target.disabled = true;

    if (gameWord.includes(letter)){
        button.target.classList.add("rightKey");
    }else{
        button.target.classList.add("wrongKey")
    };
    GuessWord();
};

// letter raden
function GuessWord(){
    if (gameWord.includes(letter)){ 
        let letterLocatie = -1; 
        do {letterLocatie = gameWord.indexOf(letter, letterLocatie + 1);
            winner();
            if (letterLocatie > -1){
            wordDiv.innerHTML = wordDiv.innerHTML.substring(0, letterLocatie) + letter + wordDiv.innerHTML.substring(letterLocatie + 1);
            }
        }while (letterLocatie > -1);
    }else {
        lives--; 
        wordLive();

        document.getElementById('swing' + lives).classList.remove("displayNone");

        if (lives < 1){
            gameOver()
        };
    };
};

function disableKey(){
    Array.from(keyButtons).forEach(function(keyButton) {
        keyButton.disabled = true;
        keyButton.classList.add("wrongKey");
    });
};

function gameOver(){
    livesDiv.innerHTML = "GAME OVER!";
    rightWord.classList.remove("displayNone");
    wordDiv.innerHTML = gameWord;
    body.classList.add("gameover");
    disableKey();
    gameCounts();
};

function winner(){
    if (gameWord == wordDiv.innerHTML){
        livesDiv.innerHTML = "HOERA!";
        body.classList.add("winner");
        disableKey();
        gameCounts();
    };
};

// game counter
function gameCounts(){
    if (livesDiv.innerHTML == "HOERA!"){
        countGames++;
        gameWin++;
    }else if (wordDiv.innerHTML == gameWord){
        countGames++;
        gameLose++;
    };
    gameCounter.innerHTML = `Je won ${gameWin} en verloor ${gameLose} keer`;
};
