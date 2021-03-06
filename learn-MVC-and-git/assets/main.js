const initialData = {
	cat1: {
		name: 'Cat 1',
		imgSrc: 'dist/images/cat_peek-800_large_1x.jpg',
		clickCount: 0,
		nicknames: ['fuzzy', 'wuzzy']
	},
	cat2: {
		name: 'Cat 2',
		imgSrc: 'dist/images/cat_fuzzy-800_large_1x.jpg',
		clickCount: 0,
		nicknames: ['kitty', 'ditty']
	},
	cat3: {
		name: 'Cat 3',
		imgSrc: 'dist/images/cat_glasses-800_large_1x.jpg',
		clickCount: 0,
		nicknames: ['whiny', 'tiny']
	},
	cat4: {
		name: 'Cat 4',
		imgSrc: 'dist/images/cat_sleep-800_large_1x.jpg',
		clickCount: 0,
		nicknames: ['jumpy', 'lumpy']
	},
	cat5: {
		name: 'Cat 5',
		imgSrc: 'dist/images/cat_woods-800_large_1x.jpg',
		clickCount: 0,
		nicknames: ['smelly', 'belly']
	}
};

const Cat = function(data) {
	this.name = ko.observable(data.name);
	this.imgSrc = ko.observable(data.imgSrc);
	this.clickCount = ko.observable(data.clickCount);
	this.title = ko.computed(function() {
		let title,
			clicks = this.clickCount();
		switch (true) {
			case (clicks > 10):
				title = 'Ultra Cat';
				break;
			case (clicks > 5):
				title = 'Awesome Cat';
				break;
			default:
				title = 'Cool Cat';
				break;
		}
		return title;
	}, this);
	this.nicknames = ko.observableArray(data.nicknames);
};


const ViewModel = function() {
	let self = this;

	self.catList = ko.observableArray([]);
	for (let i = 0, dataKeys = Object.keys(initialData); i < dataKeys.length; i++) {
		self.catList.push(new Cat(initialData[dataKeys[i]]));
	}

	self.currentCat = ko.observable(self.catList()[0]);


	// binding context is currentCat
	self.incrementCounter = function() {
		this.clickCount(this.clickCount() + 1);
	};

	self.changeCatView = function(clickedCat) {
		self.currentCat(clickedCat);
	};
};



ko.applyBindings(new ViewModel());




