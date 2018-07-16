import React from 'react';
import { Text, View, TextInput } from 'react-native';

const Input = (props) => {
  const { label, value, onChangeText, placeholder, secureTextEntry } = props;
  const { inputStyle, labelStyle, containerStyle } = styles;

  return (
    <View style={containerStyle}>
      <Text style={labelStyle}>{ label }</Text>
      <TextInput
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        autoCorrect={false}
        value={value}
        onChangeText={onChangeText}
        style={inputStyle}
      />
    </View>
  );
};

const styles = {
  inputStyle: {
    flex: 2,
    color: '#333',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23
  },
  labelStyle: {
    fontSize: 18,
    paddingLeft: 20,
    flex: 1
  },
  containerStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
};

export { Input };
