import React from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const InvoiceSumForm = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>Subtotal</Text>
        <Text style={styles.label}>USD</Text>
        <Text style={styles.value}>10.000,00</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>VAT</Text>
        <Text style={styles.label}>USD</Text>
        <Text style={styles.value}>1.100,00</Text>
      </View>
      <View style={styles.inputContainer}>
        <Picker style={styles.picker}>
          <Picker.Item label="(VW) VAT Recoverable 11%" value="vat" />
        </Picker>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>WHT</Text>
        <Text style={styles.label}>USD</Text>
        <Text style={styles.value}>0</Text>
      </View>
      <View style={styles.inputContainer}>
        <Picker style={styles.picker}>
          <Picker.Item label="Select WHT" value="wht" />
        </Picker>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Base WHT</Text>
        <Text style={styles.value}>10.000,00</Text>
        <Text style={styles.value}>X</Text>
        <Text style={styles.value}>0%</Text>
        <Text style={styles.value}>0</Text>
      </View>
      <Text style={styles.sectionTitle}>Other Adjustment</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Item 1</Text>
        <Text style={styles.label}>USD</Text>
        <TextInput style={styles.input} value="50,00" />
      </View>
      <TextInput style={styles.input} placeholder="Input Description" />
      <View style={styles.inputContainer}>
        <Picker style={styles.picker}>
          <Picker.Item label="Select Debit/Credit" value="debitCredit" />
        </Picker>
      </View>
      <View style={styles.row}>
        <Picker style={styles.halfPicker}>
          <Picker.Item label="Select WHT" value="wht1" />
        </Picker>
        <Picker style={styles.halfPicker}>
          <Picker.Item label="Select WHT" value="wht2" />
        </Picker>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Item 2</Text>
        <Text style={styles.label}>USD</Text>
        <TextInput style={styles.input} value="10,00" />
      </View>
      <TextInput style={styles.input} placeholder="Input Description" />
      <View style={styles.inputContainer}>
        <Picker style={styles.picker}>
          <Picker.Item label="Select Debit/Credit" value="debitCredit" />
        </Picker>
      </View>
      <View style={styles.row}>
        <Picker style={styles.halfPicker}>
          <Picker.Item label="Select WHT" value="wht1" />
        </Picker>
        <Picker style={styles.halfPicker}>
          <Picker.Item label="Select WHT" value="wht2" />
        </Picker>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Net Payment</Text>
        <Text style={styles.label}>USD</Text>
        <Text style={styles.value}>11.160,00</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f7fafc',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  label: {
    fontWeight: '600',
  },
  value: {
    fontWeight: '400',
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    padding: 8,
  },
  halfPicker: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    padding: 8,
    marginRight: 8,
  },
  sectionTitle: {
    fontWeight: '600',
    marginBottom: 8,
  },
});

export default InvoiceSumForm;