webpackJsonp([16],{

/***/ 118:
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ 123:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(118)(false);
// imports


// module
exports.push([module.i, "body{font-size:18px;background:#5993a6}.board-grid{position:absolute;left:0;right:0;margin:auto}.board{font-family:Raleway,sans-serif;font-size:2em;font-weight:700;color:#edf5f8;display:flex;margin:auto;flex-flow:row wrap;height:600px;width:600px}.hide-before-load{visibility:hidden}.board__square{flex:1 30%;position:relative}.board__square-shape{position:absolute;top:50%;left:50%;transform:translateX(-50%) translateY(-50%);opacity:0}.message{font-family:Juluis Sans One,sans-serif;color:#2d3d86;position:fixed;background:#c6cdeb;box-shadow:0 0 5px 1px #2d3d86,0 2px 2px 1px #3ca0d3;border-radius:10px;top:50vmin;left:50vw;transform:translateX(-10000px) translateY(-100%);transition:transform 1s cubic-bezier(1,.1,.1,1);min-width:250px;display:flex;flex-flow:row wrap;justify-content:center;align-items:center}.message-invert{transform:translateX(10000px) translateY(-100%)}.message--slide-in{transform:translateX(-50%) translateY(-100%)}.message__header{font-family:Marcellus,serif;font-weight:700;font-size:1.2em}.message__header,.message__verdict{flex:1 100%;text-align:center;text-transform:uppercase}.message__verdict{margin-top:0}.message__button{font-family:Raleway,sans-serif;font-size:1.5em;color:#ebeef9;text-transform:uppercase;background:#2d3d86;border-radius:10px;border-color:#fff;outline:none;min-width:30%;margin:0 5%;margin-bottom:5%}@media screen and (max-width:690px){body{font-size:14px}.board,.board-grid{width:400px;height:400px}}@media screen and (max-width:400px){body{font-size:12px}.board,.board-grid{width:250px;height:250px}.svg-X{width:38px;height:38px}.svg-O{width:45px;height:45px}.message{min-width:50vw}}", ""]);

// exports


/***/ })

});