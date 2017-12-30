import { portfolio, card, home } from './template';
import { $on, $hashTo } from './utils';

class CardView {
	constructor() {
		this.rootEl = document.getElementById('root');
	}

	render(data) {
		this.el = this.rootEl.querySelector('#cardRoot');
		this.el.classList.contains('cardRoot--hide') && this.el.classList.remove('cardRoot--hide');
		this.el.innerHTML = card(data);
		this.bindEvents();
	}

	bindEvents() {
		$on(this.el, 'click', function(e) {
			if (e.target.id === 'closeCard') {
				this.el.classList.add('cardRoot--hide');
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