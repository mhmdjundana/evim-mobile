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

const { width } = Dimensions.get('window');


const DocumentDetailBastSapEditFiles = (props: any) => {
  const { data } = props; // Destructure data from props

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

  const loopData = (data: any) => {
    const FileIconContainer = ({ value }: { value: string }) => {
      const [downloading, setDownloading] = useState(false);

      const downloadFile = async () => {
        setDownloading(true);
        const shareFile = async (fileUri: any, mimeType: any) => {
          // share file
          try {
            await Sharing.shareAsync(fileUri, { mimeType: mimeType }); // Share using the file URI directly
          } catch (error) {
            console.error("Error sharing file:", error);
            Alert.alert("Error", "An error occurred while sharing the file.");
          }

          // open file
          // if (Platform.OS === 'ios') {
          //   // iOS: Use Expo's Document Viewer or a third-party library if needed
          //   // For simple viewing, Sharing might still be the best option on iOS
          //   await Sharing.shareAsync(fileUri, { mimeType: mimeType }); // iOS share
          // } else { // Android: Open with default viewer using Linking
          //   try {
          //     const contentUri = await FileSystem.getContentUriAsync(fileUri); // Android Content URI
          //     console.log(contentUri, "contentUri")
          //     console.log(await FileSystem.getInfoAsync(fileUri), "fileUri getinfo")
          //     await Linking.openURL(contentUri); // Open with default app
          //   } catch (linkingError) {
          //     console.error("Error opening file (Android):", linkingError);
          //     Alert.alert("Error", "Could not open file. No suitable app found."); // Alert user
          //   }
          // }
        };
        try {
          const base64Data = await downLoadPdfExcelBase64({ id: bast_id, filename: value });

          if (!base64Data) {
            console.error("No data received from server.");
            Alert.alert("Error", "No file data received.");
            return;
          }

          const [fileType, base64File] = base64Data?.split(',');

          if (!base64File) {
            console.error("Invalid data format from server. Expected 'data:mime/type;base64,actualBase64'");
            Alert.alert("Error", "Invalid file data format.");
            return;
          }

          const fileUri = `${FileSystem.documentDirectory}${value}`;
          console.log(fileUri, "fileUri A")

          try {
            const blob = await FileSystem.writeAsStringAsync(fileUri, base64File, { encoding: FileSystem.EncodingType.Base64 });
            console.log(blob, "blob")
          } catch (base64Error) {
            console.error("Base64 decoding error:", base64Error);
            Alert.alert("Error", "Error decoding file data.");
            return;
          }

          console.log(fileType, "fileType");
          console.log(fileUri, "fileUri B")

          let mimeType = 'application/octet-stream';
          if (fileType?.includes('pdf')) {
            mimeType = 'application/pdf';
            console.log("pdf");
          } else if (fileType?.includes('spreadsheetml')) {
            mimeType = 'application/vnd.ms-excel';
            console.log("spreadsheetml");
          }

          // if (Platform.OS === 'ios') {
          //   console.log("ios");
          //   await Sharing.shareAsync(fileUri, { UTI: mimeType, mimeType: mimeType }); // Use determined mimeType
          // } else {
          //   console.log("android");
          //   const contentUri = await FileSystem.getContentUriAsync(fileUri);
          //   console.log(contentUri, "contentUri");
          //   await Sharing.shareAsync(contentUri, { mimeType: mimeType }); // Use determined mimeType
          // }
          await shareFile(fileUri, mimeType);

        } catch (error) {
          console.error("General error:", error);
          Alert.alert("Error", "An error occurred."); // Alert user
        } finally {
          setDownloading(false);
        }
      }

      return (
        <>
          {
            value && (
              <TouchableOpacity
                activeOpacity={0.5}
                style={{ position: 'absolute', right: 0, top: 10 }}
                disabled={downloading}
                onPress={() => {
                  downloadFile()
                }}
              >
                <FontAwesome6 name="file-arrow-down" size={18} color="#757575" />
              </TouchableOpacity>
            )
          }
        </>
      )
    }

    const arr = []
    for (let i = 0; i < data.length;) {
      if (data[i]?.col || data[i + 1]?.col || !data[i + 1]) {
        const a = (
          <View key={i}>
            <Text style={styles.label}>{data[i].title}</Text>
            <Text style={styles.value}>{data[i].value ? data[i].text : "-"}</Text>
            <FileIconContainer value={data[i].value} />
          </View>
        )
        arr.push(a)
        i += 1
      } else {
        const a = (
          <View style={styles.row} key={i}>
            <View style={[styles.columnLeft, { position: 'relative' }]}>
              <Text style={styles.label}>{data[i].title}</Text>
              <Text style={styles.value}>{data[i].value ? data[i].text : "-"}</Text>
              <FileIconContainer value={data[i].value} />
            </View>
            <View style={styles.columnRight}>
              <Text style={styles.label}>{data[i + 1].title}</Text>
              <Text style={styles.value}>{data[i + 1].value ? data[i + 1].text : "-"}</Text>
              <FileIconContainer value={data[i + 1]?.value} />
            </View>
          </View>
        )
        arr.push(a)
        i = i + 2
      }
    }
    return arr
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
});

export default DocumentDetailBastSapEditFiles;
