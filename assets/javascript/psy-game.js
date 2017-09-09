// 
//  Psychic Game game.js
//  Bo Slott
//  September 2017

var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
var symbols = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "?", "~"];

var totWins = 0;
var totLosses = 0;
var totGames = 0;

document.getElementById("letters-button").onclick = function(event) {
  document.getElementById("gameplay-header-text").textContent = "Letters";
  document.getElementById("outer-gameboard").classList.remove("hidden");
  var option = "l";

  gameOn (option);
}

document.getElementById("numbers-button").onclick = function(event) {
  document.getElementById("gameplay-header-text").textContent = "Numbers";
  document.getElementById("outer-gameboard").classList.remove("hidden");
  var option = "n";

  gameOn (option);
}

document.getElementById("symbols-button").onclick = function(event) {
  document.getElementById("gameplay-header-text").textContent = "Symbols";
  document.getElementById("outer-gameboard").classList.remove("hidden");
  var option = "s";

  gameOn (option);
}


function gameOn(option) {
  var totGuesses = 0;
  var userGuessArray = [];

  var computerGuess = determineCompGuess(option);

  document.onkeyup = function(event) {
    var userGuess = event.key;
    console.log(userGuess);
    userGuess = userGuess.toUpperCase();

    var correct = validGuess(option, userGuess, userGuessArray);

    if (correct) {
      repeatGuess(userGuess, userGuessArray);
    }
   
   console.log("What is userGuessArray right now? -> " + userGuessArray);

   totGuesses = comparison(userGuess, computerGuess, option, totGuesses);

   document.getElementById("guessesLeft").textContent = totGuesses;

    }

    


}


function determineCompGuess (option) {
  if (option === "l") {
    computerGuess = letters[Math.floor(Math.random()*letters.length)];
  }
  else if (option === "n") {
    computerGuess = numbers[Math.floor(Math.random()*numbers.length)];
  }
  else {
    computerGuess = symbols[Math.floor(Math.random()*symbols.length)];
  }

  return computerGuess;
}



// This function compares the user guess to make sure it is a valid letter, number, or symbol based on the user's choice of game play

function validGuess (option, userGuess, userGuessArray) {
  var ohNo = 0;

  if (option === "l") {
    console.log(option);
    for (i=0; i<letters.length; i++) {
      if (userGuess != letters[i]) {
        ohNo++;
        console.log(letters[i] + " " + ohNo);
      }
      if (ohNo >= 26) {
        alert("Oh no! You must only choose a letter");
        console.log("Oh No: " + ohNo);
      }
    }
    if (ohNo < 26) {
      return true;
      console.log(userGuessArray);
    }
  }

  if (option === "n") {
    for (i=0; i<numbers.length; i++) {
      if (userGuess != numbers[i]) {
        ohNo++;
      }
      if (ohNo >= 10) {
        alert("Oh no! You must only choose a number");
      }
    }
    if (ohNo < 10) {
      return true;
    }
  }

  if (option === "s") {
    for (i=0; i<symbols.length; i++) {
      if (userGuess != symbols[i]) {
        ohNo++;
      }
      if (ohNo >= 12) {
        alert("Oh no! You must only choose a symbol");
      }
    }
    if (ohNo < 12) {
      return true;
    }
  }
}


function repeatGuess (userGuess, userGuessArray) {
  var count = 0;

  for (i=0; i<userGuessArray.length; i++) {
    if (userGuess != userGuessArray[i]) {
      count++;
    }
    else {
      alert("You have already chosen that guess. Please chose another guess");
    }
  }
  
  if (count === userGuessArray.length) {
    userGuessArray.push(userGuess);
    renderChoices (userGuessArray);
    

  }
}

function renderChoices(userGuessArray) {
  document.getElementById("userLetter").textContent = userGuessArray[userGuessArray.length-1];

  for(i=0; i<userGuessArray.length; i++) {
    document.getElementById("userGuess" + i).textContent = userGuessArray[i];
  }
}

function comparison(userGuess, computerGuess, option, totGuesses) {
  if (userGuess != computerGuess) {
    document.getElementById("yesNo").textContent = "Nope, try again";
    totGuesses++;

    switch (option) {
      case "l":
        return (9 - totGuesses);
        break;
      case "n":
        return (5 - totGuesses);
        break;
      case "s":
        return (8 - totGuesses);
        break;
    }
  }
}



