import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { InputSelect, InputText } from '@/components/form/input';

const { width } = Dimensions.get('window');

const FilterSpecialPayment = () => {
  const [postingDate, setPostingDate] = useState('');
  const [docNo, setDocNo] = useState('');
  const [description, setDescription] = useState('');
  const [currency, setCurrency] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [vendorName, setVendorName] = useState('');
  const [mineralOrGeothermal, setMineralOrGeothermal] = useState('');
  const [department, setDepartment] = useState('');
  const [status, setStatus] = useState('');

  const mineralOrGeothermalOptions = [
    { label: 'Mineral', value: 'Mineral' },
    { label: 'Geothermal', value: 'Geothermal' },
  ];

  const statusOptions = [
    { label: 'Open', value: 'Open' },
    { label: 'Closed', value: 'Closed' },
  ];

  const currencyOptions = [
    { label: 'USD', value: 'USD' },
    { label: 'IDR', value: 'IDR' },
    // Add more currency options as needed
  ];

  const formData = [
    {
      label: 'Posting Date',
      placeholder: 'Posting Date',
      value: postingDate,
      onChangeText: setPostingDate,
      type: "text",
    },
    {
      label: 'Doc No',
      placeholder: 'Doc No',
      value: docNo,
      onChangeText: setDocNo,
      type: "text",
    },
    {
      label: 'Description',
      placeholder: 'Description',
      value: description,
      onChangeText: setDescription,
      type: "text",
    },
    {
      label: 'Currency',
      placeholder: 'Currency',
      value: currency,
      onChangeText: setCurrency,
      type: "text",
    },
    {
      label: 'Payment Amount',
      placeholder: 'Payment Amount',
      value: paymentAmount,
      onChangeText: setPaymentAmount,
      type: "text",
    },
    {
      label: 'Vendor Name',
      placeholder: 'Vendor Name',
      value: vendorName,
      onChangeText: setVendorName,
      type: "text",
    },
    {
      label: 'Mineral Or Geothermal',
      placeholder: { label: 'Mineral Or Geothermal', value: null },
      value: mineralOrGeothermal,
      onValueChange: setMineralOrGeothermal,
      type: "select",
      options: mineralOrGeothermalOptions,
    },
    {
      label: 'Department',
      placeholder: 'Department',
      value: department,
      onChangeText: setDepartment,
      type: "text",
    },
    {
      label: 'Status',
      placeholder: { label: 'Status', value: null },
      value: status,
      onValueChange: setStatus,
      type: "select",
      options: statusOptions,
    },
  ]
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Filter & Sort</Text>
      </View>

      <InputText
        label="Posting Date"
        placeholder="Posting Date"
        value={postingDate}
        onChangeText={setPostingDate}
        style={styles.input}
      />
      <InputText
        label="Doc No"
        placeholder="Doc No"
        value={docNo}
        onChangeText={setDocNo}
        style={styles.input}
      />
      <InputText
        label="Description"
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      <InputText
        label="Currency"
        placeholder="Currency"
        value={currency}
        onChangeText={setCurrency}
        style={styles.input}
      />

      <InputText
        label="Payment Amount"
        placeholder="Payment Amount"
        value={paymentAmount}
        onChangeText={setPaymentAmount}
        style={styles.input}
      />
      <InputText
        label="Vendor Name"
        placeholder="Vendor Name"
        value={vendorName}
        onChangeText={setVendorName}
        style={styles.input}
      />

      <Text style={{ fontSize: 16, fontWeight: '500' }}>Mineral Or Geothermal</Text>
      <View style={styles.pickerContainer}>
        <RNPickerSelect
          placeholder={{ label: 'Mineral Or Geothermal', value: null }}
          items={mineralOrGeothermalOptions}
          onValueChange={setMineralOrGeothermal}
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
        style={styles.input}
      />

      <Text style={{ fontSize: 16, fontWeight: '500' }}>Status</Text>
      <View style={styles.pickerContainer}>
        <RNPickerSelect
          placeholder={{ label: 'Status', value: null }}
          items={statusOptions}
          onValueChange={setStatus}
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
    backgroundColor: '#fff',
    width: width,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333', // Darker label color
  },
  input: {
    height: 40,
    borderColor: '#ccc', // Lighter border color
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    color: '#333', // Darker text color
    marginBottom: 10,
  },

  pickerContainer: {
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  pickerInput: {
    height: 40,
    paddingHorizontal: 10,
    color: '#333',
  },
  pickerPlaceholder: {
    color: '#999',
  },
  button: {
    backgroundColor: '#007E7A',
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

export default FilterSpecialPayment;