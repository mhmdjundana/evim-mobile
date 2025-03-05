import { InputSelect, InputText } from '@/components/form/input';
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import RNPickerSelect from 'react-native-picker-select'; // Make sure you have this library installed

const { width } = Dimensions.get('window');

const FilterBast = () => {
  const [migoSes, setMigoSes] = useState('');
  const [supplierName, setSupplierName] = useState('');
  const [currency, setCurrency] = useState('');
  const [amount, setAmount] = useState('');
  const [department, setDepartment] = useState('');
  const [status, setStatus] = useState('');

  const statusOptions = [ // Define your status options
    { label: 'All', value: '' },
    { label: "Create SES", value: "Create SES" },
    {
      label: "Approve",
      value: "Approve",
    },
    {
      label: "1st Approve",
      value: "1st Approve",
    },
    {
      label: "Review",
      value: "Review",
    },
    {
      label: "2nd Approve",
      value: "2nd Approve",
    },
    { label: "Completed", value: "Completed" },
    { label: "Rejected", value: "Rejected" },
    { label: "Rejected > 30 days", value: "Rejected > 30 days" },
    // Add more status options as needed
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Filter & Sort</Text>
      </View>

      <InputText
        label="MIGO / SES"
        placeholder="MIGO / SES"
        value={migoSes}
        onChangeText={(value: any) => setMigoSes(value)}
        style={{ marginBottom: 10 }}
      />
      <InputText
        label="Supplier Name"
        placeholder="Supplier Name"
        value={supplierName}
        onChangeText={setSupplierName}
        style={{ marginBottom: 10 }}
      />
      <InputText
        label="Currency"
        placeholder="Currency"
        value={currency}
        onChangeText={setCurrency}
        style={{ marginBottom: 10 }}
      />
      <InputText
        label="Amount"
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric" // For numeric input
        style={{ marginBottom: 10 }}
      />
      <InputText
        label="Department"
        placeholder="Department"
        value={department}
        onChangeText={setDepartment}
        style={{ marginBottom: 10 }}
      />


      <Text style={{ fontSize: 16, fontWeight: '500' }}>Status</Text>
      <View style={styles.pickerContainer}>
        <RNPickerSelect
          placeholder={{ label: 'Select a Status', value: null }}
          items={statusOptions}
          onValueChange={value => setStatus(value)}
          value={status}
          style={{
            inputIOS: styles.pickerInput,
            inputAndroid: styles.pickerInput,
            placeholder: styles.pickerPlaceholder,
          }}
        />
      </View>
      {/* <InputSelect
        label="Status"
        placeholder="Select Status"
        onValueChange={(value: any) => setStatus(value)}
        value={status}
        style={{ marginBottom: 10 }}
      /> */}

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Apply</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff', // Example background color
    width: width,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    width: 30,
    height: 30,
    backgroundColor: 'gray', // Replace with your icon styling
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    // lineHeight: 22,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5, // Add rounded corners
  },
  pickerContainer: { // Style the picker container
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  pickerInput: {
    height: 40,
    paddingHorizontal: 10,
    color: 'black', // Text color for the selected value
  },
  pickerPlaceholder: {
    color: 'gray', // Placeholder text color
  },
  button: {
    backgroundColor: '#007E7A', // Example button color
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default FilterBast;