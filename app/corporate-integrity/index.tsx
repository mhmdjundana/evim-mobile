// import ApproveButton from "@/components/button/ActionButton";
import { ScrollView, Text, View } from "react-native";

export default function Home() {

  return (
    <ScrollView
      style={{
        backgroundColor: "white",
        padding: 0,
        margin: 0,
      }}
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>CI Home</Text>
    </ScrollView>
  );
}
