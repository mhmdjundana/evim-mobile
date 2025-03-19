import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";


export default function ApprovalActionListCard({
  data,
  listData,
  rowSelection,
  pathname,
  handleApproveButton,
  handleRejectButton,
  module,
}: any) {
  return (
    <View style={styles.buttonContainer}>
      {data.action?.is_approve && (
        <TouchableOpacity
          style={styles.approveButton}
          onPress={() => handleApproveButton({
            item: data,
            router: router,
            listData: listData,
            rowSelection: rowSelection,
            onSuccessNavigateTo: JSON.stringify({ pathname }),
            module
          })}>
          <Text style={styles.buttonText}>Approve</Text>
        </TouchableOpacity>
      )}
      {data.action?.is_reject && (
        <TouchableOpacity
          style={styles.rejectButton}
          onPress={() => handleRejectButton({
            item: data,
            router: router,
            listData: listData,
            rowSelection: rowSelection,
            onSuccessNavigateTo: JSON.stringify({ pathname }),
            module,
          })}>
          <Text style={styles.buttonText}>Reject</Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  approveButton: {
    backgroundColor: "#007E7A",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
    alignItems: "center",
  },
  rejectButton: {
    backgroundColor: "#E53935",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#EAF2FF",
    fontWeight: "700",
    fontSize: 14,
  },
})