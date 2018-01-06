const merge = require('webpack-merge'),
      baseConfig = require('./webpack.base.js'),
      path = require('path'),
      webpack = require('webpack'),
      ExtractTextPlugin = require('extract-text-webpack-plugin'),
      CompressionPlugin = require('compression-webpack-plugin'),
      ImageminPlugin = require('imagemin-webpack-plugin').default,
      BabiliPlugin = require('babili-webpack-plugin');

module.exports = merge(baseConfig, {
  module: {
    rules: [
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
      }
    ]
  },
	plugins: [
    new webpack.optimize.CommonsChunkPlugin({
        name: 'commons',
        filename: 'commons.js'
    }),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 6
      // minChunkSize: 1000
    }),
    new ExtractTextPlugin('app.css'),
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$|\.ttf$/,
      threshold: 10240,
      minRatio: 0.8
      // deleteOriginalAssets: true
    }),
    new ImageminPlugin(),
    new BabiliPlugin()
	]
})