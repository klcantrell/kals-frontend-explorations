const path = require('path');

module.exports = {
	entry: {
		app: './src/js/index.js'
	},
	output: {
		path: __dirname + '/dist',
		publicPath: 'dist/',
		filename: "[name].bundle.js",
		chunkFilename: "[name].bundle.js"
	},
	module: {
	    rules: [
					{
			      test: /\.js$/,
			      include: path.resolve(__dirname, 'src/js'),
			      use: [{
			        loader: 'babel-loader',
			        options: {
			          presets: [
			            ['env', { modules: false }]
			          ]
			        }
			      }]
			    },
		      {
		        test: /\.(png|jpg|gif)$/,
		        use: {
			        	loader: 'responsive-loader',
			        	options: {
			        		name: 'imgs/[name]-[width].[ext]'
			        	}
		        }
		      },
					{
					  test: /\.(ttf|eot|woff|woff2)$/,
					  loader: "file-loader",
					  options: {
					    name: "fonts/[name].[ext]",
					  }
					}
	    ]
	}
}