// array of countries to choose form 
var words = [
    "AFGHANISTAN", "ALBANIA", "ALGERIA", "ANDORRA", "ANGOLA", "ANTIGUA",
    "ARGENTINA", "ARMENIA", "AUSTRALIA", "AUSTRIA", "AZERBAIJAN", "BAHAMAS", "BAHRAIN",
    "BANGLADESH", "BARBADOS", "BELARUS", "BELGIUM", "BELIZE", "BENIN", "BHUTAN", "BOLIVIA",
    "BOSNIA", "BOTSWANA", "BRAZIL", "BRUNEI", "BULGARIA", "BURKINA FASO", "BURUNDI",
    "CABO VERDE", "CAMBODIA", "CAMEROON", "CANADA", "CENTRAL AFRICAN REpUBLIC", "CHAD", "CHILE",
    "CHINA", "COLOMBIA", "COMOROS", "CONGO", "COSTA RICA", "COTE D IVOIRE", "CROATIA", "CUBA",
    "CYPRUS", "CZECH REPUBLIC", "DENMARK", "DJIBOUTI", "DOMINICA", "DOMINICAN REPUBLIC",
    "EAST TIMOR", "ECUADOR", "EGYPT", "EL SALVADOR", "EQUATORIAL GUINEA", "ERITREA", "ESTONIA",
    "ESWATINI", "ETHIOPIA", "FIJI", "FINLAND", "FRANCE", "GABON", "THE GAMBIA", "GEORGIA",
    "GERMANY", "GHANA", "GREECE", "GRENADA", "GUATEMALA", "GUINEA", "GUINEA BISSAU", "GUYANA",
    "HAITI", "HONDURAS", "HUNGARY", "ICELAND", "INDIA", "INDONESIA", "IRAN", "IRAQ", "IRELAND",
    "ISRAEL", "ITALY", "JAMAICA", "JAPAN", "JORDAN", "KAZAKHSTAN", "KENYA", "KIRIBATI",
    "NORTH KOREA", "SOUTH KOREA", "KOSOVO", "KUWAIT", "KYRGYZSTAN", "LAOS", "LATVIA", "LEBANON",
    "LESOTHO", "LIBERIA", "LIBYA", "LIECHTENSTEIN", "LITHUANIA", "LUXEMBOURG", "MADAGASCAR", "MALAWI",
    "MALAYSIA", "MALDIVES", "MALI", "MALTA", "MARSHALL ISLANDS", "MAURITANIA", "MAURITIUS",
    "MEXICO", "FEDERATED STATES OF MICRONESIA", "MOLDOVA", "MONACO", "MONGOLIA", "MONTENEGRO",
    "MOROCCO", "MOZAMBIQUE", "MYANMAR", "NAMIBIA", "NAURU", "NEPAL", "NETHERLANDS", "NEW ZEALAND",
    "NICARAGUA", "NIGER", "NIGERIA", "NORTH MACEDONIA", "NORWAY", "OMAN", "PAKISTAN", "PALAU",
    "PANAMA", "PAPUA NEW GUINEA", "PARAGUAY", "PERU", "PHILIPPINES", "POLAND", "PORTUGAL", 
    "QATAR", "ROMANIA", "RUSSIA", "RWANDA", "SAINT KITTS AND NEVIS", "SAINT LUCIA", 
    "SAINT VINCENT AND THE GRENADINES", "SAMOA", "SAN MARINO", "SAO TOME AND PRINCIPE",
    "SAUDI ARABIA", "SENEGAL", "SERBIA", "SEYCHELLES", "SIERRA LEONE", "SINGAPORE", "SLOVENIA",
    "SOLOMON ISLANDS", "SOMALIA", "SOUTH AFRICA", "SPAIN", "SRI LANKA", "SUDAN", "SOUTH SUDAN",
    "SURINAME", "SWEDEN", "SWITZERLAND", "SYRIA", "TAIWAN", "TAJIKISTAN", "TANZANIA", "THAILAND",
    "TOGO", "TONGA", "TRINIDAD AND TOBAGO", "TUNISIA", "TURKEY", "TURKMENISTAN", "TUVALU", "UGANDA",
    "UKRAINE", "UNITED ARAB EMIRATES", "UNITED KINGDOM", "UNITED STATES", "URUGUAY", "UZBEKISTAN", 
    "VANUATU", "VATICAN CITY", "VENEZUELA", "VIETNAM", "YEMEN", "ZAMBIA", "ZIMBABWE"
]

// global variables 
const maxLives = 12;

var guessedLetters = [];
var currentWordIndex;
var guessingWord = [];
var remainingLives = 0;
var started = false;
var finished = false;
var wins = 0;

console.log(guessingWord)

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

    // checks for spaces " "
    var positions = [];
    for (var i = 0; i < words[currentWordIndex].length; i++){
        if (words[currentWordIndex][i] === " "){
            positions.push(i);
        }
    }

    // pastes spaces " "
    for (var i = 0; i < positions.length; i++){
        guessingWord[positions[i]] = " ";
    }

    document.getElementById("tryAgain").style.display = "none";
    document.getElementById("gameOver").style.display = "none";
    document.getElementById("youWin").style.display = "none";

    updateDisplay();
}

function updateDisplay(){
    // resets html page for new game
    capLetters = guessedLetters.join(" ");
    document.getElementById("totalWins").innerHTML = wins;
    document.getElementById("currentWord").innerHTML = "";
    for (var i = 0; i < guessingWord.length; i++) {
        document.getElementById("currentWord").innerHTML += guessingWord[i];
    }
    document.getElementById("remainingLives").innerHTML = remainingLives;
    document.getElementById("guessedLetters").innerHTML = capLetters;
    if (remainingLives <= 0){
        document.getElementById("gameOver").style.display = "block";
        document.getElementById("tryAgain").style.display = "block";
        finished = true;
    }
}

document.onkeydown = function(event){
    // removes start text 
    document.getElementById("firstStart").style.display = "none";

    // recieves users guess and checks if its valid
    if (finished){
        resetGame();
        finished = false;
    }
    else {
        if (event.keyCode >= 65 && event.keyCode <= 90){
            userGuess(event.key.toUpperCase());
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
        document.getElementById("youWin").style.display = "block";
        document.getElementById("tryAgain").style.display = "block";
        wins++;
        finished = true;
    }
}

function userGuess(letter) {
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