import appStyles from '../css/app.css';
import Router from './router';
import { BasicController, PortfolioController } from './controller';
import { PortfolioModel } from './model';
import { PortfolioView, CardView, HomeView } from './view';
import { $on, $hashTo } from './utils';

$on(window, 'load', function() {
	class PortfolioViewer {
		constructor() {
			const model = PortfolioModel;
			const view = new PortfolioView();
			this.controller = new PortfolioController(model, view);
		}
	}

	class CardViewer {
		constructor() {
			const model = PortfolioModel;
			const view = new CardView();
			this.controller = new BasicController(model, view);
		}
	}

	class HomeViewer {
		constructor() {
			this.view = new HomeView();
		}
	}

	const portfolioApp = new PortfolioViewer();
	const cardApp = new CardViewer();
	const homeViewer = new HomeViewer();

	const r = new Router({
		portfolio: portfolioApp.controller,
		cards: cardApp.controller,
		home: homeViewer.view
	});

	$hashTo('#/home');
});