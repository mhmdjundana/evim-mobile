import { ScrollView } from "react-native";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const vendors = [
  {
    name: "PT Humana Solusindo",
    bastNo: "00001",
    poNo: "2387192035",
    dpp: "Rp 156.391.000,-",
  },
  {
    name: "PT Humana Solusindo",
    bastNo: "00002",
    poNo: "1627834678",
    dpp: "Rp 50.000.000,-",
  },
];

const App = () => {
  return (
    <ScrollView>
      {vendors.map((vendor, index) => (
        <VendorCard key={index} vendor={vendor} />
      ))}
    </ScrollView>
  );
};

const VendorCard = ({ vendor }: any) => {
  const [status, setStatus] = useState("Review");

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.label}>Vendor Name</Text>
        <Text style={styles.value}>: {vendor.name}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>BAST No.</Text>
        <Text style={styles.value}>: {vendor.bastNo}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>PO No.</Text>
        <Text style={styles.value}>: {vendor.poNo}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>DPP</Text>
        <Text style={styles.value}>: {vendor.dpp}</Text>
      </View>
      <View style={styles.statusContainer}>
        <TouchableOpacity style={[styles.statusButton, status === "Review" ? styles.review : styles.approved]}>
          <Text style={styles.statusText}>{status}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.approveButton} onPress={() => setStatus("1st Approve")}>
          <Text style={styles.buttonText}>Approve</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.rejectButton} onPress={() => setStatus("Rejected")}>
          <Text style={styles.buttonText}>Reject</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1A1E28",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    width: "90%",
    alignSelf: "center",
  },
  row: {
    flexDirection: "row",
    marginBottom: 5,
  },
  label: {
    color: "#FFFFFF",
    fontWeight: "bold",
    width: 100,
  },
  value: {
    color: "#FFFFFF",
  },
  statusContainer: {
    alignItems: "center",
    marginVertical: 10,
  },
  statusButton: {
    padding: 8,
    borderRadius: 5,
    minWidth: 100,
    alignItems: "center",
  },
  review: {
    backgroundColor: "#2196F3",
  },
  approved: {
    backgroundColor: "#4CAF50",
  },
  statusText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  approveButton: {
    backgroundColor: "#4CAF50",
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
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});

export default App;