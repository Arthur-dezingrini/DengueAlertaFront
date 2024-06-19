import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import ResponsiveComponent from './ResponsiveComponent';

const CustomButton = ({ title, onPress, style, textStyle }) => {
  return (
    <TouchableOpacity style={[style, styles.button]} onPress={onPress}>
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#fff',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12
  },
  buttonText: {
    fontWeight: 590,
    color: '#515151',
    fontSize: 18,
  },  
});

export default CustomButton;