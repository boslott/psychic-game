// 
//  Psychic Game game.js
//  Bo Slott
//  September 2017

var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
var symbols = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "?", "~"];

var totGuesses = 0;
var totWins = 0;
var totLosses = 0;
var totGames = 0;
var userGuess = "";

document.getElementById("letters-button").onclick = function(event) {
  document.getElementById("gameplay-header-text").textContent = "Letters";
  document.getElementById("outer-gameboard").classList.remove("hidden");
  var option = "letters";
  reset(option);


  gameOn (option);
}

document.getElementById("numbers-button").onclick = function(event) {
  document.getElementById("gameplay-header-text").textContent = "Numbers";
  document.getElementById("outer-gameboard").classList.remove("hidden");
  var option = "numbers";
  reset(option);


  gameOn (option);
}

document.getElementById("symbols-button").onclick = function(event) {
  document.getElementById("gameplay-header-text").textContent = "Symbols";
  document.getElementById("outer-gameboard").classList.remove("hidden");
  var option = "symbols";
  reset(option);



  gameOn (option);
}





function gameOn(option) {
  var userGuessArray = [];
  var computerGuess = determineCompGuess(option);

  document.onkeyup = function(event) {
 
    userGuess = event.key;


    userGuess = userGuess.toUpperCase();

    var correct = validGuess(option, userGuessArray);
    var nonRepeat = false;

    if (correct) {
      nonRepeat = repeatGuess(userGuessArray);
    }

    if (nonRepeat) {
      renderChoices(userGuessArray);
    }

   totGuesses = comparison(computerGuess, option, totGuesses);

   if (totGuesses === 0) {
    computerGuess = determineCompGuess(option);
    userGuessArray = [];
   }

   displayGuessesRemaining(totGuesses, option);

   switch (option) {
    case "letters":
      if (totGuesses >= 9) {
        computerGuess = determineCompGuess(option);
        userGuessArray = gameOver("l", option, computerGuess);
      }
      break;
    case "numbers":
      if (totGuesses >= 5) {
        computerGuess = determineCompGuess(option);
        userGuessArray = gameOver("n", option, computerGuess);
      }
      break;
    case "symbols":
      if (totGuesses >= 8) {
        computerGuess = determineCompGuess(option);
        userGuessArray = gameOver("s", option, computerGuess);
      }
      break;
    }

    

  }
}


function displayGuessBoxes (option) {
  var boxes = document.getElementById("userGuessBoxes");

  if (option === "letters") {
    for(i=0; i<9; i++) {
      var newP = document.createElement("p");
      var newSpan = document.createElement("span");
      newSpan.id = "userGuess" + i;
      
      newP.appendChild(newSpan);
      boxes.appendChild(newP); 
    }
  }
  else if (option === "numbers") {
    for(i=0; i<5; i++) {
      var newP = document.createElement("p");
      var newSpan = document.createElement("span");
      newSpan.id = "userGuess" + i;
      
      newP.appendChild(newSpan);
      boxes.appendChild(newP); 
    }
  }
  else {
    for(i=0; i<8; i++) {
      var newP = document.createElement("p");
      var newSpan = document.createElement("span");
      newSpan.id = "userGuess" + i;
      
      newP.appendChild(newSpan);
      boxes.appendChild(newP); 
    }
  }
}


function determineCompGuess (option) {
  if (option === "letters") {
    computerGuess = letters[Math.floor(Math.random()*letters.length)];
  }
  else if (option === "numbers") {
    computerGuess = numbers[Math.floor(Math.random()*numbers.length)];
  }
  else {
    computerGuess = symbols[Math.floor(Math.random()*symbols.length)];
  }

  return computerGuess;
}



// This function compares the user guess to make sure it is a valid letter, number, or symbol based on the user's choice of game play

function validGuess (option, userGuessArray) {
  var ohNo = 0;

  if (option === "letters") {
    for (i=0; i<letters.length; i++) {
      if (userGuess != letters[i]) {
        ohNo++;
      }
      if (ohNo >= 26) {
        alert("Oh no! You must only choose a letter");
      }
    }
    if (ohNo < 26) {
      return true;
    }
  }

  if (option === "numbers") {
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

  if (option === "symbols") {
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




function repeatGuess (userGuessArray) {
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
    return true;
  }
}

function renderChoices(userGuessArray) {
  document.getElementById("userLetter").textContent = userGuessArray[userGuessArray.length-1];

  for(i=0; i<userGuessArray.length; i++) {
    document.getElementById("userGuess" + i).textContent = userGuessArray[i];
  }
}

function comparison(computerGuess, option, totGuesses) {
  if (userGuess != computerGuess) {
    displayWrongChoice();
    totGuesses++;
    return totGuesses;;
  }
  else {
    displayRightChoice();
    gameOver("w", option, computerGuess);
    return 0;
  }
}

function displayWrongChoice() {
  document.getElementById("yesNoBox-yes").classList.add("hidden");
  document.getElementById("yesNoBox-no").classList.remove("hidden");
  document.getElementById("yesNo-no").textContent = "Nope, try again";
}

function displayRightChoice()  {
  document.getElementById("yesNoBox-no").classList.add("hiden");
  document.getElementById("yesNoBox-yes").classList.remove("hidden");
  document.getElementById("yesNo-yes").textContent = "You Win! Now Get Out Of My Head!";
}

function displayGuessesRemaining(totGuesses, option) {
    switch (option) {
      case "letters":
        document.getElementById("guessesLeft").textContent = (9 - totGuesses);

        break;
      case "numbers":
        document.getElementById("guessesLeft").textContent = (5 - totGuesses);
        break;
      case "symbols":
        document.getElementById("guessesLeft").textContent = (8 - totGuesses);
        break;
    }
  
}

function gameOver (winLoss, option, computerGuess) {
  document.getElementById("yesNoBox-no").classList.add("hidden");
  document.getElementById("gameEnd").classList.remove("hidden");
  document.getElementById("compGuess").textContent = computerGuess;

  if (winLoss === "w") {
    totWins++;
    totGames++;
  }
  else {
    totLosses++
    totGames++;
  }

document.getElementById("againButton").onclick = function(event) {
    reset(option);
  }

  var temp = [];
  return temp;
}

function displayTotals () {
  document.getElementById("wins").textContent = totWins;
  document.getElementById("losses").textContent = totLosses;
  document.getElementById("games").textContent = totGames;
}

function reset(option) {
  document.getElementById("userGuessBoxes").textContent = "";
  displayGuessBoxes (option);
  displayGuessesRemaining(option);
  displayTotals();
  totGuesses = 0;
  userGuess = "";
  userGuessArray = "";
  document.getElementById("yesNoBox-no").classList.add("hidden");
  document.getElementById("yesNoBox-yes").classList.add("hidden");
  document.getElementById("gameEnd").classList.add("hidden");
}



