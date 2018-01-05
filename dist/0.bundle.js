webpackJsonp([0,8,11,12,15],{

/***/ 118:
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ 119:
/***/ (function(module, exports, __webpack_require__) {

module.exports = {srcSet:__webpack_require__.p + "74d20a2a9f1bd05c07bbe212a16ab06f-1920.jpg 1920w",images:[{path:__webpack_require__.p + "74d20a2a9f1bd05c07bbe212a16ab06f-1920.jpg",width:1920,height:1280}],src:__webpack_require__.p + "74d20a2a9f1bd05c07bbe212a16ab06f-1920.jpg",toString:function(){return __webpack_require__.p + "74d20a2a9f1bd05c07bbe212a16ab06f-1920.jpg"},placeholder: undefined,width:1920,height:1280};

/***/ }),

/***/ 120:
/***/ (function(module, exports, __webpack_require__) {

var escape = __webpack_require__(126);
exports = module.exports = __webpack_require__(118)(false);
// imports


// module
exports.push([module.i, "body,html{width:100%;height:100%}body{background:grey}.front-side{border:2px solid #000;padding:0;display:flex;flex-flow:column;align-items:stretch}.front-side p{user-select:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;cursor:default}.display{background:rgba(64,64,64,.7);border-top-left-radius:2rem;border-top-right-radius:2rem;flex:1.5;padding-right:5%;display:flex;flex-flow:column;justify-content:flex-end;align-items:flex-end}.display p{margin:0}.display #output{font-size:3em;color:#fff}.display #queue{font-size:1rem;color:#000;height:2rem;width:300px;line-height:1rem;text-align:right;word-break:normal;overflow-y:auto}.nums-ops{flex:5;display:flex;flex-flow:row}.nums-ops p{cursor:pointer}.left-side{flex:3;display:flex;flex-flow:row wrap;font-size:2em;color:#fff}.left-side p{background:rgba(0,136,255,.6);flex:1 30%;border:1px solid #000;text-align:center;margin:0;line-height:2.2em}.left-side .top-ops{background:rgba(255,0,255,.6)}.left-side #zero{flex:2 60%;border-bottom-left-radius:2rem}.right-side{background:rgba(64,64,64,.7);border-bottom-right-radius:2rem;flex:1;display:flex;flex-flow:column;font-size:3em;color:#fff}.right-side p{border:1px solid #000;text-align:center;margin:0}.right-side #minus{flex:1}.right-side #equals,.right-side #plus{flex:2;line-height:3em}.right-side #equals{border-bottom-right-radius:2rem}.back-side .back-texture{height:100%;width:100%;border:2px solid #000;border-radius:2rem;background-image:url(" + escape(__webpack_require__(119)) + ");background-size:cover;opacity:.8}.scene{width:326px;height:500px;position:relative;perspective:1000px;margin:12vh auto}.object{width:100%;height:100%;position:absolute;transform-style:preserve-3d;-webkit-transform-style:preserve-3d;-ms-transform-style:none;-ms-perspective:1000px;transform:translateZ(50px) rotateY(45deg) rotate(20deg);-ms-transform:none;transition:transform 2s}.object:hover{transform:translateZ(50px) rotateY(0deg) rotate(0deg);-ms-transform:none}.object:hover .front-side{-ms-transform:translateZ(50px) rotateY(0deg) rotate(0deg) translateZ(20px)}.object:hover .back-side{-ms-transform:translateZ(50px) rotateY(0deg) rotate(0deg) translateZ(-20px)}.object:hover .left-side-3D{-ms-transform:translateZ(50px) rotateY(0deg) rotate(0deg) rotateY(-90deg) translateZ(162px)}.object:hover .right-side-3D{-ms-transform:translateZ(50px) rotateY(0deg) rotate(0deg) rotateY(90deg) translateZ(162px)}.object figure{margin:0;position:absolute;backface-visibility:visible;-webkit-backface-visibility:visible;-ms-backface-visibility:visible;-ms-transition:transform 1s ease-in-out}.object .back-side,.object .front-side{width:324px;height:498px}.object .front-side{transform:rotateY(0deg) translateZ(20px);-ms-transform:translateZ(50px) rotateY(45deg) rotate(20deg) rotateY(0deg) translateZ(20px);border-radius:2rem}.object .back-side{transform:rotateY(0deg) translateZ(-20px);-ms-transform:translateZ(50px) rotateY(45deg) rotate(20deg) rotateY(0deg) translateZ(-20px);z-index:-1}.object .left-side-3D,.object .right-side-3D{background:#776e77;height:398px;width:40px;left:142px;top:50px;z-index:-1}.object .left-side-3D{transform:rotateY(-90deg) translateZ(162px);-ms-transform:translateZ(50px) rotateY(45deg) rotate(20deg) rotateY(-90deg) translateZ(162px)}.object .right-side-3D{transform:rotateY(90deg) translateZ(162px);-ms-transform:translateZ(50px) rotateY(45deg) rotate(20deg) rotateY(90deg) translateZ(162px)}@media screen and (max-width:400px){.scene{width:245.5px;height:375px}.object .back-side,.object .front-side{width:243px;height:373.5px}.left-side p,.right-side #equals,.right-side #plus{line-height:normal}.object .left-side-3D,.object .right-side-3D{height:298.5px;width:30px;left:106.5px;top:37.5px}.object .left-side-3D{transform:rotateY(-90deg) translateZ(121.5px);-ms-transform:translateZ(50px) rotateY(45deg) rotate(20deg) rotateY(-90deg) translateZ(121.5px)}.object .right-side-3D{transform:rotateY(90deg) translateZ(121.5px);-ms-transform:translateZ(50px) rotateY(45deg) rotate(20deg) rotateY(90deg) translateZ(121.5px)}.object .front-side{transform:rotateY(0deg) translateZ(15px);-ms-transform:translateZ(50px) rotateY(45deg) rotate(20deg) rotateY(0deg) translateZ(15px);border-radius:2rem}.object .back-side{transform:rotateY(0deg) translateZ(-15px);-ms-transform:translateZ(50px) rotateY(45deg) rotate(20deg) rotateY(0deg) translateZ(-15px)}}", ""]);

// exports


/***/ }),

/***/ 126:
/***/ (function(module, exports) {

module.exports = function escape(url) {
    // If url is already wrapped in quotes, remove them
    if (/^['"].*['"]$/.test(url)) {
        url = url.slice(1, -1);
    }
    // Should url be wrapped?
    // See https://drafts.csswg.org/css-values-3/#urls
    if (/["'() \t\n]/.test(url)) {
        return '"' + url.replace(/"/g, '\\"').replace(/\n/g, '\\n') + '"'
    }

    return url
}


/***/ }),

/***/ 45:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__js_utils__ = __webpack_require__(12);


const calculatorMarkup = __WEBPACK_IMPORTED_MODULE_0__js_utils__["d" /* html */]`
<section>
  <div class="scene">
    <div class="object">
      <figure class="front-side">
        <div class="display">
          <p id="output">0</p>
          <p id="queue"></p>
        </div>
        <div class="nums-ops">
          <div class="left-side">
            <p class="clear top-ops">AC</p>
            <p class="top-ops">/</p>
            <p class="top-ops">X</p>
            <p class="number">1</p>
            <p class="number">2</p>
            <p class="number">3</p>
            <p class="number">4</p>
            <p class="number">5</p>
            <p class="number">6</p>
            <p class="number">7</p>
            <p class="number">8</p>
            <p class="number">9</p>
            <p class="number" id="zero">0</p>
            <p class="number">.</p>
          </div>
          <div class="right-side">
            <p id="minus">-</p>
            <p id="plus">+</p>
            <p id="equals">=</p>
          </div>
        </div>
      </figure>
      <figure class="back-side">
        <div class="back-texture"></div>
      </figure>
      <figure class="left-side-3D"></figure>
      <figure class="right-side-3D"></figure>
    </div>
  </div>
</section>
`;
/* harmony export (immutable) */ __webpack_exports__["calculatorMarkup"] = calculatorMarkup;


/***/ }),

/***/ 49:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["default"] = calculatorScripts;
function calculatorScripts(){

  function init(){
    buttonHandlers();
    calculator3DBehavior();
  }

  // CALCULATION LOGIC

  let calc = {
    currentNum: '0',
    memory: '',
    evalQueue: '',
    equalsPressed: false,
    opPressed: true,
    procInput: function(input){
                 if (input.classList.contains('clear')) {
                   view.clear();
                 } else if (input.classList.contains('number')) {
                   view.displayNumInput(input);
                 } else {
                   view.displayOpResult(input);
                 }
               },
    procNumInput: function(num){
                    if (this.equalsPressed) {
                      view.clear();
                    }
                    if (this.opPressed) {
                      this.opPressed = false;
                    }
                    if (this.currentNum === '0') {
                      this.currentNum = num;
                    } else {
                      this.currentNum = `${this.currentNum}${num}`;
                    }
                  },
    procOpInput: function(op){
                    if (op === '=') {
                      this.procEqualsPressed();
                    } else {
                      if (!calc.opPressed) {
                        if (op === 'X'){
                          this.procMultPressed(op);
                        } else {
                          this.procSumDiffDiv(op);
                       }
                     }
                   }
                 },
    procEqualsPressed: function(){
                        this.memory = this.evalQueue ? $math.round(eval(`${this.evalQueue}${this.currentNum}`), 5) : this.currentNum;
                        this.evalQueue = ``;
                        this.currentNum = this.memory;
                        this.equalsPressed = true;
                      },
    procMultPressed: function(op){
                        if (this.equalsPressed) {
                          this.equalsPressed = false;
                        }
                        this.memory = this.evalQueue ? $math.round(eval(`${this.evalQueue}${this.currentNum}`), 5) : this.currentNum;
                        this.evalQueue = `${this.evalQueue} ${this.currentNum}\*`;
                        this.currentNum = '0';
                        this.opPressed = true;
                     },
    procSumDiffDiv: function(op){
                        if (this.equalsPressed) {
                          this.equalsPressed = false;
                        }
                        this.memory = this.evalQueue ? $math.round(eval(`${this.evalQueue}${this.currentNum}`), 5) : this.currentNum;
                        this.evalQueue = `${this.evalQueue} ${this.currentNum} ${op}`;
                        this.currentNum = '0';
                        this.opPressed = true;
                     }
  };

  let view = {
    isMobile: (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1),
    calculator: document.querySelector(".object"),
    body: document.querySelector("body"),
    output: document.querySelector("#output"),
    clickables: document.querySelectorAll('.nums-ops p'),
    queue: document.querySelector("#queue"),
    adjustTextSize: function(el){
                      if (calc.memory.toString().length > 17 || calc.currentNum.length > 17) {
                        el.style['font-size'] = '1.2em';
                      } else if (calc.memory.toString().length > 10 || calc.currentNum.length > 10) {
                        el.style['font-size'] = '2em';
                      } else {
                        el.style['font-size'] = '3em';
                      }
                    },
    addCalcListeners: function(clickable){
                        if (this.isMobile) {
                          clickable.addEventListener('touchend', function(){
                            calc.procInput(clickable);
                          });
                        } else {
                          clickable.addEventListener('click', function(){
                            calc.procInput(clickable);
                          });
                        }
                      },
    displayNumInput: function(num){
                        calc.procNumInput(num.textContent);
                        this.adjustTextSize(this.output);
                        this.output.textContent = calc.currentNum;
                     },
    clear: function(){
                    calc.currentNum = '0';
                    this.output.textContent = calc.currentNum;
                    calc.evalQueue = '';
                    this.queue.textContent = calc.evalQueue;
                    calc.memory = '';
                    calc.equalsPressed = false;
                    calc.opPressed = true;
                    this.adjustTextSize(this.output);
           },
    displayOpResult: function(op) {
                        calc.procOpInput(op.textContent);
                        this.adjustTextSize(this.output);
                        calc.memory ? this.output.textContent = calc.memory : this.output.textContent = '0';
                        this.queue.textContent = calc.evalQueue;
                     }
  };



  // STYLE BEHAVIOR

  function calculator3DBehavior(){
    view.calculator.addEventListener('touchstart', function(e){
        e.target.style.transform = 'translateZ(50px) rotateY(0deg) rotateZ(0deg)';
        e.stopPropagation();
    });
    view.body.addEventListener('touchstart', function(e){
      view.calculator.style.transform = 'translateZ(50px) rotateY(45deg) rotateZ(20deg)';
    });
  }

       //includes handler that points to calc logic
  function buttonHandlers(){
    for (let i = 0; i < view.clickables.length; i++){
      buttonStyleBehavior(view.clickables[i]);
      view.addCalcListeners(view.clickables[i]);  
    }
  }

  function buttonStyleBehavior(clickable){
    clickable.addEventListener('mousedown', function(event){
      event.target.style.opacity = 0.3;
    });
    clickable.addEventListener('mouseup', function(event){
      event.target.style.opacity = 1;
    });
    clickable.addEventListener('mouseleave', function(event){
      event.target.style.opacity = 1;
    });
    clickable.addEventListener('touchstart', function(event){
      event.target.style.opacity = 0.3;
    });
    clickable.addEventListener('touchend', function(event){
      event.target.style.opacity = 1;
    });
  }

  init();

}

/***/ }),

/***/ 53:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["default"] = calculator;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__html_calculator_markup__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__js_calculator__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__css_calculator_css__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__css_calculator_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__css_calculator_css__);




function calculator() {
	return {
		html: __WEBPACK_IMPORTED_MODULE_0__html_calculator_markup__["calculatorMarkup"],
		script: __WEBPACK_IMPORTED_MODULE_1__js_calculator__["default"],
		styles: __WEBPACK_IMPORTED_MODULE_2__css_calculator_css___default.a
	}
}

/***/ })

});