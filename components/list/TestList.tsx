import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Or your preferred icon library
import FilterButton from './filter/Filter';
import HeaderTitle from './HeaderTitle';

const { width } = Dimensions.get('window');

const TestList = () => {
  const data = [
    { id: '1', docNo: '12/34/2020/AA/BB', createdDate: '9/07/2023' },
    { id: '2', docNo: '12/34/2020/AA/BB', createdDate: '9/07 to 2023' }, // Corrected date format
    { id: '3', docNo: '12/34/2020/AA/BB', createdDate: '9/07/2023' },
    { id: '4', docNo: '12/34/2020/AA/BB', createdDate: '9/07/2023' },
    { id: '5', docNo: '12/34/2020/AA/BB', createdDate: '9/07/2023' },
    { id: '6', docNo: '12/34/2020/AA/BB', createdDate: '9/07/2023' },
  ];

  const renderItem = ({ item }: any) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={() => { /* Handle action press */ }}>
        <View style={styles.actionButton}>
          <Ionicons name="checkmark-circle-outline" size={24} color="green" />
        </View>
      </TouchableOpacity>
      <Text style={styles.docNo}>{item.docNo}</Text>
      <Text style={styles.createdDate}>{item.createdDate}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <HeaderTitle title="List BAST" />
      <FilterButton />
      <View style={styles.tableHeader}>
        <Text style={styles.headerText}>Action</Text>
        <Text style={styles.headerText}>Doc No.</Text>
        <Text style={styles.headerText}>Created Date</Text>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Assuming white background
    // padding: 16,
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#007E7A',
    width: width,
    height: 44,
    padding: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white'
  },
  filterButton: {
    // Style for filter button if needed
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerText: {
    fontWeight: 'bold',
    flex: 1, // Distribute space evenly
    textAlign: 'center', // Center text in columns
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  actionButton: {
    marginRight: 16,
  },
  docNo: {
    flex: 1,
    textAlign: 'center',
  },
  createdDate: {
    flex: 1,
    textAlign: 'center',
  },
  list: {
    flex: 1, // Take up remaining space
  },
});

export default TestList;