const merge = require('webpack-merge'),
			BabiliPlugin = require('babili-webpack-plugin'),
			devConfig = require('./webpack.dev.js');

module.exports = merge(devConfig, {
	plugins: [
		new BabiliPlugin()
	]
})

    // new CompressionPlugin({
    //   asset: "[path].gz[query]",
    //   algorithm: "gzip",
    //   test: /\.js$|\.css$|\.html$/
    //   threshold: 10240,
    //   minRatio: 0
    // })