import InvoiceList from "@/components/list/invoice/InvoiceList";
import { Button, Text, View } from "react-native";

export default function InvoiceHome() {
  return (
    <>
      {/* <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Bast Home!</Text>
        <Button
          title="Bast Create"
          onPress={() => {
            router.push("/bast/bast_create");
          }}
        />
      </View> */}
      {/* <ApproveButton /> */}

      {/* <BastList /> */}
      {/* <Text>Invoice Home</Text> */}
      <InvoiceList />
    </>
  );
}
