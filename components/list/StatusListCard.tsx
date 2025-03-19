import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function StatusListCard({
  data,
}: any) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>Status</Text>
      <Text style={styles.colon}>:</Text>
      <Text style={styles.value}> </Text>
      <View style={styles.statusContainer}>
        <View
          style={[styles.statusButton, {
            backgroundColor: data.approval_status?.status_color ? data.approval_status?.status_color : "#c5c5c5"
          }]}>
          <Text style={styles.statusText}>{data.approval_status?.status_name}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginBottom: 5,
  },
  label: {
    color: "#494A50",
    width: 105,
    fontWeight: "800",
    fontSize: 16
  },
  colon: {
    color: "#494A50",
    fontWeight: "800",
    fontSize: 16
  },
  value: {
    color: "#494A50",
    fontSize: 16
  },
  statusContainer: {
    alignItems: "center",
    marginVertical: 5,
    marginLeft: 10
  },
  statusButton: {
    padding: 8,
    borderRadius: 25,
    minWidth: 100,
    alignItems: "center",
  },
  statusText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 14,
  },
})