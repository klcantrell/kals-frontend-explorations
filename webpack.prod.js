const merge = require('webpack-merge'),
      baseConfig = require('./webpack.base.js'),
      path = require('path'),
      webpack = require('webpack'),
      ExtractTextPlugin = require('extract-text-webpack-plugin'),
      CompressionPlugin = require('compression-webpack-plugin'),
      BabiliPlugin = require('babili-webpack-plugin'),
      HtmlCriticalPlugin = require('html-critical-webpack-plugin');

module.exports = merge(baseConfig, {
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: path.join(__dirname, 'src/css'),
        loader: 'css-loader',
        options: {
          minimize: true
        }
      },
      {
        test: /\.css$/,
        include: path.join(__dirname, 'src/css'),
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
        test: /\.(png|jpg|gif)$/,
        exclude: path.join(__dirname, 'src/portfolios/imgs/background'),
        use: [
          {
            loader: 'srcset-loader'
          },
          {
            loader: 'file-loader',
            options: {
              name: 'imgs/[name]-[hash].[ext]',
              publicPath: 'https://s3.us-east-2.amazonaws.com/practice-router-content/'
          }
        }]
      },
      {
        test: /\.(png|jpg|gif)$/,
        include: path.join(__dirname, 'src/portfolios/imgs/background'),
        use: {
            loader: 'file-loader',
            options: {
              name: 'imgs/[name].[ext]',
              publicPath: 'https://s3.us-east-2.amazonaws.com/practice-router-content/'
          }
        }
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: {
          loader: "file-loader",
          options: {
            name: 'fonts/[name].[ext]',
            publicPath: 'https://s3.us-east-2.amazonaws.com/practice-router-content/'
          }
        }
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
      test: /*/\.js$|\.css$|\.html$|*//\.ttf$/,
      threshold: 10240,
      minRatio: 0.8,
      deleteOriginalAssets: true
    }),
    new BabiliPlugin(),
    new HtmlCriticalPlugin({
      base: __dirname,
      src: 'index-dev.html',
      dest: 'index.html',
      inline: true,
      minify: true,
      extract: true,
      width: 1300,
      height: 900,
      penthouse: {
        blockJSRequests: false,
      }
    })
	]
})