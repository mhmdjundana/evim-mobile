import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import { mockDataBastList2 } from '../bastMockData';

export default function ViewBastList() {
  const data = mockDataBastList2

  return (
    <>
      {
        data?.data?.data.map((item: any, index: number) => (
          <BastListCard key={index} item={item} />
        ))
      }
    </>
  )
}

const BastListCard = (props: any) => {
  const {
    suplier_name,
    bast_no,
    po_no,
    grand_total,
    approval_status,
    onApprove,
    onReject,
    isApproved
  } = props.item
  console.log(props, "props")
  const [internalStatus, setInternalStatus] = useState(approval_status); // For managing status changes within the component
  const [isSwitched, setIsSwitched] = useState(isApproved || false); // For the switch component state

  const handleApprove = () => {
    setInternalStatus('Approved');
    setIsSwitched(true);
    if (onApprove) onApprove();
  };

  const handleReject = () => {
    setInternalStatus('Rejected');
    setIsSwitched(false);
    if (onReject) onReject();
  };

  const handleSwitchToggle = (value: any) => {
    setIsSwitched(value);
    if (value) {
      handleApprove();
    } else {
      handleReject();
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.checkboxContainer}>
        <Switch
          value={isSwitched}
          onValueChange={handleSwitchToggle}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isSwitched ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
        />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.label}>Vendor Name : {suplier_name}</Text>
        <Text style={styles.label}>BAST No. : {bast_no}</Text>
        <Text style={styles.label}>PO No. : {po_no}</Text>
        <Text style={styles.label}>DPP : {grand_total}</Text>
        <Text style={[styles.status, { backgroundColor: approval_status?.status_color }]}>Status : {approval_status?.status_name}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.approveButton]} onPress={handleApprove}>
          <Text style={styles.buttonText}>Approve</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.rejectButton]} onPress={handleReject}>
          <Text style={styles.buttonText}>Reject</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF', // White background
    borderRadius: 8, // Rounded corners
    padding: 16, // Padding inside the card
    marginBottom: 16, // Margin between cards
    elevation: 3, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    flexDirection: 'row', // Arrange items horizontally
    alignItems: 'center' // Vertically center items
  },
  checkboxContainer: {
    marginRight: 16, // Space between checkbox and text
  },
  textContainer: {
    flex: 1, // Allow text container to take up available space
  },
  label: {
    fontSize: 14,
    marginBottom: 4, // Space between text labels
  },
  status: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF', // Blue color for status
  },
  buttonContainer: {
    flexDirection: 'row',
    marginLeft: 16, // Space between text and buttons
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    marginRight: 8, // Space between buttons
    alignItems: 'center',
  },
  approveButton: {
    backgroundColor: '#4CAF50', // Green for Approve
  },
  rejectButton: {
    backgroundColor: '#F44336', // Red for Reject
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
