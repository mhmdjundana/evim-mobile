import InvoiceList from "@/components/list/invoice/InvoiceList";
import { Button, Text, View } from "react-native";

export default function InvoiceHome() {
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
      <InvoiceList />
    </View>
  );
}
