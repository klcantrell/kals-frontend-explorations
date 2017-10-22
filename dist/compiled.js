'use strict';

var model = {
	allCats: {
		cat1: {
			name: 'Cat 1',
			url: 'dist/images/cat_peek-800_large_1x.jpg',
			clicks: 0
		},
		cat2: {
			name: 'Cat 2',
			url: 'dist/images/cat_fuzzy-800_large_1x.jpg',
			clicks: 0
		},
		cat3: {
			name: 'Cat 3',
			url: 'dist/images/cat_glasses-800_large_1x.jpg',
			clicks: 0
		},
		cat4: {
			name: 'Cat 4',
			url: 'dist/images/cat_sleep-800_large_1x.jpg',
			clicks: 0
		},
		cat5: {
			name: 'Cat 5',
			url: 'dist/images/cat_woods-800_large_1x.jpg',
			clicks: 0
		}
	},
	isAdminVisible: false
};

var octopus = {
	init: function init() {
		this.setCurrentCat();
		listView.init();
		infoView.init();
		adminView.init();
	},
	updateClicks: function updateClicks() {
		model.allCats[model.currentCat].clicks += 1;
		infoView.renderNewClicks(model.allCats[model.currentCat].clicks);
	},
	updateCatInfo: function updateCatInfo() {
		model.allCats[model.currentCat].name = adminView.nameField.value;
		model.allCats[model.currentCat].url = adminView.urlField.value;
		model.allCats[model.currentCat].clicks = this.processClicksInput(adminView.clicksField.value);
		listView.render();
		infoView.render();
		adminView.render();
	},
	processClicksInput: function processClicksInput(input) {
		if (!isNaN(input)) {
			return parseInt(input);
		} else {
			return model.allCats[model.currentCat].clicks;
		}
	},
	getCatKeysAndNames: function getCatKeysAndNames() {
		var cats = model.allCats,
		    keysAndNames = {};
		for (var i = 0, keys = Object.keys(cats); i < keys.length; i++) {
			keysAndNames[i] = {
				key: keys[i],
				name: cats[keys[i]].name
			};
		}
		return keysAndNames;
	},
	getCatData: function getCatData() {
		var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : model.currentCat;

		return model.allCats[key];
	},
	setCurrentCat: function setCurrentCat() {
		var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'cat1';

		model.currentCat = key;
	},
	getCurrentCat: function getCurrentCat() {
		return model.currentCat;
	},
	changeCatView: function changeCatView(dataKey) {
		if (model.isAdminVisible) {
			this.changeIsAdminVisible();
		}
		infoView.render(dataKey);
	},
	changeIsAdminVisible: function changeIsAdminVisible() {
		model.isAdminVisible = model.isAdminVisible ? false : true;
		adminView.render();
	},
	getIsAdminVisible: function getIsAdminVisible() {
		return model.isAdminVisible;
	}
};

var infoView = {
	init: function init() {
		this.cacheDom();
		this.render();
	},
	cacheDom: function cacheDom() {
		this.catInfo = document.getElementById("catInfo");
	},
	render: function render() {
		var dataKey = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

		this.clearEvents();
		var catData = octopus.getCatData(dataKey);
		var tempString = '<h2>' + catData.name + '</h2>\n\t\t\t<img class="catInfo__pic" src="' + catData.url + '">\n\t\t\t<p>This cat has <span id="clicks">' + catData.clicks + '</span> clicks!</p>';
		this.catInfo.innerHTML = tempString;
		this.setTargets();
		this.bindEvents();
	},
	setTargets: function setTargets() {
		this.clickTarget = this.catInfo.querySelector(".catInfo__pic");
		this.clicksField = this.catInfo.querySelector("#clicks");
	},
	clearEvents: function clearEvents() {
		if (this.clickTarget) {
			this.clickTarget.removeEventListener("click", octopus.updateClicks);
		}
	},
	bindEvents: function bindEvents() {
		this.clickTarget.addEventListener("click", octopus.updateClicks);
	},
	renderNewClicks: function renderNewClicks(newClicks) {
		this.clicksField.textContent = newClicks;
	}
};

var listView = {
	init: function init() {
		this.cacheDom();
		this.render();
		// this.getButtons();
		// this.bindEvents();
	},
	cacheDom: function cacheDom() {
		this.catList = document.getElementById("catList");
	},
	render: function render() {
		this.catList.innerHTML = '';
		var catKeysAndNames = octopus.getCatKeysAndNames();
		for (var i = 0, keys = Object.keys(catKeysAndNames); i < keys.length; i++) {
			var tempString = '<button class="catList__button" data-bind="' + catKeysAndNames[keys[i]].key + '">\n\t\t\t\t\t' + catKeysAndNames[keys[i]].name + '\n\t\t\t\t</button>';
			var tempShell = document.createElement('div');
			tempShell.innerHTML = tempString;
			var button = tempShell.firstChild;
			this.bindEvents(button);
			this.catList.appendChild(button);
		}
	},
	bindEvents: function bindEvents(button) {
		var dataKey = button.getAttribute("data-bind");
		button.addEventListener("click", function () {
			octopus.changeCatView(dataKey);
			octopus.setCurrentCat(dataKey);
		});
	}
	// getButtons: function() {
	// 	this.buttons = this.catList.querySelectorAll(".catList__button");
	// },
	// bindEvents: function() {
	// 	for (let i = 0, keys = Object.keys(this.buttons); i < keys.length; i++) {
	// 		let button = this.buttons[keys[i]];
	// 		let dataKey = button.getAttribute("data-bind");
	// 		button.addEventListener('click', (function() {
	// 			return function() {
	// 				infoView.render(dataKey);
	// 				octopus.setCurrentCat(dataKey);
	// 			};
	// 		})(dataKey));
	// 	}
	// }
};

var adminView = {
	init: function init() {
		this.cacheDom();
		this.render();
		this.bindEvents();
	},
	cacheDom: function cacheDom() {
		this.rootEl = document.getElementById("admin");
		this.adminButton = this.rootEl.querySelector("#adminButton");
		this.adminForm = this.rootEl.querySelector("#adminForm");
		this.nameField = this.rootEl.querySelector("#name");
		this.urlField = this.rootEl.querySelector("#url");
		this.clicksField = this.rootEl.querySelector("#clicks");
		this.saveButton = this.rootEl.querySelector("#saveAdmin");
		this.cancelButton = this.rootEl.querySelector("#cancelAdmin");
	},
	bindEvents: function bindEvents() {
		this.adminButton.addEventListener("click", octopus.changeIsAdminVisible);
		this.cancelButton.addEventListener("click", octopus.changeIsAdminVisible);
		this.saveButton.addEventListener("click", function () {
			octopus.updateCatInfo();
			octopus.changeIsAdminVisible();
		});
	},
	render: function render() {
		if (octopus.getIsAdminVisible()) {
			this.adminForm.classList.remove("admin__form--hidden");
			var catData = octopus.getCatData();
			this.nameField.value = catData.name;
			this.urlField.value = catData.url;
			this.clicksField.value = catData.clicks;
		} else {
			this.adminForm.classList.add("admin__form--hidden");
		}
	}
};

octopus.init();
