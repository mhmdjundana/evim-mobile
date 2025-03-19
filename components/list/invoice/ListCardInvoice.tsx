import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { router, usePathname } from "expo-router";
import { handleApproveButton, handleRejectButton } from "../bast/utils";
import { Checkbox } from "react-native-paper";
import { displayPrice } from "@/utils/utils";
import StatusListCard from "../StatusListCard";
import ApprovalActionListCard from "../ApprovalActionListCard";

const ListCardInvoice = ({
  data,
  listData,
  rowSelection,
  handleCheck = () => { }
}: any) => {
  // console.log(data, 'listcardInvoice data')
  const pathname = usePathname();

  return (
    <TouchableOpacity
      style={styles.row}
      onPress={() => {
        router.push({ pathname: `/invoice/detail`, params: { id: data.id } })
      }}
    >
      <View style={styles.card}>
        {
          (data.action?.is_approve || data.action?.is_reject) &&
          <View style={{
            position: 'absolute',
            right: 0
          }}>
            <Checkbox
              status={rowSelection?.includes(data.id) ? 'checked' : 'unchecked'}
              onPress={() => handleCheck(data?.id)}
            />
          </View>
        }
        <View style={styles.row}>
          <Text style={styles.label}>Vendor Name</Text>
          <Text style={styles.colon}>:</Text>
          <Text style={styles.value}> {data.suplier_name}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Invoice No.</Text>
          <Text style={styles.colon}>:</Text>
          <Text style={styles.value}> {data.invoice_number}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>PO No.</Text>
          <Text style={styles.colon}>:</Text>
          <Text style={styles.value}> {data.po_no}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>DPP</Text>
          <Text style={styles.colon}>:</Text>
          <Text style={styles.value}> {displayPrice(data.grand_total)}</Text>
        </View>
        <StatusListCard data={data} />
        <ApprovalActionListCard
          data={data}
          listData={listData}
          rowSelection={rowSelection}
          pathname={pathname}
          handleApproveButton={handleApproveButton}
          handleRejectButton={handleRejectButton}
          module="invoice"
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    position: 'relative',
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

export default ListCardInvoice;