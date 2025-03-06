import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Platform, Alert } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Feather from 'react-native-vector-icons/Feather'
import api from '@/fetch/axios';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as Linking from 'expo-linking'; // Import Linking
import { downLoadPdfExcelBase64 } from '@/fetch/downloadFile';
import { downloadFile } from './utils/downloadFile';

const { width } = Dimensions.get('window');


const DocumentDetailBastSapEditFilesNew = (props: any) => {
  const { data } = props; // Destructure data from props
  const [downloading, setDownloading] = useState(false);

  const bast_id = data.id
  const [bastDetailData, setBastDetailData] = useState([
    { title: 'Timesheet', value: '', flag: 'timesheet_file', text: 'Timesheet.pdf' },
    { title: 'Proforma Invoice', value: '', flag: 'proforma_invoice_file', text: 'Proforma Invoice.pdf' },
    { title: 'Delivery Order', value: '', flag: 'delivery_order_file', text: 'Delivery Order.pdf' },
    { title: 'Summary Reimburse', value: '', flag: 'sumary_reimburse_file', text: 'Summary Reimburse.pdf' },
    { title: 'Bill of Lading', value: '', flag: 'bill_of_leading_file', text: 'Bill of Lading.pdf' },
    { title: 'Airway Bill', value: '', flag: 'airway_bill_file', text: 'Airway Bill.pdf' },
    { title: 'PB1', value: '', flag: 'pib_file', text: 'PB1.pdf' },
    { title: 'Purchase Order', value: '', flag: 'po_file', text: 'Purchase Order.pdf' },
    { title: 'Confirmation File', value: '', flag: 'contract_file', text: 'Confirmation File.pdf' },
    { title: 'Good Receipt Note', value: '', flag: 'good_receipt_note', text: 'Good Receipt Note.pdf' },
    { title: 'Progress Report (.xlsx)', value: '', flag: 'monthly_report_file', text: 'Progress Report (.xlsx)' },
    { title: 'Other BAST Attachment', value: '', flag: 'others_file', text: 'Other BAST Attachment.pdf' },
  ])
  console.log(bastDetailData, "bastDetailData")
  console.log(data.id, "bast data id")

  useEffect(() => {
    const newData = []
    for (let i = 0; i < bastDetailData.length; i++) {
      const val = data?.[bastDetailData[i].flag] ? data?.[bastDetailData[i].flag] : ""
      newData.push({ ...bastDetailData[i], value: val })
    }
    setBastDetailData(newData)
  }, [data])

  const FileIconContainer = ({ value }: { value: string }) => {
    const [downloading, setDownloading] = useState(false);

    return (
      <>
        {
          value && (
            <TouchableOpacity
              activeOpacity={0.5}
              style={{ position: 'absolute', right: 0, top: 10 }}
              disabled={downloading}
              onPress={() => {
                downloadFile({
                  setDownloading,
                  id: bast_id,
                  value
                })
              }}
            >
              <FontAwesome6 name="file-arrow-down" size={18} color="#757575" />
            </TouchableOpacity>
          )
        }
      </>
    )
  }
  const loopData = (data: any) => {

    const mp = data.map((item: any, index: any) => {
      return (
        <View style={[styles.row2]} key={index}>
          <View style={styles.columnLeft2}>
            <Text style={styles.label2}>{item.title}</Text>
          </View>
          <View style={styles.middle2}>
            <Text style={styles.label2}>:</Text>
          </View>
          {
            item.value ?
              <TouchableOpacity style={styles.columnRight2}
                onPress={() => {
                  downloadFile({
                    setDownloading,
                    id: bast_id,
                    value: item.value
                  })
                }}
                disabled={downloading}
              >
                <Text style={styles.valueFile}>{item.text}</Text>
              </TouchableOpacity>
              :
              <View style={styles.columnRight2}>
                <Text style={styles.value2}>{'-'}</Text>
              </View>
          }
        </View>
      )
    })
    return mp
  };

  const AA = loopData(bastDetailData)

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {
        AA?.map((a: any) => a)
      }
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    width: width,
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
    // marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  columnLeft: {
    flex: 1,
    marginRight: 8,
  },
  columnRight: {
    flex: 1,
    marginLeft: 8,
  },
  label: {
    fontSize: 14,
    color: '#555',
    marginTop: 8,
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#404040',
  },
  row2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    maxWidth: width - (18 * 2),
    borderBottomWidth: 3,
    borderColor: "#F8F9FE",
  },
  columnLeft2: {
    // backgroundColor: 'red',
    width: 130,
    marginRight: 4,
    padding: 0,
  },
  middle2: {
    // backgroundColor: 'gray'
    marginRight: 4,
  },
  columnRight2: {
    // backgroundColor: 'red',
    flex: 1,
    padding: 0,
  },
  label2: {
    // backgroundColor: 'green',
    fontSize: 16,
    fontWeight: '900',
    color: '#494A50',
    padding: 0,
  },
  value2: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#494A50',
  },
  valueFile: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#0024FF',
  },
});

export default DocumentDetailBastSapEditFilesNew;
