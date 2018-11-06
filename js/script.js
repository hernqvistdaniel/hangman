// Globala variabler
var wordList = ["HÄR", "FINNS", "MASSA", "RANDOM", "ORD"]; // Lista med spelets alla ord// Ett av orden valt av en slumpgenerator
var letterBoxes; //Rutorna där bokstäverna ska stå
var hangmanImg = ["h0.png", "h1.png", "h2.png", "h3.png", "h4.png", "h5.png", "h6.png"]; //Bild som kommer vid fel svar
var hangmanImgNr = document.querySelector('img'); // Vilken av bilderna som kommer upp beroende på hur många fel du gjort
var msgElem; // Ger meddelande när spelet är över
var startGameBtn = document.getElementById('startGameBtn'); // Knappen du startar spelet med
var letterButtons = document.querySelectorAll('#letterButtons > li > .btn'); // Knapparna för bokstäverna
var startTime = 5; // Mäter tiden
var selectedWord; // randomizeat ord
var letterBoxesEl = document.querySelector('#letterBox'); //deklaration på de tomma bokstavslådorna



// Funktion som körs då hela webbsidan är inladdad, dvs då all HTML-kod är utförd


// Initiering av globala variabler samt koppling av funktioner till knapparna.
function init() {
  startGameBtn.addEventListener('click', startGame);
}; // End init

window.onload = init; // Se till att init aktiveras då sidan är inladdad

// Funktion som startar spelet vid knapptryckning, och då tillkallas andra funktioner
var startGame = function () {
  document.getElementById('startGameBtn').disabled = true;
  randomizeWord();
  printLetters();

}
// Funktion som slumpar fram ett ord
var randomizeWord = function () {
  selectedWord = wordList[Math.floor(Math.random() * wordList.length)]
}
// Funktionen som tar fram bokstävernas rutor, antal beror på vilket ord
var printLetters = function () {
  for (let i = 0; i < selectedWord.length - 1; i++) {
    document.getElementById('letters').appendChild(letterBoxesEl.cloneNode(true));
  }
}

// Funktion som körs när du trycker på bokstäverna och gissar bokstav
var miss = 0;
const btnClickCallback = function (event) {
  var checkGuess = event.target.value;
  // let a = "x";
  for (let i = 0; i < selectedWord.length; i++) {
    if (selectedWord[i] === event.target.value) {
      console.log("rätt");
      let printSome = document.querySelectorAll('#letterBox');
      printSome[i].innerHTML = '<input type="text" disabled value="' + event.target.value + '"/>';
      pressedButton = "hit";
    }
    else {
      pressedButton = "miss";
      console.log("fel");
      if (selectedWord[i] !== event.target.value){
        for (x = 1; x < hangmanImg.length; x++)
          bild = hangmanImg[x];
      hangmanImgNr.src = "images/h" + miss + ".png";
      }
    }
  }
  if (pressedButton !== "hit") {
    console.log("miss");
    miss++
  }
}





for (let i = 0; i < letterButtons.length; i++) {
  letterButtons[i].addEventListener('click', btnClickCallback);
}


// Funktionen ropas vid vinst eller förlust, gör olika saker beroende av det


// Funktion som inaktiverar/aktiverar bokstavsknapparna beroende på vilken del av spelet du är på


