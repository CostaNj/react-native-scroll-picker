import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';

import {ScrollPicker} from './src/components'

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ScrollPicker/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
