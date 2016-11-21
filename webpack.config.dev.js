const path = require('path');
const webpack = require('webpack');


module.exports = {
  devtool: 'source-map',
  entry: [
    'eventsource-polyfill', // necessary for hot reloading with IE
    'webpack-hot-middleware/client',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
  
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
  ],
  module: {
    // preLoaders: [
    // {
    //   test: /\.js$/,
    //   exclude: /node_modules/,
    //   loader: 'eslint-loader'
    // }],
    loaders: [
      {
        test: /\.jsx$/,
        exclude: [/node_modules/, /styles/],
        loader: ['babel'],
        query:{
          presets: ['es2015', 'react','stage-0'],
                plugins: ['transform-decorators-legacy']
        },
        include: path.join(__dirname, 'src')
      },
      {
      test:/\.js$/,
      exclude:/node_modules/,
      loader:'babel-loader',
      query:{
          presets: ['es2015', 'react','stage-0'],
                plugins: ['transform-decorators-legacy']
        }
      },
      {
        test: /\.(jpg|png)$/,
        loader: 'file?name=images/[name].[ext]' 
      },
      {
        test: /\.scss$/,
        loader: 'style!css!sass'
      },
      {
        test: /\.css$/,
        loader: 'style!css'
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file?name=fonts/[name].[ext]'
      }
    ]
  }
};
