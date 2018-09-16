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
        exclude: path.join(__dirname, 'src/css'),
        loader: 'css-loader'
      },
      {
        test: /\.css$/,
        include: path.join(__dirname, 'src/css'),
        loader: ExtractTextPlugin.extract({
          use: {
            loader: 'css-loader'
          }
        })
      },
      {
        test: /\.(png|jpg|gif)$/,
        exclude: path.join(__dirname, 'src/portfolios/imgs/background'),
        use: [
          {
            loader: 'srcset-loader'
          },
          {
            loader: 'file-loader',
            options: {
              name: 'imgs/[name]-[hash].[ext]'
          }
        }]
      },
      {
        test: /\.(png|jpg|gif)$/,
        include: path.join(__dirname, 'src/portfolios/imgs/background'),
        use: {
            loader: 'file-loader',
            options: {
              name: 'imgs/[name].[ext]'
          }
        }
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: {
          loader: "file-loader",
          options: {
            name: 'fonts/[name].[ext]'
          }
        }
      }
		]
	},
  plugins: [
    // new webpack.NamedModulesPlugin(),
    // new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('app.css')
  ]
})