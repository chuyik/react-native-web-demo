const path = require('path');
const webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, 'src')
  },
  entry: [
    path.join(__dirname, '../index.web.js')  // 之前创建的 index.web.js 文件路径
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: [
          'babel-loader?cacheDirectory=true'
        ]
      },
      {
        test: /\.(gif|jpe?g|png|svg)$/,
        loader: 'url-loader',
        query: { name: '[name].[hash:16].[ext]' }
      }
    ]
  },
  output: {
    /* 打包后的内容输出到config.js文件目录下的 dist 目录下（没有就创建一个） */ 
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'   // 打包后的文件名
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    /* webpack插件，用来打包本地的html模板到编译后的文件中 */
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/index.html'),
    }),     
  ],
  resolve: {
    alias: {
      'react-native': 'react-native-web'
    }
  }
};
