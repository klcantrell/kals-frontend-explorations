const path = require('path');

module.exports = {
	entry: {
		app: path.join(__dirname, 'src/js/index.js')
	},
	output: {
		path: path.join(__dirname, 'dist'),
		publicPath: 'dist/',
		filename: "[name].bundle.js",
		chunkFilename: "[name].bundle.js"
	},
	module: {
	    rules: [
				{
		      test: /\.js$/,
		      exclude: /node_modules/,
		      use: {
		        loader: 'babel-loader',
		        options: {
		          presets: [
		            ['env', { 
		            	modules: false,
		            	targets: {
		            		browsers: [
		            			"Explorer 11"
		            		]
		            	},
		            	useBuiltIns: true
		            }]
		          ],
		          plugins: [
     						"syntax-dynamic-import",
     						"syntax-async-functions",
         				"transform-object-assign",
     						"transform-regenerator"
		          ]
		        }
		      }
		    }
	    ]
	}
}