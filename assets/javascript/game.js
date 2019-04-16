//global variables

var wordArray = ["HERMIONE", "HOGWARTS", "NIFFLER", "VOLDEMORT", "POLYJUICE", "WAND", "DOBBY", "NAGINI", "DUMBLEDORE", "HORCRUX", "POTION", "BUCKBEAK"];
// empty variable to hold current word choice from the array
var word = "";
// Empty variable to hold the actual letters in the word
var wordLetters = [];
// Variable that holds the number of blanks "_" in the word
var numBlanks = 0;
// Variable to record user guess
userGuess = "";

// Empty array to store the answer as it displays for the user
var answerDisplay = [];
// Empty array to hold all correct guesses
var correctLetters = [];
// Empty array to hold all the wrong guesses
var wrongLetters = [];

//Game Stats
var wins = 0;
var losses = 0;
var wrongGuessesLeft = 6;                 


// function to start game & load first word. Display blanks for each letter in word.
function newGame () {

    //Computer selects a word from the array
    word = wordArray[Math.floor(Math.random() * wordArray.length)];
        console.log("The current word chosen is: " + word); // Testing via Console.Log

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

    //Add the correct number of blanks to the answerDisplay that corresponds with the length of the currentWord

        function displayWordBlanks() {
        var e = "";   
            
        for (var y=0; y<wordLetters.length; y++)
        {
            e += "_ ";
        }
        document.getElementById("blanks").innerHTML = e;
    }
    displayWordBlanks();


    //Change HTML elements to display current information
    document.getElementById("remGuesses").innerHTML = wrongGuessesLeft;
    document.getElementById("totalWins").innerHTML = wins;
    document.getElementById("totalLosses").innerHTML = losses;

    //reset hangman image
    document.getElementById("man").src = "assets/images/hangman-" + wrongGuessesLeft + ".png";
   
}

//start the game on any key pressed
document.onkeyup = function () {
    newGame();

    // function to record user key choice. Change case to all caps.
    document.onkeyup = function(event) {
        userGuess = event.key.toUpperCase();
        console.log("user guess is " + userGuess);

        // check if user key choice is included in word. 

       if (wordLetters.indexOf(userGuess) != -1) {
            correctLetters.push(userGuess);
            console.log("correct letters are: " + correctLetters);
        }
        else {
            wrongLetters.push(userGuess);
            console.log("wrong letters are: " + wrongLetters);
        } 

    }

    /* If key choice included in word display letter in appropriate spot. 
        If not included display letter in letters already guessed, increment number of guesses remaining down by 1, 
        change hangman image to show next body image step */

    // function to record number of wins

    // function to display number of wins

    // function to load next word. Repeat until end of word array

    // function to display end of game message


}





