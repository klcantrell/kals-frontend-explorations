export class BasicController {
	constructor(model, view) {
		this.model = model;
		this.view = view;
	}

	render(page) {
		this.view.render(this.model[page])
	}
}

export class PortfolioController {
	constructor(model, view) {
		this.model = model;
		this.view = view;
	}

	async render(page) {
		let modelData = this.model[page],
				content = this.view[modelData.name];
		if (!content) {
			content = await this.fetchAssets(modelData);
		}
		let res = Object.assign({}, modelData, content);
		this.view.render(res);
	}

	fetchAssets(data) {
		return new Promise((resolve) => {
			import(`../portfolios/${data.indexId}`)
				.then((res) => {
					this.view[data.name] = res.default();
					resolve(this.view[data.name]);
				});
		});
	}
}