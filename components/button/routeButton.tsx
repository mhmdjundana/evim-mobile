import { router } from "expo-router";
import { Button, Text, View } from "react-native";

const DemoRouteButton = () => {
  return (
    <View>
      <Button title="Go to Home" onPress={() => {
        router.push("/home");
      }} />
      <Button title="Bast" onPress={() => {
        router.push("/bast");
      }} />
      <Button title="Bast Detail" onPress={() => {
        router.push("/bast/detail");
      }} />
      <Button title="Invoice" onPress={() => {
        router.push("/invoice");
      }} />
      <Button title="InvoiceDetail" onPress={() => {
        router.push("/invoice/detail");
      }} />
      <Button title="Buttons" onPress={() => {
        router.push("/buttons");
      }} />
      <Button title="Invoice" onPress={() => {
        router.push("/invoice");
      }} />
      <Button title="InvoiceDetail" onPress={() => {
        router.push("/invoice/detail");
      }} />
    </View>
  );
}

export default DemoRouteButton