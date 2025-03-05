import { Text, TextInput, View, TouchableOpacity, StyleSheet } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { InputFile, InputSelect, InputText } from "./input";
import { PaperTextInput } from "./InputPaper";
import { FileUploadComponent } from "./inputFile";

export default function FormDemo() {
  return (
    <>
      <View style={styles.container}>
        {/* <InputText label="Input Label" placeholder="Input Placeholder" />
        <InputText label="Disabled Input" placeholder="Input Placeholder" disabled /> */}

        {/* <PaperTextInput />
        <PaperTextInput disabled />
        <PaperTextInput disabled value="Disabled Value" />
        <PaperTextInput mode="outlined" />
        <PaperTextInput mode="outlined" disabled />
        <PaperTextInput mode="outlined" disabled value="Disabled Value" /> */}

        {/* <FileUploadComponent /> */}
        <InputText label="Input Label" placeholder="Input Placeholder" />
        <InputSelect />
        {/* <InputFile /> */}
        
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    width: '100%',
    // backgroundColor: 'yellow',
    flex: 1,
  },
});