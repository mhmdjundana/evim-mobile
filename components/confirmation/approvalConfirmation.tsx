import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { ActionButton } from '../button/ActionButton';
import { router } from 'expo-router';
import api from '@/fetch/axios';

const ApprovalConfirmation = ({ data, module }: any) => {
  console.log(data[0], "Apporval data");
  console.log(module, "Apporval module");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Approval Confirmation</Text>
      <Text style={styles.subtitle}>Are you sure you want to approve?</Text>

      <View style={styles.buttonContainer}>
        <ActionButton type="yes" onPress={() => {
          const bastApproval = async () => {
            try {
              const response = await api.post('bast/approval', data);
              console.log('response approval', response);
              if (response.data?.success) {
                router.back();
              }
            } catch (error) {
              console.error('Error approving bast:', error);
            }
          }
          bastApproval();
        }} />
        <ActionButton type="no" onPress={() => {
          router.back();
        }} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#F2F2F7',
    padding: 10,
    width: '100%',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
    alignSelf: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    color: '#000',
    alignSelf: 'center',
  },
  textInput: {
    height: 120,
    padding: 10,
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 10,
    fontSize: 16,
  },
  requiredText: {
    fontSize: 14,
    color: 'red',
    marginBottom: 20,
    alignSelf: 'flex-end',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
    minWidth: 100,
  },
  yesButton: {
    backgroundColor: '#007AFF',
  },
  noButton: {
    backgroundColor: '#E5E7EB',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ApprovalConfirmation;