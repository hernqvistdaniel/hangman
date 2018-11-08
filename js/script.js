// Globala variabler

var wordList = ["NEJLIKA", "SVARTPEPPAR", "ROSMARIN", "BASILIKA", "SALT", "KRYDDPEPPAR",
  "TIMJAN", "GURKMEJA", "SPISKUMMIN", "PAPRIKAPULVER", "GRILLKRYDDA"]; // Lista med spelets alla ord// Ett av orden valt av en slumpgenerator
var letterBoxes; //Rutorna där bokstäverna ska stå
var hangmanImgNr = document.querySelector('img'); // Vilken av bilderna som kommer upp beroende på hur många fel du gjort
var messageH1 = document.querySelector('#messageH1'); // Ger meddelande när spelet är över
var startGameBtn = document.getElementById('startGameBtn'); // Knappen du startar spelet med
var letterButtons = document.querySelectorAll('#letterButtons > li > .btn'); // Knapparna för bokstäverna
var selectedWord; // randomizeat ord
var letterBoxesEl = document.querySelector('#letterBox'); //deklaration på de tomma bokstavslådorna
var hangmanImg = ["images/h0.png", "images/h1.png", "images/h2.png",
  "images/h3.png", "images/h4.png", "images/h5.png", "images/h6.png"]; //Bild som kommer vid fel svar
var startGameBtnStatus = document.getElementById('startGameBtn');
var ul = document.getElementById('letters'); // target UL
var hit = 0;
var miss = 0;

// Initiering av globala variabler samt koppling av funktioner till knapparna.
function init() {
  startGameBtn.addEventListener('click', startGame);
}; // End init

window.onload = init; // Se till att init aktiveras då sidan är inladdad

// Funktion som startar spelet vid knapptryckning, och då tillkallas andra funktioner

var startGame = function () {

  startGameBtnStatus.disabled = true;
  reset();
  randomizeWord();
  printLetters();
  listenButtons();
}

// Funktion som slumpar fram ett ord

var randomizeWord = function () {
  selectedWord = wordList[Math.floor(Math.random() * wordList.length)]
}

// Funktionen som tar fram bokstävernas rutor, antal beror på vilket ord

var printLetters = function () {
  for (i = 0; i < selectedWord.length; i++) {
    var li = document.createElement('li');
    ul.appendChild(li);
    li.innerHTML = '<input id="input" type="text" disabled value="&nbsp;"/>';
  }
};

// Funktion som körs när du trycker på bokstäverna och gissar bokstav

function btnClickCallback(event) {
  event.target.disabled = true;
  for (let i = 0; i < selectedWord.length; i++) {
    if (event.target.value == selectedWord[i]) {
      let printSome = document.getElementsByTagName('input');
      printSome[i].value = event.target.value;
      hit++;
    }
  }

  if (selectedWord.includes(event.target.value) == false) {
    miss++;
    document.querySelector("#hangman").src = hangmanImg[miss];
  }
  checkWin();
}

// Addera clickListener till alla bokstäver på brädet

function listenButtons() {
  for (let i = 0; i < letterButtons.length; i++) {
    letterButtons[i].addEventListener('click', btnClickCallback);
    letterButtons[i].disabled = false;
  }
}

// Funktionen ropas vid vinst eller förlust, gör olika saker beroende av det

function checkWin() {
  if (miss == 6) {
    messageH1.innerHTML = 'Du förlorade!';
    messageH2.innerHTML = 'Rätta ordet var: ' + selectedWord;
    disableButtons();
  } if (selectedWord.length == hit) {
    messageH1.innerHTML = 'Du vann!';
    disableButtons();
  }
}

// Funktion som inaktiverar/aktiverar bokstavsknapparna beroende på vilken del av spelet du är på

function disableButtons() {
  for (let i = 0; i < letterButtons.length; i++) {
    letterButtons[i].disabled = true;
  }
  startGameBtnStatus.disabled = false;
}

// Resetta spelet och ställ tillbaka variabler till 0

function reset() {
  document.querySelector("#hangman").src = hangmanImg[0];
  ul.innerHTML = '';
  miss = 0;
  hit = 0;
  messageH1.innerHTML = '';
}