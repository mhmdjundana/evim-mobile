import * as React from 'react';
import { TextInput } from 'react-native-paper';

export const PaperTextInput = ({ label = "Input Label", value = "", onChangeText = () => {}, disabled = false, mode = "flat" }: any,) => {
  // const [text, setText] = React.useState("");
  return (
    <TextInput
      label={label}
      value={value}
      // mode="outlined"
      mode={mode}
      onChangeText={onChangeText}
      disabled={disabled}
    />
  );
}