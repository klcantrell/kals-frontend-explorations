const path = require('path'),
			webpack = require('webpack'),
			ExtractTextPlugin = require('extract-text-webpack-plugin'),
			ImageminPlugin = require('imagemin-webpack-plugin').default,
      BabiliPlugin = require('babili-webpack-plugin');

module.exports = {
	entry: {
		app: './src/js/index.js'
	},
	output: {
		path: __dirname + '/dist',
		publicPath: /*__dirname + '/*/'dist/',
		filename: "[name].bundle.js",
		chunkFilename: "[name].bundle.js"
	},
	devServer: {
	  compress: true,
	  stats: "errors-only",
	  open: true
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
		        loader: ExtractTextPlugin.extract({
		        	use: [{
		        		loader: 'css-loader',
		        		options: { 
		        			minimize: true 
		        		} 
		        	}]
		        })
		      },
					{
					  test: /\.(ttf|eot|woff|woff2)$/,
					  loader: "file-loader",
					  options: {
					    name: "fonts/[name].[ext]",
					  }
					}
	    ]
	},
  plugins: [
    new ExtractTextPlugin("app.css"),
    new webpack.optimize.CommonsChunkPlugin({
				name: 'commons',
				filename: 'commons.js'
		}),
		new webpack.optimize.LimitChunkCountPlugin({
		  maxChunks: 6
		  // minChunkSize: 1000
		}),
    new ImageminPlugin(),
		new BabiliPlugin()
  ]
}