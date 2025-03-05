import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import Icon from '@expo/vector-icons/MaterialIcons';

type ButtonType = 'approve' | 'reject' | 'submit' | 'editAdminAp' | 'test' | 'filter' | 'yes' | 'no';

interface ActionButtonProps {
  type: ButtonType;
  onPress: () => void; // Modified this line
}

export const ActionButton: React.FC<ActionButtonProps> = ({ type, onPress }: ActionButtonProps) => {
  // Button configurations
  const buttonConfig: any = {
    approve: {
      text: 'Approve',
      icon: 'check-circle',
      style: styles.approveButton,
    },
    reject: {
      text: 'Reject',
      icon: 'cancel',
      style: styles.rejectButton,
    },
    submit: {
      text: 'Submit',
      icon: 'send',
      style: styles.submitButton,
    },
    editAdminAp: {
      text: 'Edit as Admin AP',
      icon: null,
      style: styles.editAdminApButton,
    },
    filter: {
      text: 'Filter',
      icon: 'tune',
      style: styles.editAdminApButton,
    },
    yes: {
      text: 'Yes',
      icon: null,
      style: styles.yesButton,
    },
    no: {
      text: 'No',
      // icon: null,
      style: styles.noButton,
    },
    test: {
      text: 'Test',
      icon: null,
      style: styles.editAdminApButton,
    },
  };

  const { text, icon, style } = buttonConfig[type] || {};

  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      {icon && <Icon name={icon} size={20} color="#ffffff" />}
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  approveButton: {
    backgroundColor: '#007E7A', // Teal for approve
  },
  rejectButton: {
    backgroundColor: '#D32F2F', // Red for reject
  },
  yesButton: {
    backgroundColor: '#007E7A', // Teal for approve
  },
  noButton: {
    backgroundColor: '#6C757D', // Red for reject
  },
  submitButton: {
    backgroundColor: '#00897B', // Dark teal for submit
  },
  editAdminApButton: {
    backgroundColor: '#38A3A5', // Yellow for edit as admin
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    // marginLeft: 8, // Space between icon and text
  },
});

export const ButtonExample: React.FC = () => {
  return (
    <View style={stylesContainer.container}>
      <ActionButton type="approve" onPress={() => {}} />
      <ActionButton type="reject" onPress={() => {}} />
      <ActionButton type="submit" onPress={() => {}} />
      <ActionButton type="editAdminAp" onPress={() => {}} />
      <ActionButton type="filter" onPress={() => {}} />
      <ActionButton type="test" onPress={() => {}} />
    </View>
  );
};

const stylesContainer = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
