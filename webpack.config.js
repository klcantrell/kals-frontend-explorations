module.exports = {
	entry: "./src/js/index.js",
	output: {
		path: __dirname + "/dist",
		filename: "bundle.js"
	},
	module: {
	    rules: [
	        {
	            test: /\.html$/,
	            exclude: /node_modules/,
	            use: {loader: 'html-loader'}
	        }
	    ]
	}
}