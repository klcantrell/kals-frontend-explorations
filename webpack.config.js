const ETP = require("extract-text-webpack-plugin");

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
            loader: 'html-loader'
	        },
		      {
		        test: /\.(png|jpg|gif)$/,
		        use: [
		          {
		            loader: 'file-loader',
							  options: {
							    name: '[name].[ext]',
							    outputPath: 'assets/',
							    publicPath: 'dist/'
							  }  
		          }
		        ]
		      },
	      {
	        test: /\.css$/,
	        loader: 'css-loader'
	      }
	    ]
	}
}