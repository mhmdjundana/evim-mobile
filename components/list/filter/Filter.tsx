import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Or your preferred icon library
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

const FilterButton = ({ onPress = () => {}, module = "bast" }: any) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.filterButton} onPress={() => {
        router.push({ pathname: `/filter`, params: { module: module } })
      }}>
        <View style={styles.buttonContent}>
          <Ionicons name="filter" size={18} color="gray" style={styles.icon} />
          <Text style={styles.filterText}>Filter</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EBEBEB",
    width: width,
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  filterButton: {
    backgroundColor: 'white', // Or match your desired background
    borderRadius: 8, // Adjust as needed
    paddingVertical: 8, // Adjust padding as needed
    paddingHorizontal: 12, // Adjust padding as needed
    elevation: 2, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    width: 100,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center', // Vertically center icon and text
    justifyContent: 'flex-end',
  },
  icon: {
    marginRight: 8, // Space between icon and text
  },
  filterText: {
    color: 'gray', // Match the text color from the image
    fontSize: 16,  // Adjust font size as needed
  },
});

export default FilterButton;