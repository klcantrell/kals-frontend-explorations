const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: "./src/js/index.js",
	output: {
		path: __dirname + "/dist",
		filename: "bundle.js"
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
		        exclude: path.resolve(__dirname, 'src/css'),
		        loader: 'css-loader'
		      },
		      {
		        test: /\.css$/,
		        include: path.resolve(__dirname, 'src/css'),
		        loader: ExtractTextPlugin.extract(
		        	{use: [
		        		{ loader: 'css-loader',
		        			options: { minimize: true } 
		        		}
               ]
             	}
            )
		      }
	    ]
	},
  plugins: [
    new ExtractTextPlugin("app.css")
  ]
}