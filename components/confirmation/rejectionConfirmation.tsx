import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { ActionButton } from '../button/ActionButton';
import { router } from 'expo-router';
import api from '@/fetch/axios';

const RejectionConfirmation = ({ data, module }: any) => {
  // console.log(data[0], "Apporval data");
  // console.log(module, "Apporval module");
  const [reason, setReason] = useState('');

  const handleYesPress = () => {

    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rejection Confirmation</Text>
      <Text style={styles.subtitle}>Please add your rejection reason.</Text>

      <TextInput
        style={styles.textInput}
        placeholder="Reason..."
        placeholderTextColor="#8E8E93"
        multiline={true}
        textAlignVertical="top"
        value={reason}
        onChangeText={setReason}
      />

      <Text style={styles.requiredText}>*Required</Text>

      <View style={styles.buttonContainer}>
        <ActionButton type="yes" onPress={() => {
          const bastRejection = async () => {
            data[0].reason = reason;
            // console.log(JSON.stringify(data));
            try {
              const response = await api.post('bast/approval', data);
              console.log('response rejecting: ', response);
              if (response.data?.success) {
                router.back();
              }
            } catch (error) {
              console.error('Error rejecting bast:', error);
            }
          }
          bastRejection();
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

export default RejectionConfirmation;