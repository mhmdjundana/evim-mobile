import React, { useState } from 'react';
import { View, Text, TextInput, ToastAndroid, StyleSheet, ScrollView, Alert } from 'react-native';
import { ActionButton } from '../button/ActionButton';
import { router } from 'expo-router';
import api from '@/fetch/axios';
import { Card } from 'react-native-paper';

const bastList = [
  {
    title: "BAST No.",
    name: "bast_no"
  },
  {
    title: "Contract No.",
    name: "contract_no"
  },
  {
    title: "PO No.",
    name: "po_no"
  },
]
const invoiceList = [
  {
    title: "Invoice No.",
    name: "invoice_number"
  },
  // {
  //   title: "Contract No.",
  //   name: "contract_no"
  // },
  {
    title: "PO No.",
    name: "po_no"
  },
]
const specialPaymentList = [
  {
    title: "Vendor Name",
    name: "vendor_name"
  },
  {
    title: "Doc No.",
    name: "referenceNumber"
  },
  {
    title: "Payment Amount",
    name: "payment_amount"
  },
]
const ccList = [
  {
    title: "Employee Name",
    name: "employee_name"
  },
  {
    title: "Doc No.",
    name: "employee_claim_number"
  },
  {
    title: "Company To Pay",
    name: "company_to_pay"
  },
]
const pcardList = [
  {
    title: "Employee Name",
    name: "employee_name"
  },
  {
    title: "Doc No.",
    name: "p_card_number"
  },
  {
    title: "Company To Pay",
    name: "company_to_pay"
  },
]
const ciList = [
  {
    title: "Vendor Name",
    name: "vendor_name"
  },
  {
    title: "Doc No.",
    name: "corporate_integrity_number"
  },
  {
    title: "Payment Amount",
    name: "payment_amount"
  },
]

const ApprovalConfirmation = ({ data, module, listData = [], onSuccessNavigateTo }: any) => {
  console.log(data, "Apporval data");
  console.log(listData, "Apporval listData");
  console.log(module, "Apporval module");
  console.log(onSuccessNavigateTo, "Apporval onSuccessNavigateTo");

  const listOfDataModule: any = []
  switch (module) {
    case "bast":
      listOfDataModule.push(...bastList)
      break;
    case "invoice":
      listOfDataModule.push(...invoiceList)
      break;
    case "special-payment":
      listOfDataModule.push(...specialPaymentList)
      break;
    case "employee-claim-cc":
      listOfDataModule.push(...ccList)
      break;
    case "pcard":
      listOfDataModule.push(...pcardList)
      break;
    case "corporate-integrity":
      listOfDataModule.push(...ciList)
      break;

    default:
      break;
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
    >
      <Text style={[styles.title, {
        marginTop: 30
      }]}>Approval Confirmation</Text>
      {
        listData?.length ?
          <Text style={styles.subtitle}>Are you sure you want to approve {listData?.length} transaction?</Text>
          :
          <Text style={styles.subtitle}>Are you sure you want to approve?</Text>
      }
      {
        listData?.length && listData.map((item: any, i: any) => {
          return (
            <Card
              style={{
                backgroundColor: 'white',
                padding: 0,
                marginBottom: 10,
              }}
              key={i}
            >
              <Card.Content style={{
                padding: 0,
                // backgroundColor: 'gray'
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
              }}>
                {
                  listOfDataModule.map((item2: any, i: any) => {
                    return (
                      <View
                        style={{
                          flexDirection: 'row',
                          width: '100%',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}
                        key={i}
                      >
                        <Text style={[styles.subtitle, {
                          width: "30%",
                          marginBottom: 0,
                        }]}>
                          {item2.title}
                        </Text>
                        <Text style={[styles.subtitle, {
                          width: "10%",
                          marginBottom: 0,
                        }]}>:
                        </Text>
                        <Text style={[styles.subtitle, {
                          width: "60%",
                          marginBottom: 0,
                        }]}>
                          {item[item2.name]}
                        </Text>
                      </View>
                    )
                  })
                }
              </Card.Content>
            </Card>
          )
        })

      }

      <View style={[styles.buttonContainer, {
        marginBottom: 30
      }]}>
        <ActionButton type="yes" onPress={() => {
          const approval = async () => {
            // console.log('approval ' + module);
            // console.log(JSON.stringify(data));
            try {
              const response = await api.post(module + '/approval', data);
              console.log('response approval ' + module, response);
              if (response.data?.success) {
                // router.dismiss(2);
                ToastAndroid.show('Approved successfully', ToastAndroid.LONG);
                router.push(JSON.parse(onSuccessNavigateTo));
              } else if (!response.data?.success && response.data?.message) {
                Alert.alert('Failed', response.data?.message);
              } else {
                Alert.alert('Failed', 'Failed to approve ' + module);
              }
            } catch (error) {
              console.error('Error approving ' + module + ' :', error);
            }
          }
          approval();
        }} />
        <ActionButton type="no" onPress={() => {
          router.back();
        }} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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