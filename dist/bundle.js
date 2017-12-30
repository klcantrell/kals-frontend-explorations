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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return $on; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return $hashTo; });
const $on = (target, event, handler) => {
  return target.addEventListener(event, handler);
};

const $hashTo = (hash) => {
	window.location.hash = hash;
}



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__router__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__controller__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__model__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__view__ = __webpack_require__(6);
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
/* 2 */
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
/* 3 */
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
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__html_portfolio1_html__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__html_portfolio1_html___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__html_portfolio1_html__);




const PortfolioModel = {
	portfolio1: {
		page: 1,
		info: "Sup",
		description: 'Page 1 stuff...sup',
		content: __WEBPACK_IMPORTED_MODULE_0__html_portfolio1_html___default.a
	},
	portfolio2: {
		page: 2,
		info: "Yo",
		description: 'Page 2 stuff, yo',
		content: __WEBPACK_IMPORTED_MODULE_0__html_portfolio1_html___default.a
	}
};
/* harmony export (immutable) */ __webpack_exports__["a"] = PortfolioModel;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = "<div>\r\n\t<p>I'm portfolio 1's external html</p>\r\n</div>";

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CardView; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return PortfolioView; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return HomeView; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__template__ = __webpack_require__(7);
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
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return card; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return portfolio; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return home; });
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

const card = data => {
  return html`
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
  return html`
    <div class="portfolio">
      <h1>Hey I'm Page ${data.page}</h1>
      <p>My info is ${data.info}</p>
      ${data.content}
      <button id="returnHome">Return</button>
    </div>
  `;
};

const home = () => {
  return html`
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