import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const TestForm = () => {
  const [text, setText] = useState('');

  const handleInputChange = (text: any) => {
    setText(text);
  };

  const handleButtonPress = () => {
    alert('You pressed the button!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Label:</Text>
      <TextInput
        style={styles.input}
        onChangeText={handleInputChange}
        value={text}
        placeholder="Enter text here"
      />
      <Button
        title="Press Me"
        onPress={handleButtonPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    // backgroundColor: 'yellow',
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});

export default TestForm;