const merge = require('webpack-merge'),
      devConfig = require('./webpack.dev.js'),
      CompressionPlugin = require('compression-webpack-plugin');

module.exports = merge(devConfig, {
	plugins: [
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$|\.ttf$/,
      threshold: 10240,
      minRatio: 0.8,
      deleteOriginalAssets: true
    })
	]
})