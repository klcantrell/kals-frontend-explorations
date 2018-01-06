const merge = require('webpack-merge'),
			baseConfig = require('./webpack.base.js'),
			path = require('path'),
			webpack = require('webpack'),
      ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = merge(baseConfig, {
	devServer: {
	  compress: true,
	  stats: "errors-only",
	  open: true
	  // hot: true
	},
	module: {
		rules: [
      {
        test: /\.css$/,
        exclude: path.resolve(__dirname, 'src/css'),
        loader: 'css-loader'
      },
      {
        test: /\.css$/,
        include: path.resolve(__dirname, 'src/css'),
        loader: ExtractTextPlugin.extract({
          use: {
            loader: 'css-loader'
          }
        })
      }
		]
	},
  plugins: [
    // new webpack.NamedModulesPlugin(),
    // new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('app.css')
  ]
})