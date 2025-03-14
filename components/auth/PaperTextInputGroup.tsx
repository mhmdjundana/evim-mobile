import { Dimensions, View } from "react-native";
import {
  configureFonts,
  HelperText,
  List,
  MD2Colors,
  MD3Colors,
  TextInput as PaperTextInput,
  Text as PaperText,
  Button,
  Checkbox,
  TouchableRipple,
  Card,
  Icon,
} from "react-native-paper";

const { width, height } = Dimensions.get("window");

const PaperTextInputGroup = ({
  title,
  value,
  onChangeText,
  isPassword,
  showPassword,
  setShowPassword,
  error,
  touched,
}: any) => {
  return (
    <View
      style={
        {
          // backgroundColor: 'red'
          position: 'relative'
        }
      }
    >
      {/* <PaperText variant="titleMedium">{title}</PaperText> */}
      <PaperTextInput
        mode="outlined"
        style={{
          margin: 0,
          // marginBottom: 10,
          width: width - 16 * 6,
        }}
        dense
        placeholder={title}
        value={value}
        secureTextEntry={isPassword && !showPassword}
        onChangeText={onChangeText}
        right={
          isPassword &&
          (showPassword ? (
            <PaperTextInput.Icon
              icon="eye"
              onPress={() => setShowPassword(!showPassword)}
            />
          ) : (
            <PaperTextInput.Icon
              icon="eye-off"
              onPress={() => setShowPassword(!showPassword)}
            />
          ))
        }
        error={touched && error}
      />
      {error && <HelperText
        type="error"
        visible={touched && error}
        style={{
          // position: 'absolute',
          // top: 40
          margin: 0
        }}
      >
        {error}
      </HelperText>}
    </View>
  );
};

export {
  PaperTextInputGroup
}