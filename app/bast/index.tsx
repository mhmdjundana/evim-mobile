// import ApproveButton from "@/components/button/ActionButton";
import PaymentSummary from "@/components/detail/DocumentDetail";
import BastList from "@/components/list/bast/BastList";
import { router, useNavigation } from "expo-router";
import { useEffect } from "react";
import { ScrollView, Text, View } from "react-native";

export default function BastHome() {
  // const navigation = useNavigation();

  // useEffect(() => {
  //   navigation.setOptions({ headerShown: true });
  // }, [navigation]);

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
      // contentContainerStyle={{
      //   flexGrow: 1,
      //   justifyContent: "flex-start",
      //   alignItems: "center",
      // }}
    >
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
      {/* <Text>Bast Home</Text> */}
      <BastList />
    </View>
  );
}
