import { FontAwesome } from "@expo/vector-icons";
import { Text, View } from "react-native";

export default function FilterBar(props: any) {
  const {
    moduleName
  }  = props
  return (
    <View style={{
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 15,
      width: "100%"
    }}>
      <Text>{true ? "Select All" : "Unselect All"}</Text>
      <Text>{true ? 0 : 1} Item Selected</Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <FontAwesome name="search" size={20} color="gray" />
        <Text>{moduleName}</Text>
      </View>
    </View>
  )
}