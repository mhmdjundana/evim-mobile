import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Platform, Alert } from 'react-native';
// import FontAwesome from 'react-native-vector-icons/FontAwesome'
// import Ionicons from 'react-native-vector-icons/Ionicons'
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
// import Entypo from 'react-native-vector-icons/Entypo'
// import AntDesign from 'react-native-vector-icons/AntDesign'
// import EvilIcons from 'react-native-vector-icons/EvilIcons'
// import Feather from 'react-native-vector-icons/Feather'
// import api from '@/fetch/axios';
// import * as FileSystem from 'expo-file-system';
// import * as Sharing from 'expo-sharing';
// import * as Linking from 'expo-linking'; // Import Linking
// import { downLoadPdfExcelBase64 } from '@/fetch/downloadFile';
import { downloadFile } from '../utils/downloadFile';

const { width } = Dimensions.get('window');

const BAST_DETAIL_DATA = [
  { title: 'BAST Doc', flag: 'bast_file', text: 'BAST.pdf' },
  { title: 'Timesheet', flag: 'timesheet_file', text: 'Timesheet.pdf' },
  { title: 'Proforma Invoice', flag: 'proforma_invoice_file', text: 'Proforma Invoice.pdf' },
  { title: 'Delivery Order', flag: 'delivery_order_file', text: 'Delivery Order.pdf' },
  { title: 'Summary Reimburse', flag: 'sumary_reimburse_file', text: 'Summary Reimburse.pdf' },
  { title: 'Bill of Lading', flag: 'bill_of_leading_file', text: 'Bill of Lading.pdf' },
  { title: 'Airway Bill', flag: 'airway_bill_file', text: 'Airway Bill.pdf' },
  { title: 'PB1', flag: 'pib_file', text: 'PB1.pdf' },
  { title: 'Purchase Order', flag: 'po_file', text: 'Purchase Order.pdf' },
  { title: 'Confirmation File', flag: 'contract_file', text: 'Confirmation File.pdf' },
  { title: 'Good Receipt Note', flag: 'good_receipt_note', text: 'Good Receipt Note.pdf' },
  { title: 'Progress Report (.xlsx)', flag: 'monthly_report_file', text: 'Progress Report (.xlsx)' },
  { title: 'Other BAST Attachment', flag: 'others_file', text: 'Other BAST Attachment.pdf' },
];

const FileItem = ({ item, index, bast_id, downloading, setDownloading }: any) => {
  return (
    <View style={styles.row2} key={index}>
      <View style={styles.columnLeft2}>
        <Text style={styles.label2}>{item.title}</Text>
      </View>
      <View style={styles.middle2}>
        <Text style={styles.label2}>:</Text>
      </View>
      <View style={styles.columnRight2}>
        {item.value ? (
          <TouchableOpacity
            onPress={() => downloadFile({ setDownloading, id: bast_id, value: item.value, module: 'bast', name: item.text })}
            disabled={downloading}
          >
            <Text style={styles.valueFile}>{item.text}</Text>
          </TouchableOpacity>
        ) : (
          <Text style={styles.value2}>{'-'}</Text>
        )}
      </View>
    </View>
  )
}

const DocumentDetailFiles = (props: any) => {
  const { data } = props; // Destructure data from props
  const [downloading, setDownloading] = useState(false);

  const bast_id = data.id
  const [bastDetailData, setBastDetailData] = useState([])
  // console.log(bastDetailData, "bastDetailData")
  // console.log(data.id, "bast data id")

  useEffect(() => {
    const updatedData: any = BAST_DETAIL_DATA.map(item => {
      if (item.flag === 'bast_file') {
        return ({
          ...item,
          value: "bast"
        })
      }
      return ({
        ...item,
        value: data[item.flag] || ""
      })
    });
    setBastDetailData(updatedData);
  }, [data]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {bastDetailData.map((item, index) => (
        <FileItem
          key={index}
          item={item}
          index={index}
          bast_id={bast_id}
          downloading={downloading}
          setDownloading={setDownloading}
        />
      ))}
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

export default DocumentDetailFiles;
