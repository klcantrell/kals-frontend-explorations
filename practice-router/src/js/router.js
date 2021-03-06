import { $on } from './utils'

export default class Router {
	constructor(routes) {
		this.routes = routes;
		$on(window, 'hashchange', this.routeHashChange.bind(this));
		this.routeHashChange();
	}

	routeHashChange(e) {
		let hashPaths = window.location.hash.split('/'),
				hashRoot = hashPaths[1],
				hashDestination = hashPaths[2];
		this.sendToController(hashRoot, hashDestination);
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
				this.routes[type].render();
			default:
				break;
		}
	}
}