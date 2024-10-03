//global variables

const wordArray = [
    "HERMIONE", 
    "HOGWARTS", 
    "NIFFLER", 
    "VOLDEMORT", 
    "POLYJUICE", 
    "WAND", 
    "DOBBY", 
    "NAGINI", 
    "DUMBLEDORE", 
    "HORCRUX", 
    "POTION", 
    "BUCKBEAK", 
    "WEASLEY", 
    "HARRY", 
    "HAGRID", 
    "MALFOY", 
    "DRAGON", 
    "WIZARD", 
    "QUIDDITCH",
    "SNAPE",
    "MCGONAGALL",
    "DURSLEY",
    "LUNA",
    "FIREBOLT",
    "PHOENIX",
    "POTTER",
    "HEDWIG",
    "GRYFFINDOR",
    "SLYTHERIN",
    "HUFFLEPUFF",
    "RAVENCLAW"
];
// empty variable to hold current word choice from the array
let word = "";
// Empty variable to hold the actual letters in the word
let wordLetters = [];
// Variable that holds the number of blanks "_" in the word
let numBlanks = 0;
// Variable to record user guess
let userGuess = "";
// Variable hide/show game over buttons
let divGameOver = "";
// modal message for invalid guesses
let modalMessage = "";

// Empty array to store the answer as it displays for the user
let answerDisplay = [];
// Empty array to hold all correct guesses
let correctLetters = [];
// Empty array to hold all the wrong guesses
let wrongLetters = [];
const validLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

//Game Stats
let wins = 0;
let losses = 0;
let wrongGuessesLeft = 6; 

// function to add the correct number of blanks to the answerDisplay that corresponds with the length of the current word

function displayAnswer() {
    let e = "";   
        
    for (let i=0; i < wordLetters.length; i++)
    {
        e += "_ ";
        answerDisplay.push("_");
    }
    document.getElementById("blanks").innerHTML = e;
}

// function to start game & load first word. Display blanks for each letter in word.
function newGame () {
    isFirstGame = false;
    //Computer selects a word from the array
    word = wordArray[Math.floor(Math.random() * wordArray.length)];
    
    //Grab the current word and break it apart into each individual letter
    wordLetters = word.split("");
        console.log("The current word's letters are: " + wordLetters); // Testing via Console.Log

    //Grab the current word and get the number of letters in it
    numBlanks = wordLetters.length;
        console.log("The number of letters in the current word is: " + numBlanks); // Testing via Console.Log

    //Reset game variables needed to be cleared before each new game starts
    wrongGuessesLeft = 6;
    wrongLetters = [];
    answerDisplay = [];
    correctLetters = [];

    //hide previous win/loss message
    document.getElementById("winMessage").innerHTML = "";
    document.getElementById("lossMessage").innerHTML = "";
    
    // set answer display blanks
    displayAnswer();
    updateDisplay();
    if (!document.getElementById("startBtn").classList.contains("hide")) {
        document.getElementById("startBtn").classList.add("hide");
    }
    if (!document.getElementById("playAgain").classList.contains("hide")) {
        document.getElementById("playAgain").classList.add("hide");
    }

}

function checkGuess(chosenLetter, wordToGuess) {
    // check if letter has already been guessed
    if (wrongLetters.includes(chosenLetter) || correctLetters.includes(chosenLetter)) {
        handleInvalidGuess('duplicate')
    } else if (!validLetters.includes(chosenLetter)) {
        handleInvalidGuess('invalid')
    } else {
        if (wordToGuess.includes(chosenLetter)) {
            handleCorrectGuess(chosenLetter, wordToGuess)
        } else {
            handleWrongGuess(chosenLetter)
        }
    }
}

function scoreWin() {
    wins++
    document.getElementById("winMessage").innerHTML = "You win!" + "<br>";
    document.getElementById("playAgain").classList.remove("hide");
}

function scoreLoss() {
    losses++
    document.getElementById("lossMessage").innerHTML = "Game over. You Lost!" + "<br>" + "The correct word is " + word + "<br>";
    document.getElementById("playAgain").classList.remove("hide");
}

function handleInvalidGuess(reason) {
    // alert("You already guessed that letter. Try again!")
    const message = reason === 'duplicate' ? "You already guessed that letter. Try again." : "That wasn't a letter. Try again."
    document.getElementById("modal-message").innerHTML = message
    $('#getCodeModal').on('shown.bs.modal', function () {
        $('#getCodeModal').trigger('focus')
        })

    $("#getCodeModal").modal('show');
}

function handleWrongGuess(chosenLetter) {
    wrongLetters.push(chosenLetter)
    wrongGuessesLeft -= 1
    if (wrongGuessesLeft === 0) {
        scoreLoss()
    }
    updateDisplay()
}

function handleCorrectGuess(chosenLetter, chosenWord) {
    correctLetters.push(chosenLetter)
    for (let i = 0; i < chosenWord.length; i++) {
        if (chosenWord[i] === chosenLetter) {
            answerDisplay[i] = chosenLetter
        }
    }
    // check if all blanks are removed. This constitutes a win
    if (!answerDisplay.includes("_")) {
        scoreWin()
    }
    updateDisplay()
}

function updateDisplay() {
    //Change HTML elements to display current information
    document.getElementById("remGuesses").innerHTML = wrongGuessesLeft;
    document.getElementById("totalWins").innerHTML = wins;
    document.getElementById("totalLosses").innerHTML = losses;
    document.getElementById("guessedLetters").innerHTML = wrongLetters;
    document.getElementById("blanks").innerHTML = answerDisplay.join(" ");

    //update hangman image with next step
    document.getElementById("man").src = "assets/images/hangman-" + wrongGuessesLeft + ".png";
}

//press button to start game
document.getElementById("startBtn").addEventListener("click", newGame); {
    newGame();
    // function to record user key choice. Change case to all caps.
    document.onkeyup = function(event) {
        userGuess = event.key.toUpperCase();
        checkGuess(userGuess, word)
    }
}

// function to load next word.
document.getElementById("playAgain").addEventListener("click", newGame);
