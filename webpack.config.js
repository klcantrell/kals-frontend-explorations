const path = require('path'),
			ExtractTextPlugin = require('extract-text-webpack-plugin'),
			CompressionPlugin = require('compression-webpack-plugin'),
			webpack = require('webpack');

module.exports = {
	entry: {
		app: './src/js/index.js'
	},
	output: {
		path: __dirname + '/dist',
		publicPath: __dirname + '/dist/',
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
		        loader: 'css-loader',
		        options: {
		        	minimize: true
		        }
		      },
		      {
		        test: /\.css$/,
		        include: path.resolve(__dirname, 'src/css'),
		        loader: ExtractTextPlugin.extract(
		        	{use: [
		        		{ loader: 'css-loader',
		        			options: { minimize: true } 
		        		}
              ]}
            )
		      }
	    ]
	},
  plugins: [
    new ExtractTextPlugin("app.css"),
    new webpack.optimize.CommonsChunkPlugin({
				name: 'commons',
				filename: 'commons.js'
		})
  ]
}

    // new CompressionPlugin({
    //   asset: "[path].gz[query]",
    //   algorithm: "gzip",
    //   test: /\.js$|\.css$|\.html$/
    //   threshold: 10240,
    //   minRatio: 0
    // })