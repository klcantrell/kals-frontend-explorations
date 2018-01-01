/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return $on; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return $hashTo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return html; });
const $on = (target, event, handler) => {
  return target.addEventListener(event, handler);
};

const $hashTo = (hash) => {
	window.location.hash = hash;
}

const html = (literals, ...customs) => {
  let result = '';
  customs.forEach((custom, i) => {
    let lit = literals[i];
    if (Array.isArray(custom)) {
      custom = custom.join('');
    }
    result += lit;
    result += custom;
  });
  result += literals[literals.length - 1];
  return result;
};



/***/ }),
/* 1 */
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
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__router__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__controller__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__model__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__view__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils__ = __webpack_require__(0);






Object(__WEBPACK_IMPORTED_MODULE_4__utils__["b" /* $on */])(window, 'load', function() {
	class PortfolioViewer {
		constructor() {
			const model = __WEBPACK_IMPORTED_MODULE_2__model__["a" /* PortfolioModel */];
			const view = new __WEBPACK_IMPORTED_MODULE_3__view__["c" /* PortfolioView */]();
			this.controller = new __WEBPACK_IMPORTED_MODULE_1__controller__["a" /* default */](model, view);
		}
	}

	class CardViewer {
		constructor() {
			const model = __WEBPACK_IMPORTED_MODULE_2__model__["a" /* PortfolioModel */];
			const view = new __WEBPACK_IMPORTED_MODULE_3__view__["a" /* CardView */]();
			this.controller = new __WEBPACK_IMPORTED_MODULE_1__controller__["a" /* default */](model, view);
		}
	}

	class HomeViewer {
		constructor() {
			this.view = new __WEBPACK_IMPORTED_MODULE_3__view__["b" /* HomeView */]();
		}
	}

	const portfolioApp = new PortfolioViewer();
	const cardApp = new CardViewer();
	const homeViewer = new HomeViewer();

	const r = new __WEBPACK_IMPORTED_MODULE_0__router__["a" /* default */]({
		portfolio: portfolioApp.controller,
		cards: cardApp.controller,
		home: homeViewer.view
	});

	Object(__WEBPACK_IMPORTED_MODULE_4__utils__["a" /* $hashTo */])('#/home');
});

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(0);


class Router {
	constructor(routes) {
		this.routes = routes;
		Object(__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* $on */])(window, 'hashchange', this.routeHashChange.bind(this));
		this.routeHashChange();
	}

	routeHashChange(e) {
		if (window.location.hash.length > 0) {
			let hashPaths = window.location.hash.split('/'),
					hashRoot = hashPaths[1],
					hashDestination = hashPaths[2];
			this.sendToController(hashRoot, hashDestination);
		} else {
			console.log('default');
		}
	}

	sendToController(type, data) {
		switch (type) {
			case 'portfolio':
				this.routes[type].render(data);
				break;
			case 'cards':
				this.routes[type].render(data);
				break;
			case 'home':
				this.routes[type].render(data);
			default:
				break;
		}
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Router;


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class BasicController {
	constructor(model, view) {
		this.model = model;
		this.view = view;
	}

	render(page) {
		this.view.render(this.model[page])
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = BasicController;


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__html_portfolio1_html__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__html_portfolio1_html___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__html_portfolio1_html__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__html_portfolio2_html__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__html_portfolio2_html___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__html_portfolio2_html__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__html_portfolio_scripts_portfolio1__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__html_portfolio_scripts_portfolio2__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__html_portfolio_styles_portfolio1_css__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__html_portfolio_styles_portfolio1_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__html_portfolio_styles_portfolio1_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__html_portfolio_styles_portfolio2_css__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__html_portfolio_styles_portfolio2_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__html_portfolio_styles_portfolio2_css__);








const PortfolioModel = {
	portfolio1: {
		page: 1,
		info: "Sup",
		description: 'Page 1 stuff...sup',
		content: __WEBPACK_IMPORTED_MODULE_0__html_portfolio1_html___default.a,
		script: __WEBPACK_IMPORTED_MODULE_2__html_portfolio_scripts_portfolio1__["a" /* default */],
		styles: __WEBPACK_IMPORTED_MODULE_4__html_portfolio_styles_portfolio1_css___default.a
	},
	portfolio2: {
		page: 2,
		info: "Yo",
		description: 'Page 2 stuff, yo',
		content: __WEBPACK_IMPORTED_MODULE_1__html_portfolio2_html___default.a,
		script: __WEBPACK_IMPORTED_MODULE_3__html_portfolio_scripts_portfolio2__["a" /* default */],
		styles: __WEBPACK_IMPORTED_MODULE_5__html_portfolio_styles_portfolio2_css___default.a
	}
};
/* harmony export (immutable) */ __webpack_exports__["a"] = PortfolioModel;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = "<div class=\"background single-column\">\r\n\t<p>I'm portfolio 1's external html</p>\r\n\t<img src=\"" + __webpack_require__(7) + "\" alt=\"\">\r\n\t<button id=\"p1btn\" class=\"cool-btn\">Sup</button>\r\n</div>";

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = "dist/assets/cloud-400.jpg";

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = "<div class=\"background single-column\">\r\n\t<p>I'm portfolio 2's external html</p>\r\n\t<img src=\"" + __webpack_require__(9) + "\" alt=\"\">\r\n\t<button id=\"p2btn\" class=\"cool-btn\">Yo</button>\r\n</div>";

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = "dist/assets/logo-400.png";

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = p1script;
function p1script() {
	const btn = document.getElementById("p1btn");
	btn.addEventListener('click', function() {
		console.log('sup');
	});
}

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = p2script;
function p2script() {
	const btn = document.getElementById("p2btn");
	btn.addEventListener('click', function() {
		console.log('yo');
	});
}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, ".background {\r\n\tbackground: blue;\r\n}\r\n\r\n.single-column {\r\n\tdisplay: flex;\r\n\tflex-flow: column;\r\n\talign-items: center;\r\n\tjustify-content: center;\r\n}\r\n\r\n.cool-btn {\r\n\tfont-size: 1.2rem;\r\n\ttext-transform: uppercase;\r\n\tmargin: 5px;\r\n\tpadding: 10px;\r\n\tbackground: white;\r\n\tborder: 2px white;\r\n}", ""]);

// exports


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, ".background {\r\n\tbackground: red;\r\n}\r\n\r\n.single-column {\r\n\tdisplay: flex;\r\n\tflex-flow: column;\r\n\talign-items: center;\r\n\tjustify-content: center;\r\n}\r\n\r\n.cool-btn {\r\n\tfont-size: 1.2rem;\r\n\ttext-transform: uppercase;\r\n\tmargin: 5px;\r\n\tpadding: 10px;\r\n\tbackground: white;\r\n\tborder: 2px white;\r\n}", ""]);

// exports


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CardView; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return PortfolioView; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return HomeView; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__template__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(0);



class CardView {
	constructor() {
		this.rootEl = document.getElementById('root');
	}

	render(data) {
		this.el = this.rootEl.querySelector('#cardRoot');
		this.el.classList.contains('cardRoot--hide') && this.el.classList.remove('cardRoot--hide');
		this.el.innerHTML = Object(__WEBPACK_IMPORTED_MODULE_0__template__["a" /* card */])(data);
		this.bindEvents();
	}

	bindEvents() {
		Object(__WEBPACK_IMPORTED_MODULE_1__utils__["b" /* $on */])(this.el, 'click', function(e) {
			if (e.target.id === 'closeCard') {
				this.el.classList.add('cardRoot--hide');
				Object(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* $hashTo */])('#/home');
			}
		}.bind(this));
	}
}

class PortfolioView {
	constructor() {
		this.el = document.getElementById('root');
	}

	render(data) {
		this.el.innerHTML = Object(__WEBPACK_IMPORTED_MODULE_0__template__["c" /* portfolio */])(data);
		let script = document.createElement('SCRIPT');
		script.innerHTML = `(${data.script})()`;
		this.el.appendChild(script);
		this.bindEvents();
	}

	bindEvents() {
		Object(__WEBPACK_IMPORTED_MODULE_1__utils__["b" /* $on */])(this.el, 'click', function returnHome(e) {
			if (e.target.id === 'returnHome') {
				Object(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* $hashTo */])('#/home');
				e.currentTarget.removeEventListener('click', returnHome);
			}
		});
	}
}

class HomeView {
	constructor() {
		this.el = document.getElementById('root');
	}

	render() {
		if (this.el.querySelector('#cardRoot')) {
			this.bindEvents();
		} else {
			this.el.innerHTML = Object(__WEBPACK_IMPORTED_MODULE_0__template__["b" /* home */])();
			this.bindEvents();
		}
	}

	bindEvents() {
		this.list = this.el.querySelector('.projectList');
		Object(__WEBPACK_IMPORTED_MODULE_1__utils__["b" /* $on */])(this.list, 'click', function hashToHome(e) {
			if (e.target.className === 'projectList__link') {
				Object(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* $hashTo */])(e.target.getAttribute('data-hash'));
				e.currentTarget.removeEventListener('click', hashToHome)
			}
		});
	}
}



/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return card; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return portfolio; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return home; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(0);


const card = data => {
  return __WEBPACK_IMPORTED_MODULE_0__utils__["c" /* html */]`
    <div class="card">
      <h1>Page Info</h1>
      <p>This page is about ${data.description}</p>
      <div class="card__controls">
        <a href="#/portfolio/portfolio${data.page}">Learn more</a>
        <button id="closeCard">Close</button>
      </div>
    </div>
  `;
}


const portfolio = data => {
  return __WEBPACK_IMPORTED_MODULE_0__utils__["c" /* html */]`
    <style>${data.styles.toString()}</style>
    <div class="portfolio">
      <h1>Hey I'm Page ${data.page}</h1>
      <div class="portfolio__controls">
        <p>My info is ${data.info}</p>
        <button id="returnHome">Return</button>
      </div>
      ${data.content}
    </div>
  `;
};

const home = () => {
  return __WEBPACK_IMPORTED_MODULE_0__utils__["c" /* html */]`
    <nav class="projectList">
        <a class="projectList__link" data-hash="#/cards/portfolio1">Portfolio Item 1</a>
        <a class="projectList__link" data-hash="#/cards/portfolio2">Portfolio Item 2</a>
    </nav>
    <section id="cardRoot" class="cardRoot cardRoot--hide">
    </section>
  `;
}



/***/ })
/******/ ]);