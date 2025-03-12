import BastDetail from "@/components/detail/BastDetail";
import BastDetailNew from "@/components/detail/BastDetailNew";
import TopBarLayout from "@/components/layout/TopBarLayout";
import { Text, View, ScrollView, StyleSheet } from "react-native";

export default function Detail() {
  return (
    <TopBarLayout>
      <ScrollView
        style={{
          // flex: 1,
          // justifyContent: "flex-start",
          // alignItems: "center",
          backgroundColor: "#eee",
          padding: 0,
          margin: 0,
        }}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        {/* <Text>Bast Detail</Text> */}
        {/* <Detail logoTitle={logoTitle} /> */}
        {/* <BastDetail /> */}
        <BastDetailNew />
      </ScrollView>
    </TopBarLayout>

  )
}
