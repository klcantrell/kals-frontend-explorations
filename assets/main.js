const model = {
	allCats: {
		cat1: {
			name: 'Cat 1',
			url: 'dist/images/cat_peek-800_large_1x.jpg',
			clicks: 0,
			nicknames: ['fuzzy', 'wuzzy']
		},
		cat2: {
			name: 'Cat 2',
			url: 'dist/images/cat_fuzzy-800_large_1x.jpg',
			clicks: 0,
			nicknames: ['kitty', 'ditty']
		},
		cat3: {
			name: 'Cat 3',
			url: 'dist/images/cat_glasses-800_large_1x.jpg',
			clicks: 0,
			nicknames: ['whiny', 'tiny']
		},
		cat4: {
			name: 'Cat 4',
			url: 'dist/images/cat_sleep-800_large_1x.jpg',
			clicks: 0,
			nicknames: ['jumpy', 'lumpy']
		},
		cat5: {
			name: 'Cat 5',
			url: 'dist/images/cat_woods-800_large_1x.jpg',
			clicks: 0,
			nicknames: ['smelly', 'belly']
		}
	},
	isAdminVisible: false
};

const KO_Model = {
	clicks: ko.observable(model.allCats.cat1.clicks),
	nicknames: ko.observable(model.allCats.cat1.nicknames)
};

function ViewModel() {
	this.level = ko.computed(function() {
		switch (true) {
			case KO_Model.clicks() > 10:
				return "Level 3: ULTRA CAT";
			case KO_Model.clicks() > 5:
				return "Level 2: AWESOME CAT";
			default:
				return "Level 1: COOL CAT";
		}
	}, this);
	this.nicknames = ko.computed(function() {
		return KO_Model.nicknames()
	});
}

const octopus = {
	init: function() {
		this.setCurrentCat();
		listView.init();
		infoView.init();
		adminView.init();
		ko.applyBindings(new ViewModel());
	},
	updateClicks: function() {
		model.allCats[model.currentCat].clicks += 1;
		infoView.renderNewClicks(model.allCats[model.currentCat].clicks);
		KO_Model.clicks(model.allCats[model.currentCat].clicks);
	},
	updateCatInfo: function() {
		model.allCats[model.currentCat].name = adminView.nameField.value;
		model.allCats[model.currentCat].url = adminView.urlField.value;
		model.allCats[model.currentCat].clicks = this.processClicksInput(adminView.clicksField.value);
		listView.render();
		infoView.render();
		adminView.render();
	},
	processClicksInput: function(input) {
		if (!isNaN(input)) {
			return parseInt(input);
		} else {
			return model.allCats[model.currentCat].clicks;
		}
	},
	getCatKeysAndNames: function() {
		let cats = model.allCats,
			keysAndNames = {};
		for (let i = 0, keys = Object.keys(cats); i < keys.length; i++) {
			keysAndNames[i] = {
				key: keys[i],
				name: cats[keys[i]].name
			};
		}
		return keysAndNames;
	},
	getCatData: function(key = model.currentCat) {
		return model.allCats[key];
	},
	setCurrentCat: function(key = 'cat1') {
		model.currentCat = key;
		KO_Model.clicks(model.allCats[model.currentCat].clicks);
		KO_Model.nicknames(model.allCats[model.currentCat].nicknames);
	},
	getCurrentCat: function() {
		return model.currentCat;
	},
	changeCatView: function(dataKey) {
		if (model.isAdminVisible) {
			this.changeIsAdminVisible();
		}
		infoView.render(dataKey);
	},
	changeIsAdminVisible: function() {
		model.isAdminVisible = model.isAdminVisible ? false : true;
		adminView.render();
	},
	getIsAdminVisible: function() {
		return model.isAdminVisible;
	}
};

const infoView = {
	init: function() {
		this.cacheDom();
		this.render();
	},
	cacheDom: function() {
		this.catInfo = document.getElementById("catInfo");
		this.mvoModule = this.catInfo.querySelector("#mvoModule");
		this.knockoutModule = this.catInfo.querySelector("#knockoutModule");
	},
	render: function(dataKey = undefined) {
		this.clearEvents();
		let catData = octopus.getCatData(dataKey),
			tempString = 
				`<h2>${catData.name}</h2>
				<img class="catInfo__pic" src="${catData.url}">
				<p>This cat has <span id="clicks">${catData.clicks}</span> clicks!</p>`;
		this.mvoModule.innerHTML = tempString;
		this.setTargets();
		this.bindEvents();
	},
	setTargets: function() {
		this.clickTarget = this.catInfo.querySelector(".catInfo__pic");
		this.clicksField = this.catInfo.querySelector("#clicks");
	},
	clearEvents: function() {
		if (this.clickTarget) {
			this.clickTarget.removeEventListener("click", octopus.updateClicks);
		}
	},
	bindEvents: function() {
		this.clickTarget.addEventListener("click", octopus.updateClicks);
	},
	renderNewClicks: function(newClicks) {
		this.clicksField.textContent = newClicks;
	}
};

const listView = {
	init: function() {
		this.cacheDom();
		this.render();
	},
	cacheDom: function() {
		this.catList = document.getElementById("catList");
	},
	render: function() {
		this.catList.innerHTML = '';
		let catKeysAndNames = octopus.getCatKeysAndNames();
		for (let i = 0, keys = Object.keys(catKeysAndNames); i < keys.length; i++) {
			let tempString = 
				`<button class="catList__button" data-bind="${catKeysAndNames[keys[i]].key}">
					${catKeysAndNames[keys[i]].name}
				</button>`;
			let tempShell = document.createElement('div');
			tempShell.innerHTML = tempString;
			let button = tempShell.firstChild;
			this.bindEvents(button);
			this.catList.appendChild(button);
		}
	},
	bindEvents: function(button) {
		let dataKey = button.getAttribute("data-bind");
		button.addEventListener("click", function() {
			octopus.changeCatView(dataKey);
			octopus.setCurrentCat(dataKey);
		});
	}
};

const adminView = {
	init: function() {
		this.cacheDom();
		this.render();
		this.bindEvents();
	},
	cacheDom: function() {
		this.rootEl = document.getElementById("admin");
		this.adminButton = this.rootEl.querySelector("#adminButton");
		this.adminForm = this.rootEl.querySelector("#adminForm");
		this.nameField = this.rootEl.querySelector("#name");
		this.urlField = this.rootEl.querySelector("#url");
		this.clicksField = this.rootEl.querySelector("#clicks");
		this.saveButton = this.rootEl.querySelector("#saveAdmin");
		this.cancelButton = this.rootEl.querySelector("#cancelAdmin") 
	},
	bindEvents: function() {
		this.adminButton.addEventListener("click", octopus.changeIsAdminVisible);
		this.cancelButton.addEventListener("click", octopus.changeIsAdminVisible);
		this.saveButton.addEventListener("click", function() {
			octopus.updateCatInfo();
			octopus.changeIsAdminVisible();
		});
	},
	render: function() {
		if (octopus.getIsAdminVisible()) {
			this.adminForm.classList.remove("admin__form--hidden");
			let catData = octopus.getCatData();
			this.nameField.value = catData.name;
			this.urlField.value = catData.url;
			this.clicksField.value = catData.clicks;
		} else {
			this.adminForm.classList.add("admin__form--hidden");
		}
	}
};

octopus.init();