const piano = document.querySelector('.piano');
const btnNotes = document.querySelector('.btn-notes');
const btnLetters = document.querySelector('.btn-letters');

let keydownFlag = false;

function playAudio(note){
   const audio = document.querySelector(`audio[data-note=${note}]`);
   audio.currentTime = 0;
   audio.play();
}
//Проигрывание мелодии и активность клавиш по клику мыши
piano.addEventListener('mousedown', (event) => {
   event.target.classList.add('piano-key-active');
   const note = event.target.dataset.note;
   if(note)
      playAudio(note);
});
piano.addEventListener('mouseup', (event) => {
   event.target.classList.remove('piano-key-active');
});
//Проигрывание мелодии и актвность клавиш с клавиатуры
window.addEventListener('keydown', (event) => {
   const letter = (event.code).slice(-1);
   const pianoKey = document.querySelector(`.piano-key[data-letter="${letter}"]`);
   if(!pianoKey)
      return;
   pianoKey.classList.add('piano-key-active');
   const note = pianoKey.dataset.note;
   if(event.code === `Key${letter}` && !keydownFlag) {
      keydownFlag = true;
      playAudio(note);
   }
});
window.addEventListener('keyup', (event) => {
   keydownFlag = false;
   const letter = (event.code).slice(-1);
   const pianoKey = document.querySelector(`.piano-key[data-letter="${letter}"]`);
   if(pianoKey)
      pianoKey.classList.remove('piano-key-active');
});
//Работа переключателя
btnNotes.addEventListener('click', (event) => {
   btnNotes.classList.add('btn-active');
   btnLetters.classList.remove('btn-active');
   piano.classList.add('piano-notes');
   piano.classList.remove('piano-letters');
});
btnLetters.addEventListener('click', (event) => {
   btnLetters.classList.add('btn-active');
   btnNotes.classList.remove('btn-active');
   piano.classList.add('piano-letters');
   piano.classList.remove('piano-notes');
});
/*Можно провести мышкой с зажатой левой или правой кнопкой по клавишам пианино,
при этом они будут нажиматься и звучать*/
let mouseDown = 0;
document.body.onmousedown = function() { 
   mouseDown = 1;
}
document.body.onmouseup = function() {
   mouseDown = 0;
}
piano.addEventListener('mouseout', (event) => {
   event.target.classList.remove('piano-key-active');
});
piano.addEventListener('mouseover', (event) => {
   if(mouseDown){      
      event.target.classList.add('piano-key-active');
      const note = event.target.dataset.note;
      if(note)
         playAudio(note);
   }
});
//возможность развернуть приложение во весь экран
const btnFullscreen = document.querySelector('.fullscreen');

btnFullscreen.addEventListener("click", function(e) {
   toggleFullScreen();
});
function toggleFullScreen() {
   if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
   }else {
      if (document.exitFullscreen) {
         document.exitFullscreen();
      }
   }
}