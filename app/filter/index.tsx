import FilterBast from "@/components/list/filter/FilterBast";
import FilterCC from "@/components/list/filter/FilterCC";
import FilterCI from "@/components/list/filter/FilterCI";
import FilterInvoice from "@/components/list/filter/FilterInvoice";
import FilterPCard from "@/components/list/filter/FilterPCard";
import FilterSpecialPayment from "@/components/list/filter/FilterSpecialPayment";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, Text, View, StyleSheet } from "react-native";

export default function Filter() {
  const { module } = useLocalSearchParams();
  console.log(module, "module");

  return (
    <ScrollView contentContainerStyle={styles.contentContainer} style={styles.container}>
      {/* <Text>Filter {module}</Text> */}
      {
        module == "bast" ? (
          <FilterBast />
        ) 
        : module == "invoice" ? (
          <FilterInvoice />
        ) 
        : module == "special_payment" ? (
          <FilterSpecialPayment />
        ) 
        : module == "cc" ? (
          <FilterCC />
        ) 
        : module === "ci" ? (
          <FilterCI />
        ) 
        : module === "p_card" ? (
          <FilterPCard />
        ) : (
          <></>
        )
      }
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,  // flex: 1 is still important for the ScrollView itself
    backgroundColor: "#fff",
    padding: 0,
    margin: 0,
  },
  contentContainer: { // New style for the content container
    flexGrow: 1, // Important: allows content to grow
    justifyContent: "center", // Now apply justifyContent here
    alignItems: "center",     // And alignItems here
  },
});