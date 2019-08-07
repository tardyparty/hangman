// array of countries to choose form 
var words = [
    "afghanistan", "albania", "algeria", "andorra", "angola", "antigua",
    "argentina", "armenia", "australia", "austria", "azerbaijan", "bahamas", "bahrain",
    "bangladesh", "barbados", "belarus", "belgium", "belize", "benin", "bhutan", "bolivia",
    "bosnia", "botswana", "brazil", "brunei", "bulgaria", "burkina Faso", "burundi",
    "cabo verde", "cambodia", "cameroon", "canada", "central African Republic", "chad", "chile",
    "china", "colombia", "comoros", "congo", "costa Rica", "cote d’Ivoire", "croatia", "cuba",
    "cyprus", "czech Republic", "denmark", "djibouti", "dominica", "dominican Republic",
    "east Timor", "ecuador", "egypt", "el salvador", "equatorial guinea", "eritrea", "estonia",
    "eswatini", "ethiopia", "Fiji", "Finland", "France", "gabon", "The gambia", "georgia",
    "germany", "ghana", "greece", "grenada", "guatemala", "guinea", "guinea-Bissau", "guyana",
    "haiti", "honduras", "hungary", "iceland", "india", "indonesia", "iran", "iraq", "ireland",
    "israel", "italy", "jamaica", "japan", "jordan", "kazakhstan", "kenya", "kiribati",
    "north korea", "south korea", "kosovo", "kuwait", "kyrgyzstan", "laos", "latvia", "lebanon",
    "lesotho", "liberia", "libya", "liechtenstein", "lithuania", "luxembourg", "madagascar", "malawi",
    "malaysia", "maldives", "mali", "malta", "marshall Islands", "mauritania", "mauritius",
    "mexico", "Federated states of micronesia", "moldova", "monaco", "mongolia", "montenegro",
    "morocco", "mozambique", "myanmar", "namibia", "nauru", "nepal", "netherlands", "new Zealand",
    "nicaragua", "niger", "nigeria", "north macedonia", "norway", "oman", "pakistan", "palau",
    "panama", "papua New Guinea", "paraguay", "peru", "philippines", "poland", "portugal", 
    "qatar", "romania", "russia", "rwanda", "saint kitts and nevis", "saint lucia", 
    "saint vincent and the grenadines", "samoa", "san Marino", "sao Tome and principe",
    "saudi arabia", "senegal", "serbia", "seychelles", "sierra Leone", "singapore", "slovenia",
    "solomon Islands", "somalia", "south Africa", "spain", "sri Lanka", "sudan", "south sudan",
    "suriname", "sweden", "switzerland", "syria", "taiwan", "tajikistan", "tanzania", "thailand",
    "togo", "tonga", "trinidad and tobago", "tunisia", "turkey", "turkmenistan", "tuvalu", "uganda",
    "ukraine", "united arab emirates", "united kingdom", "united states", "uruguay", "uzbekistan", 
    "vanuatu", "vatican City", "venezuela", "vietnam", "yemen", "zambia", "zimbabwe"
]

// global variables 
const maxLives = 10;

var guessedLetters = [];
var currentWordIndex;
var guessingWord = [];
var remainingLives = 0;
var started = false;
var finished = false;
var wins = 0;

//  functions for game play

function resetGame(){
    // reset all variables from previous game
    remainingLives = maxLives;

    currentWordIndex = Math.floor(Math.random() * (words.length));

    guessedLetters = [];

    guessingWord = [];

    // reset a new word 
    for (i=0; i < words[currentWordIndex].length; i++){
        guessingWord.push("_");
    }

    document.getElementById("tryAgain").style.cssText= "display: none";
    document.getElementById("gameOver").style.cssText = "display: none";
    document.getElementById("youWin").style.cssText = "display: none";

    updateDisplay();
}

function updateDisplay(){
    // resets html page for new game
    document.getElementById("totalWins").innerHTML = wins;
    document.getElementById("currentWord").innerHTML = "";
    for (var i = 0; i < guessingWord.length; i++) {
        document.getElementById("currentWord").innerHTML += guessingWord[i];
    }
    document.getElementById("remainingLives").innerHTML = remainingLives;
    document.getElementById("guessedLetters").innerHTML = guessedLetters;
    if (remainingLives <= 0){
        document.getElementById("gameOver").style.css = "display: block";
        document.getElementById("tryAgain").style.css = "display: block";
        finished = true;
    }
}

document.onkeydown = function(event){
    // recieves users guess and checks if its valid
    if (finished){
        resetGame();
        finished = false;
    }
    else {
        if (event.keyCode >= 65 && event.keyCode <= 90){
            userGuess(event.key.toLowerCase());
        }
    }
}

function checkLetter(letter){
    var positions = [];
    for (var i = 0; i < words[currentWordIndex].length; i++){
        if (words[currentWordIndex][i] === letter){
            positions.push(i);
        }
    }

    if (positions.length <= 0){
        remainingLives--;
    }
    else {
        for (var i = 0; i < positions.length; i++){
            guessingWord[positions[i]] = letter;
        }  
    }
}

function checkWin(){
    if (guessingWord.indexOf("_") === -1){
        document.getElementById("youWin").style.css = "display: block";
        document.getElementById("tryAgain").style.css = "display: block";
        wins++;
        finished = true;
    }
}

function userGuess (letter){
    if (remainingLives > 0){
        if (!started){
            started = true;
        }
    }
    if (guessedLetters.indexOf(letter) === -1) {
        guessedLetters.push(letter);
        checkLetter(letter);
    }

    updateDisplay();
    checkWin();
}

console.log(words[currentWordIndex])