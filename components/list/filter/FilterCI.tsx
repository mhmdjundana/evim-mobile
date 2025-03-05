import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { InputSelect, InputText } from '@/components/form/input';

const { width } = Dimensions.get('window');

const FilterCI = () => {
  const [postingDate, setPostingDate] = useState('');
  const [docNo, setDocNo] = useState('');
  const [classification, setClassification] = useState('');
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
      label: 'Classification',
      placeholder: 'Classification',
      value: classification,
      onChangeText: setClassification,
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

      {
        formData.map((el: any, idx: any) => {
          if (el.type === "select") {
            return (
              <View key={idx}>
                <Text style={{ fontSize: 16, fontWeight: '500' }}>{el.label}</Text>
                <View style={styles.pickerContainer}>
                  <RNPickerSelect
                    placeholder={el.placeholder}
                    items={el.options}
                    onValueChange={el.onValueChange}
                    value={el.value}
                    style={{
                      inputIOS: styles.pickerInput,
                      inputAndroid: styles.pickerInput,
                      placeholder: styles.pickerPlaceholder,
                    }}
                  />
                </View>
              </View>
            )
          } else {
            return (
              <InputText
                key={idx}
                label={el.label}
                placeholder={el.placeholder}
                value={el.value}
                onChangeText={el.onChangeText}
                style={styles.input}
              />
            )
          }
        })
      }

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

export default FilterCI;