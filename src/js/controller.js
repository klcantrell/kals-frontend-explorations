export default class BasicController {
	constructor(model, view) {
		this.model = model;
		this.view = view;
	}

	render(page) {
		this.view.render(this.model[page])
	}
}