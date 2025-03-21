import List from "@/components/list/special-payment/List";
import { ScrollView, Text, View } from "react-native";

export default function Home() {

  return (
    <View
      style={{
        // flex: 1,
        // justifyContent: "flex-start",
        // alignItems: "center",
        backgroundColor: "white",
        padding: 0,
        margin: 0,
        // paddingTop: 30,
      }}
    >
      <List />
    </View>
  );
}
