import { portfolio, card, home } from './template';
import { $on, $hashTo } from './utils';

class CardView {
	constructor() {
		this.rootEl = document.getElementById('root');
	}

	render(data) {
		this.el = this.rootEl.querySelector('#cardRoot');
		if (!this.el) {
			$hashTo('#/home');
			return;
		}
		this.el.classList.contains('cardRoot--show') || 
			this.el.classList.add('cardRoot--show');
		this.el.innerHTML = card(data);
		this.bindEvents();
	}

	bindEvents() {
		$on(this.el, 'click', function(e) {
			if (e.target.id === 'closeCard') {
				this.el.classList.remove('cardRoot--show');
				$hashTo('#/home');
			}
		}.bind(this));
	}
}

class PortfolioView {
	constructor() {
		this.el = document.getElementById('root');
	}

	render(data) {
		this.el.innerHTML = portfolio(data);
		data.script();
		// let script = document.createElement('SCRIPT');
		// script.innerHTML = `(${data.script})()`;
		// this.el.appendChild(script);
		this.bindEvents();
	}

	bindEvents() {
		$on(this.el, 'click', function returnHome(e) {
			if (e.target.id === 'returnHome') {
				$hashTo('#/home');
				e.currentTarget.removeEventListener('click', returnHome);
			}
		});
	}
}

class HomeView {
	constructor() {
		this.el = document.getElementById('root');
		this.bindEvents();
		// $hashTo('#/home');
	}

	render() {
		if (this.el.querySelector('#cardRoot')) {
			this.bindEvents();
		} else {
			this.el.innerHTML = home();
			this.bindEvents();
		}
	}

	bindEvents() {
		this.list = this.el.querySelector('.projectList');
		$on(this.list, 'click', function hashToHome(e) {
			if (e.target.className === 'projectList__link') {
				$hashTo(e.target.getAttribute('data-hash'));
				e.currentTarget.removeEventListener('click', hashToHome)
			}
		});
	}
}

export { CardView, PortfolioView, HomeView }