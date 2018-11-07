// Globala variabler
var wordList = ["HÄR", "FINNS", "MASSA", "RANDOM", "ORD"]; // Lista med spelets alla ord// Ett av orden valt av en slumpgenerator
var letterBoxes; //Rutorna där bokstäverna ska stå
var hangmanImgNr = document.querySelector('img'); // Vilken av bilderna som kommer upp beroende på hur många fel du gjort
var msgElem; // Ger meddelande när spelet är över
var startGameBtn = document.getElementById('startGameBtn'); // Knappen du startar spelet med
var letterButtons = document.querySelectorAll('#letterButtons > li > .btn'); // Knapparna för bokstäverna
var startTime = 5; // Mäter tiden
var selectedWord; // randomizeat ord
var letterBoxesEl = document.querySelector('#letterBox'); //deklaration på de tomma bokstavslådorna
var hangmanImg = ["images/h0.png", "images/h1.png", "images/h2.png", "images/h3.png", "images/h4.png", "images/h5.png", "images/h6.png"]; //Bild som kommer vid fel svar


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
var hit = 0;
var miss = 1;
function btnClickCallback(event) {
  event.target.value.disabled = true;
  for (let i = 0; i < selectedWord.length; i++){
    if (event.target.value == selectedWord[i].charAt(0)){
      let printSome = document.querySelectorAll('#letterBox');
      printSome[i].innerHTML = '<input type="text" disabled value="' + event.target.value + '"/>';
      hit++;
    }
  }
  if (selectedWord.includes(event.target.value) == false) {
    miss++;
    document.querySelector("#hangman").src = hangmanImg[miss];
  }
  checkWin();
}

for (let i = 0; i < letterButtons.length; i++) {
  letterButtons[i].addEventListener('click', btnClickCallback);
}

// Funktionen ropas vid vinst eller förlust, gör olika saker beroende av det

function checkWin(){
  if (miss == 6){
    alert("you loose!");
  } if (selectedWord.length == hit) {
    alert("you win!");
  }
}

// Funktion som inaktiverar/aktiverar bokstavsknapparna beroende på vilken del av spelet du är på


