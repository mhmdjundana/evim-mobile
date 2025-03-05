import { ScrollView } from "react-native";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import FilterBar from "../filter/FilterBar";

const vendors = [
  {
    suplier_name: "PT Humana Solusindo",
    bast_no: "00001",
    po_no: "2387192035",
    grand_total: "Rp 156.391.000,-",
  },
  {
    suplier_name: "PT Humana Solusindo",
    bast_no: "00002",
    po_no: "1627834678",
    grand_total: "Rp 50.000.000,-",
  },
];

const BastListUi = ({data}: any) => {
  // console.log(data, "data")
  return (
    <>
      <FilterBar moduleName="BAST" />
      <ScrollView style={{
        padding: 15,
        width: "100%"
      }}>
        {data.map((i: any, index: any) => (
          <VendorCard key={index} data={i} />
        ))}
      </ScrollView>
    </>
  );
};

const VendorCard = ({ data }: any) => {
  const [status, setStatus] = useState("Review");

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.label}>Vendor Name</Text>
        <Text style={styles.colon}>:</Text>
        <Text style={styles.value}> {data.suplier_name}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>BAST No.</Text>
        <Text style={styles.colon}>:</Text>
        <Text style={styles.value}> {data.bast_no}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>PO No.</Text>
        <Text style={styles.colon}>:</Text>
        <Text style={styles.value}> {data.po_no}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>DPP</Text>
        <Text style={styles.colon}>:</Text>
        <Text style={styles.value}> {data.grand_total}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Status</Text>
        <Text style={styles.colon}>:</Text>
        <Text style={styles.value}> </Text>
        <View style={styles.statusContainer}>
          <TouchableOpacity style={[styles.statusButton, status === "Review" ? styles.review : styles.approved]}>
            <Text style={styles.statusText}>{status}</Text>
          </TouchableOpacity>
        </View>
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
    borderRadius: 10,
    width: "100%",
    alignSelf: "center",
    backgroundColor: "#F8F9FE", // White background
    padding: 16, // Padding inside the card
    marginBottom: 16, // Margin between cards
    elevation: 1, // For Android shadow
    shadowColor: "#000", // For iOS shadow
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    alignItems: "flex-start", // Vertically center items
  },
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
  },
  statusButton: {
    padding: 8,
    borderRadius: 12,
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
    fontWeight: "700",
    fontSize: 14,
  },
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
});

export default BastListUi;