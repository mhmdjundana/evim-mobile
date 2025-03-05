import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import * as FileSystem from 'expo-file-system'; // If using Expo

const DocumentItem = ({ title, file }: any) => {

  const handlePress = async () => {
    if (file) {
      try {
        // For local files (if they exist in your assets or documents folder)
        // const fileInfo = await FileSystem.getInfoAsync(file);
        // if (fileInfo.exists) {
        //   await Linking.openURL(file);
        // } else {
        //   console.error('File does not exist:', file);
        //   // Handle file not found, e.g., display an alert
        // }

        // For remote URLs (assuming your .pdf files are accessible via URL)
        await Linking.openURL(file); 

      } catch (error) {
        console.error('Error opening file:', error);
        // Handle error, e.g., display an alert
      }
    } else {
      console.warn('No file specified for:', title);
    }
  };

  // Example: A simple document icon 
  // You can replace this with an actual icon component
  return (
    <TouchableOpacity style={styles.item} onPress={handlePress}>
      <View style={styles.icon}>
        <Text>📄</Text> 
      </View>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};


const BastDocFileDetail2 = () => {
  const documents = [
    { title: 'Timesheet', file: 'Timesheet.pdf' },
    { title: 'Proforma Invoice', file: 'Proforma Invoice.pdf' },
    { title: 'Delivery Order', file: 'Delivery Order.pdf' },
    { title: 'Summary Reimburse', file: 'Summary Reimburse.pdf' },
    { title: 'Bill of Lading', file: 'Bill of Lading.pdf' },
    { title: 'Airway Bill', file: 'Airway Bill.pdf' },
    { title: 'PBI', file: 'PB1.pdf' },
    { title: 'Purchase Order', file: 'Purchase Order.pdf' },
    { title: 'Confirmation File', file: 'Confirmation File.pdf' },
    { title: 'Good Receipt Note', file: 'Good Receipt Note.pdf' },
    { title: 'Progress Report (.xlsx)', file: 'Progress Report.xlsx' },
    { title: 'Other BAST Attachment', file: 'Other BAST.pdf' },
  ];

  const pairedDocuments = [];
  for (let i = 0; i < documents.length; i += 2) {
    pairedDocuments.push([documents[i], documents[i + 1]]);
  }

  return (
    <View style={styles.container}>
      {pairedDocuments.map((pair, index) => (
        <View key={index} style={styles.row}>
          {pair.map((doc, pairIndex) => (
            doc ? ( 
                <View key={pairIndex} style={styles.itemContainer}>
                    <DocumentItem title={doc.title} file={doc.file} />
                </View>
            ) : <View key={pairIndex} style={styles.itemContainer}></View>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  row: {  // Style for the row
    flexDirection: 'row',
    justifyContent: 'space-between', // Distribute items evenly
    marginBottom: 10, // Spacing between rows
  },
  itemContainer: { // Style for individual items within the row
    flex: 1, // Each item takes equal width
    padding: 5, // Add some padding around each item
  },
    icon: {
    marginRight: 10,
  },
  title: {
    fontSize: 16,
  },
  // ... (rest of the styles remain the same)
});

export default BastDocFileDetail2;