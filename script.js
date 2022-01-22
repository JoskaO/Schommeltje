const keyButtons = document.getElementsByClassName('key');
const wordDiv = document.getElementById('word');
const livesDiv = document.getElementById('lives');
const allSwings = document.getElementsByClassName('swingClass');
const rightWord = document.getElementById('text');

let gameWord;
let letter;
let lengthWord;
let lives;

rightWord.classList.add("displayNone");
document.getElementById('start').addEventListener("click", popUp);

function popUp(){
    document.getElementById('start').innerHTML = "Start nieuw spel"; 

    //levens
    lives = 12;
    livesDiv.style.color = "var(--primairdark)"; 
    livesDiv.innerHTML = "Je kan nog " + lives + " verkeerde letters kiezen";
 
    // winner/loser verwijderen
    rightWord.classList.add("displayNone");
    body.classList.remove("gameover");
    body.classList.remove("winner");

    // alle kleuren van de toetsen afhalen
    Array.from(keyButtons).forEach(function(keyButton) {
        keyButton.style.background = null;
        keyButton.style.cursor = null;
        keyButton.disabled = false;
    });

    // schommel weg
    Array.from(allSwings).forEach(function(swingClass) {
        swingClass.classList.add("displayNone");
    });

    // nieuw woord voor spel
    setTimeout(promptTimeout, 75);
    function promptTimeout(){
        gameWord = prompt("Met welk woord wil jij spelen?");
        if (gameWord == "" ) {
            gameWord = prompt("Met welk woord wil jij spelen?");
        }else{
            word();
        };
    };
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

// toetsenbord
Array.from(keyButtons).forEach(function(keyButton) {
    keyButton.addEventListener("click", keyboard);
});

function keyboard(button) {
    letter = button.target.id;
    button.target.disabled = true;
    button.target.style.cursor = "auto";
    button.target.style.color = "var(--primairdark)";


    if (gameWord.includes(letter)){
    button.target.style.background = "var(--primairlight)";
    }else{
    button.target.style.background = "var(--secondairdark)";
    };
    GuessWord();
};

// woord raden
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
        // levens
        lives = lives - 1; 
        livesDiv.innerHTML = "Je kan nog " + lives + " verkeerde letters kiezen";
        
        // plaatje
        document.getElementById('swing' + lives).classList.remove("displayNone");

        // game over
        if (lives < 1){
            livesDiv.innerHTML = "GAME OVER!";
            rightWord.classList.remove("displayNone");
            wordDiv.innerHTML = gameWord;
            body.classList.add("gameover");
        };
    };
};

function winner(){
    if (gameWord == wordDiv.innerHTML){
        body.classList.add("winner");
    } 
}

// hoevaak gespeeld, hoevaak goed, hoevaak mis
// eventueel later --> letters herkennen: niet alleen met klikken, maar ook met drukken op toetsenbord?
// eventueel later --> hint: 1 willekeurige letter laten verschijnen van het woord
// eventueel later --> woord uit database