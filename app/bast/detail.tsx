import BastDetail from "@/components/detail/BastDetail";
import BastDetailNew from "@/components/detail/bast/BastDetailNew";
import TopBarLayout from "@/components/layout/TopBarLayout";
import { Text, View, ScrollView, StyleSheet } from "react-native";

export default function Detail() {
  return (
    <TopBarLayout>
      {/* <Text>Bast Detail</Text> */}
      {/* <Detail logoTitle={logoTitle} /> */}
      {/* <BastDetail /> */}
      <BastDetailNew />
    </TopBarLayout>

  )
}
