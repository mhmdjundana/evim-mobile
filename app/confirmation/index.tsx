import ApprovalConfirmation from "@/components/confirmation/approvalConfirmation";
import RejectionConfirmation from "@/components/confirmation/rejectionConfirmation";
import { useLocalSearchParams } from "expo-router";
import { Text, View, StyleSheet } from "react-native";

export default function Confirmation() {
  const { type, data = "{}", module } = useLocalSearchParams();
  // console.log(data, "Confirmation data");
  // console.log(module, "Confirmation module");
  // console.log(type, "Confirmation type");

  return (
    <>
      <View style={styles.container}>
        {
          type === "approval" ? (
            <ApprovalConfirmation data={JSON.parse(data as string)} module={module} />
          ) : type === "rejection" ? (
            <RejectionConfirmation data={JSON.parse(data as string)} module={module} />
          ) : (
            <Text></Text>
          )
        }
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})