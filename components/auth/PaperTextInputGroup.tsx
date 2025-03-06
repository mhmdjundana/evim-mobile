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
}: any) => {
  return (
    <View
      style={
        {
          // backgroundColor: 'red'
        }
      }
    >
      {/* <PaperText variant="titleMedium">{title}</PaperText> */}
      <PaperTextInput
        mode="outlined"
        style={{
          // margin: 8,
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
      />
    </View>
  );
};

export {
  PaperTextInputGroup
}