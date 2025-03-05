import { InputSelect, InputText } from '@/components/form/input';
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import RNPickerSelect from 'react-native-picker-select'; // Make sure you have this library installed

const { width } = Dimensions.get('window');

const FilterInvoice = () => {
  const [invoiceNo, setInvoiceNo] = useState('');
  const [vendorName, setVendorName] = useState('');
  const [amount, setAmount] = useState('');
  const [invoiceDescription, setInvoiceDescription] = useState('');
  const [createDate, setCreateDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [invoiceDate, setInvoiceDate] = useState('');
  const [paidDate, setPaidDate] = useState('');
  const [wht, setWht] = useState('');
  const [netPayment, setNetPayment] = useState('');
  const [vendorType, setVendorType] = useState('');
  const [mineralOrGeothermal, setMineralOrGeothermal] = useState('');
  const [department, setDepartment] = useState('');
  const [status, setStatus] = useState('');

  const statusOptions = [ // Define your status options
    { label: 'All', value: '' },
    { label: 'Open', value: 'open' },
    { label: 'Closed', value: 'closed' },
    // Add more status options as needed
  ];
  const taxOptions = [ // Define your status options
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'No' },
    // Add more status options as needed
  ];
  const mineralOrGeothermalOptions = [ // Define your status options
    { label: 'Mineral', value: '1' },
    { label: 'Geothermal', value: '2' },
    // Add more status options as needed
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Filter & Sort</Text>
      </View>

      <Text style={{ fontSize: 16, fontWeight: '500' }}>Tax Slip</Text>
      <View style={styles.pickerContainer}>
        <RNPickerSelect
          placeholder={{ label: 'Select', value: null }}
          items={taxOptions}
          onValueChange={value => setStatus(value)}
          value={status}
          style={{
            inputIOS: styles.pickerInput,
            inputAndroid: styles.pickerInput,
            placeholder: styles.pickerPlaceholder,
          }}
        />
      </View>

      <InputText
        label="Invoice No"
        placeholder="Invoice No"
        value={invoiceNo}
        onChangeText={setInvoiceNo}
        style={{ marginBottom: 10 }}
      />
      <InputText
        label="Vendor Name"
        placeholder="Vendor Name"
        value={vendorName}
        onChangeText={setVendorName}
        style={{ marginBottom: 10 }}
      />
      <InputText
        label="Amount"
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
        style={{ marginBottom: 10 }}
      />
      <InputText
        label="Invoice Description"
        placeholder="Invoice Description"
        value={invoiceDescription}
        onChangeText={setInvoiceDescription}
        style={{ marginBottom: 10 }}
      />
      <InputText
        label="Create Date"
        placeholder="Create Date"
        value={createDate}
        onChangeText={setCreateDate}
        style={{ marginBottom: 10 }}
      />
      <InputText
        label="Invoice Date"
        placeholder="Invoice Date"
        value={invoiceDate}
        onChangeText={setInvoiceDate}
        style={{ marginBottom: 10 }}
      />
      <InputText
        label="Due Date"
        placeholder="Due Date"
        value={dueDate}
        onChangeText={setDueDate}
        style={{ marginBottom: 10 }}
      />
      <InputText
        label="Paid Date"
        placeholder="Paid Date"
        value={paidDate}
        onChangeText={setPaidDate}
        style={{ marginBottom: 10 }}
      />
      <InputText
        label="WHT"
        placeholder="WHT"
        value={wht}
        onChangeText={setWht}
        style={{ marginBottom: 10 }}
      />
      <InputText
        label="Net Payment"
        placeholder="Net Payment"
        value={netPayment}
        onChangeText={setNetPayment}
        style={{ marginBottom: 10 }}
      />
      <InputText
        label="Vendor Type"
        placeholder="Vendor Type"
        value={vendorType}
        onChangeText={setVendorType}
        style={{ marginBottom: 10 }}
      />
      <Text style={{ fontSize: 16, fontWeight: '500' }}>Mineral or Geothermal</Text>
      <View style={styles.pickerContainer}>
        <RNPickerSelect
          placeholder={{ label: 'Select', value: null }}
          items={mineralOrGeothermalOptions}
          onValueChange={value => setMineralOrGeothermal(value)}
          value={mineralOrGeothermal}
          style={{
            inputIOS: styles.pickerInput,
            inputAndroid: styles.pickerInput,
            placeholder: styles.pickerPlaceholder,
          }}
        />
      </View>
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

export default FilterInvoice;