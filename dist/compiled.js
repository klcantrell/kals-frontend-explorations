'use strict';

var Cat = function Cat() {
	this.name = ko.observable('Cat 1');
	this.imgSrc = ko.observable('dist/images/cat_peek-800_large_1x.jpg');
	this.clickCount = ko.observable(0);
	this.title = ko.computed(function () {
		var title = void 0,
		    clicks = this.clickCount();
		switch (true) {
			case clicks > 10:
				title = 'Ultra Cat';
				break;
			case clicks > 5:
				title = 'Awesome Cat';
				break;
			default:
				title = 'Cool Cat';
				break;
		}
		return title;
	}, this);
	this.nicknames = ko.observableArray(['fuzzy', 'wuzzy']);
};

var ViewModel = function ViewModel() {
	this.currentCat = ko.observable(new Cat());
	this.incrementCounter = function () {
		this.currentCat().clickCount(this.currentCat().clickCount() + 1);
	};
};

ko.applyBindings(new ViewModel());

// const model = {
// 	allCats: {
// 		cat1: {
// 			name: 'Cat 1',
// 			url: 'dist/images/cat_peek-800_large_1x.jpg',
// 			clicks: 0,
// 			nicknames: ['fuzzy', 'wuzzy']
// 		},
// 		cat2: {
// 			name: 'Cat 2',
// 			url: 'dist/images/cat_fuzzy-800_large_1x.jpg',
// 			clicks: 0,
// 			nicknames: ['kitty', 'ditty']
// 		},
// 		cat3: {
// 			name: 'Cat 3',
// 			url: 'dist/images/cat_glasses-800_large_1x.jpg',
// 			clicks: 0,
// 			nicknames: ['whiny', 'tiny']
// 		},
// 		cat4: {
// 			name: 'Cat 4',
// 			url: 'dist/images/cat_sleep-800_large_1x.jpg',
// 			clicks: 0,
// 			nicknames: ['jumpy', 'lumpy']
// 		},
// 		cat5: {
// 			name: 'Cat 5',
// 			url: 'dist/images/cat_woods-800_large_1x.jpg',
// 			clicks: 0,
// 			nicknames: ['smelly', 'belly']
// 		}
// 	},
// 	isAdminVisible: false
// };
