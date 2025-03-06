import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function FilterBar(props: any) {
  const {
    moduleName
  } = props
  return (
    <View style={{
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 15,
      width: "100%"
    }}>
      <TouchableOpacity>
        <Text>{true ? "Select All" : "Unselect All"}</Text>
      </TouchableOpacity>

      <Text>{true ? 0 : 1} Item Selected</Text>
      <TouchableOpacity
        onPress={() => {
          router.push({ pathname: `/filter`, params: { module: 'bast' } })
        }}
        style={{ flexDirection: "row", alignItems: "center" }}>
        <FontAwesome name="search" size={20} color="gray" />
        <Text>{moduleName}</Text>
      </TouchableOpacity>
    </View>
  )
}