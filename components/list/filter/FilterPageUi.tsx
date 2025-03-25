import { InputSelect, InputText } from '@/components/form/input';
import { FontAwesome6 } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Dimensions, KeyboardAvoidingView, Platform } from 'react-native';

const { width } = Dimensions.get('window');

const FilterPageUi = ({
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
      <View
        style={{
          width: "100%",
          paddingHorizontal: 10,
          // justifyContent: "flex-end",
          alignItems: "flex-end",
        }}
      >
        <TouchableOpacity
          onPress={() => setIsRenderFilter(false)}
        >
          <FontAwesome6
            name="xmark"
            size={45}
            color="#757575"
            weight="bold"
          />
        </TouchableOpacity>
      </View>
      {/* <TouchableOpacity style={styles.header} onPress={() => setIsRenderFilter(false)}>
        <Text style={styles.title}>Back</Text>
      </TouchableOpacity> */}
      <View style={styles.header}>
        <Text style={styles.title}>Filter & Sort</Text>
      </View>

      {columnFilters?.map((input: any, index: number) => {
        if (input.id === 'status_name') return (
          <InputSelect
            key={index}
            index={index}
            label={input.label}
            placeholder={input.placeholder}
            onValueChange={(value: any) => {
              console.log(value, 'value')
              let v = value
              if (value === 'All') {
                v = ''
              }
              const updatedState = [...columnFilters];
              updatedState[index].value = v;
              setColumnFilters(updatedState);
            }}
            value={input.value}
            style={{ marginBottom: 10 }}
            options={statusOptions}
          />
        )
        return (
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
        )
      })}

      <TouchableOpacity
        style={styles.buttonReset}
        onPress={() => {
          setColumnFilters((prev: any) => prev.map((item: any) => ({ ...item, value: "" })));
          // setIsRenderFilter(false)
        }}
      >
        <Text style={styles.buttonText}>Reset</Text>
      </TouchableOpacity>
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
  buttonReset: {
    backgroundColor: '#999', // Example button color
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

export default FilterPageUi;