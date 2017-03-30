## RN 转换 Web 教程

1. 下载待转换的 RN Demo 项目: [React-Native-Demo](https://github.com/Calvin92/React-Native-Demo)

2. 引入必要的组件, 然后 `yarn` 或 `npm install` 安装后继续后面步骤

  ```json
    "react-native-web": "0.0.76",      // 核心 web 转换库
    "webpack": "^2.2.1"                // webpack 打包工具
    "babel-loader": "^6.4.0",          // babel 的 webpack 插件，语法降级工具
    "html-webpack-plugin": "^2.28.0",  // webpack 的 html 插件
  ```

3. 创建 `index.web.js` 文件，并添加如下代码:

  ```js
  import React, { Component } from 'react';
  import { View, AppRegistry } from 'react-native';
  import SecondKillContainer from './App/Containers/SecondKillContainer'

  class MyReactNativeDemo extends Component {
    render() {
      return (
        <View>
          <SecondKillContainer />
        </View>
      )
    }
  }

  AppRegistry.registerComponent('App', () => MyReactNativeDemo);

  /**
  * 以下内容是转换 web 页面的关键，
  * 等会还会创建一个对应的 html 模板，
  * 视图对应 id 为 'react-root'
  */
  AppRegistry.runApplication('App', {
    rootTag: document.getElementById('react-root')
  });
  ```

4. 创建一个 `web` 目录，专门用来处理 web 相关的代码

  ```bash
  react-native-web-demo
      |__ ios
      |__ android
      |__ web       // 创建该目录
      |__ package.json
      |__ ...
  ```

5. 在 `web` 目录中创建 `webpack.config.js` 文件： 并实现内容： 

  ```js
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
  ```

6. 在 `web` 目录下创建一个 `src` 目录，然后创建一个 HTML 模板: `index.html`:

  ```html
  <!DOCTYPE html>
  <html lang="en">

  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>React Native for Web</title>
  </head>

  <body>
      <div id="react-root"></div>
  </body>

  </html>
  ```

7. 回到工程根目录，根据命令进行打包即可：

  ```bash
  webpack --config web/webpack.config.js
  ```

8. 最终会在 `web/dist` 目录下得到打包后的内容: 

  ```bash
  react-native-web-demo
      |__ ios
      |__ android
      |__ web
          |__ dist
              |__ bundle.js
              |__ index.html
          |__ src
              |__ index.html
          |__ webpack.config.js       
      |__ package.json
      |__ ...
  ```

9. 浏览器直接打开 `web/dist/index.html` 即可看到结果。
