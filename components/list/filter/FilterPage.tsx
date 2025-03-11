import { InputSelect, InputText } from '@/components/form/input';
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Dimensions, KeyboardAvoidingView, Platform } from 'react-native';

const { width } = Dimensions.get('window');

const FilterPage = ({ 
  listState = {}, 
  setIsRenderFilter, 
  setApplyFilter, 
  statusOptions = [] 
}: any) => {

  const { columnFilters, setColumnFilters } = listState
  console.log(columnFilters, 'columnFilters')
  const [status, setStatus] = useState('');

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableOpacity style={styles.header} onPress={() => setIsRenderFilter(false)}>
        <Text style={styles.title}>Back</Text>
      </TouchableOpacity>
      <View style={styles.header}>
        <Text style={styles.title}>Filter & Sort</Text>
      </View>

      {columnFilters?.map((input: any, index: number) => (
        <InputText
          key={index}
          index={index}
          label={input.label}
          placeholder={input.placeholder}
          value={input.value}
          onChangeText={(value: any) => {
            const updatedState = [...columnFilters];
            updatedState[index].value = value;
            setColumnFilters(updatedState);
          }}
          style={input.style}
        />
      ))}

      {/* <Text style={{ fontSize: 16, fontWeight: '500' }}>Status</Text> */}
      <InputSelect
        label="Status"
        placeholder="Select Status"
        onValueChange={(value: any) => setStatus(value)}
        value={status}
        style={{ marginBottom: 10 }}
        options={statusOptions}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setApplyFilter((prev: any) => prev + 1)
          setIsRenderFilter(false)
        }}
      >
        <Text style={styles.buttonText}>Apply</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
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

export default FilterPage;