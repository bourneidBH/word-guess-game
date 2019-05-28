//global variables

var wordArray = [
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
var word = "";
// Empty variable to hold the actual letters in the word
var wordLetters = [];
// Variable that holds the number of blanks "_" in the word
var numBlanks = 0;
// Variable to record user guess
userGuess = "";
// Variable hide/show game over buttons
var divGameOver = "";

// Empty array to store the answer as it displays for the user
var answerDisplay = [];
// Empty array to hold all correct guesses
var correctLetters = [];
// Empty array to hold all the wrong guesses
var wrongLetters = [];
var validLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

//Game Stats
var wins = 0;
var losses = 0;
var wrongGuessesLeft = 6; 

// function to add the correct number of blanks to the answerDisplay that corresponds with the length of the current word

function displayAnswer() {
    var e = "";   
        
    for (var y=0; y<wordLetters.length; y++)
    {
        e += "_ ";
        answerDisplay[y] = "_";
    }
    document.getElementById("blanks").innerHTML = e;
}

// function to remove already guess letters from validLetters array
function removeGuessed(arr, value) {

    return arr.filter(function(ele){
        return ele != value;
    });
 
 }
 
 var validLettersRemaining = validLetters;


// function to start game & load first word. Display blanks for each letter in word.
function newGame () {

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

    // set answer display blanks
    displayAnswer();
   
}

//press button to start game
document.getElementById("startBtn").addEventListener("click", newGame); {
    newGame();

    // function to record user key choice. Change case to all caps.
    document.onkeyup = function(event) {
        userGuess = event.key.toUpperCase();
        console.log("user guess is " + userGuess);

        // check if userGuess is in validLetters array
        if (validLettersRemaining.indexOf(userGuess) != -1) {

            // check if user key choice is included in word. 
            if (wordLetters.indexOf(userGuess) != -1) {

                //for loop to step through each value in wordLetters array 
                //check each index for match to userGuess
                //for each match push userGuess to correctLetters 
                for (var w = 0; w < wordLetters.length; w++) {
                    if (wordLetters[w] === userGuess) {
                        correctLetters.push(userGuess);
                        console.log("correct letters are: " + correctLetters);

                        console.log("correct letter is at index " + wordLetters[w]);
                        answerDisplay[w] = userGuess;
                        
                    }
                }
                console.log(answerDisplay);
                //If key choice included in word display letter in appropriate spot. 

                document.getElementById("blanks").innerHTML = answerDisplay.join(" ");

            }
            //If not included display letter in letters already guessed, increment number of guesses remaining down by 1 
            else {
                wrongLetters.push(userGuess);
                wrongGuessesLeft = wrongGuessesLeft -1;
                console.log("wrong letters are: " + wrongLetters);
                console.log("wrong guesses left: " + wrongGuessesLeft);
            } 

            //check for win. 
            if (correctLetters.length === wordLetters.length) {
                wins ++;
                document.getElementById("winMessage").innerHTML = "You win!" + "<br>";
                document.getElementById("winMessage").classList.toggle("resetShow");

                //Show game reset button
                function gameOver() {
                    divGameOver = document.getElementById("gameReset");
                    divGameOver.className =+ " " + "resetShow";
                    //clear wrong letter list
                    wrongLetters = [];
                    wrongGuessesLeft = 6;
                }
                gameOver();
            }
            //check for loss
            if (wrongGuessesLeft === 0) {
                losses ++;
                document.getElementById("lossMessage").innerHTML = "Game over. You Lost!" + "<br>" + "The correct word is " + word + "<br>";
                document.getElementById("lossMessage").classList.add("resetShow");

                //Show game reset button
                function gameOver() {
                    divGameOver = document.getElementById("gameReset");
                    divGameOver.className += " " + "resetShow";
                    //clear wrong letter list
                    wrongLetters = [];
                    wrongGuessesLeft = 6;
                }
                gameOver();

            }
            //Change HTML elements to display current information
            document.getElementById("remGuesses").innerHTML = wrongGuessesLeft;
            document.getElementById("totalWins").innerHTML = wins;
            document.getElementById("totalLosses").innerHTML = losses;
            document.getElementById("guessedLetters").innerHTML = wrongLetters;


            //update hangman image with next step
            document.getElementById("man").src = "assets/images/hangman-" + wrongGuessesLeft + ".png";

            // remove guessed letter from valid letters remaining
            validLettersRemaining = removeGuessed(validLettersRemaining, userGuess);
            console.log(validLettersRemaining);
        }
        else {
            // alert("You already guessed that letter. Try again!")
            $('#getCodeModal').on('shown.bs.modal', function () {
                $('#getCodeModal').trigger('focus')
              })
            $("#getCodeModal").modal('show');
        }

    }

// function to start game & load first word. Display blanks for each letter in word.
function resetGame () {
    // hide start button
    document.getElementById("startBtn").style.display = "none";

    //Reset game variables needed to be cleared before each new game starts
    wrongGuessesLeft = 6;
    wrongLetters = [];
    answerDisplay = [];
    correctLetters = [];
    validLettersRemaining = validLetters;

    //reset hangman image to original
    document.getElementById("man").src = "assets/images/hangman-" + wrongGuessesLeft + ".png";

    //hide previous win/loss message
    document.getElementById("winMessage").innerHTML = "";
    document.getElementById("lossMessage").innerHTML = "";

    //Computer selects a word from the array
    word = wordArray[Math.floor(Math.random() * wordArray.length)];

    //Grab the current word and break it apart into each individual letter
    wordLetters = word.split("");
        console.log("The current word's letters are: " + wordLetters); // Testing via Console.Log

    //Grab the current word and get the number of letters in it
    numBlanks = wordLetters.length;
        console.log("The number of letters in the current word is: " + numBlanks); // Testing via Console.Log

    //Add the correct number of blanks to the answerDisplay that corresponds with the length of the currentWord
    displayAnswer(); 
   
} 

    // function to load next word.
    document.getElementById("playAgain").addEventListener("click", resetGame);
    resetGame();

}