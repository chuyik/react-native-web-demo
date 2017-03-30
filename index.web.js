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