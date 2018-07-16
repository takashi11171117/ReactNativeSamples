import React, { Component } from 'react';
import { View } from 'react-native';

class CardSection extends Component {
  render() {
    const { children } = this.props;

    return (
      <View style={styles.containerStyle}>
        { children }
      </View>
    );
  }
}

const styles = {
  containerStyle: {
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#ddd',
    position: 'relative'
  }
};

export { CardSection };
