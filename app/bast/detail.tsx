import BastDetail from "@/components/detail/BastDetail";
import BastDetailNew from "@/components/detail/BastDetailNew";
import { Text, View, ScrollView, StyleSheet } from "react-native";

export default function Detail() {
  const logoTitle = (
    <View style={styles.logoTitleContainer}>
      <Text style={styles.logoTitleText}>BERITA ACARA SERAH TERIMA</Text>
      <Text style={styles.logoTitleText}>GOODS / SERVICES RECEIPT NOTE</Text>
    </View>
  )
  return (
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
  )
}

const styles = StyleSheet.create({
    logoTitleContainer: { display: "flex", justifyContent: "center", alignItems: "center"},
    logoTitleText: { fontSize: 15, fontWeight: "500", textAlign: "center", color: "#404040" },
});
