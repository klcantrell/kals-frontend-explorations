webpackJsonp([9],{

/***/ 48:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__js_utils__ = __webpack_require__(12);


const tictactoeMarkup = __WEBPACK_IMPORTED_MODULE_0__js_utils__["d" /* html */]`
<link href="https://fonts.googleapis.com/css?family=Julius+Sans+One|Marcellus|Raleway" rel="stylesheet">
<section>
  <svg class="board-grid hide-before-load" style="stroke-dasharray: 1000; stroke-dashoffset: 1000;" width="600" height="600" viewBox="0 0 600 600">
    <path id="vertical1" d="m 200 0 0 600" stroke="hsla(195, 58%, 31%, 1)" stroke-width="3"/>
    <path id="vertical2" d="m 400 600 0 -600" stroke="hsla(195, 58%, 31%, 1)" stroke-width="3"/>
    <path id="horizontal1" d="m 0 200 600 0" stroke="hsla(195, 58%, 31%, 1)" stroke-width="3"/>
    <path id="horizontal2" d="m 600 400 -600 0" stroke="hsla(195, 58%, 31%, 1)" stroke-width="3"/>
  </svg>
  <div class="board hide-before-load">
    <div class="board__square" id='0'><div class="board__square-shape">Yo,</div></div>
    <div class="board__square" id='1'><div class="board__square-shape">Come</div></div>
    <div class="board__square" id='2'><div class="board__square-shape">On</div></div>
    <div class="board__square" id='3'><div class="board__square-shape">In</div></div>
    <div class="board__square" id='4'><div class="board__square-shape"></div></div>
    <div class="board__square" id='5'><div class="board__square-shape">And</div></div>
    <div class="board__square" id='6'><div class="board__square-shape">Tic</div></div>
    <div class="board__square" id='7'><div class="board__square-shape">Tac</div></div>
    <div class="board__square" id='8'><div class="board__square-shape">Toe</div></div>
  </div>
  <div class="message message-invert" id="idle-message">
    <p class="message__header">Make a move, it's your turn</p>
    <button class="message__button">Got it</button>
  </div>
  <div class="message message-invert" id="choose-message">
    <p class="message__header">Uh, that square is taken</p>
    <button class="message__button">Got it</button>
  </div>
  <div class="message" id="game-start">
    <p class="message__header">Choose your Shape</p>
    <button class="message__button">X</button>
    <button class="message__button">O</button>
  </div>
  <div class="message" id="game-end">
    <p class="message__header">Game Over</p>
    <p class="message__verdict"></p>
    <button class="message__button">Reset</button>
  </div>  
</section>
`;
/* harmony export (immutable) */ __webpack_exports__["tictactoeMarkup"] = tictactoeMarkup;


/***/ })

});