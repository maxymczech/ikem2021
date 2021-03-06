const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const dotenv = require('dotenv');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  devServer: {
    historyApiFallback: true,
    port: 3000
  },
  entry: ['regenerator-runtime/runtime.js', './src/index.js'],
  mode: 'development',
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel-loader',
      options: { presets: ['@babel/env'] }
    }, {
      test: /\.css$/,
      use: ['style-loader', {
        loader: 'css-loader',
        options: {
          url: false
        }
      }]
    }, {
      test: /\.s[ac]ss$/i,
      use: [
        "style-loader",
        "css-loader",
        "sass-loader"
      ]
    }]
  },
  optimization: {
    minimizer: [new TerserPlugin({
      extractComments: false
    })]
  },
  output: {
    path: path.resolve(__dirname, 'dist/'),
    publicPath: '/dist/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      publicPath: './',
      template: 'public/index.html'
    }),
    new CopyWebpackPlugin({
      patterns: [{
        from: 'public/style.css'
      }, {
        from: 'public/favicon.ico'
      }, {
        from: 'public/images',
        to: 'images'
      }]
    }),
    // new webpack.ProvidePlugin({
    //   process: 'process/browser',
    // }),
    new webpack.DefinePlugin({
      'process': '{"env": ' + JSON.stringify(dotenv.config().parsed) + '}'
    })
  ],
  resolve: { extensions: ['*', '.js', '.jsx'] }
};
