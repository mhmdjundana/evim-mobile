import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Platform, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Or any icon library you prefer
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing'; // For sharing the downloaded file
// import pdfFile from "./Sp.pdf"
// import excelFile from "./download.xlsx"
// import { base64Pdf, base64Excel } from './bast64Pdf'

export const DownloadButtonFile = ({ url, filename, fileType }: any) => {
  const [downloading, setDownloading] = useState(false);

  const downloadFile = async () => {
    setDownloading(true);

    try {
      const { uri } = await FileSystem.downloadAsync(url, FileSystem.documentDirectory + filename);

      if (fileType === 'pdf') { // Handle PDF specifically for better UX
        if (Platform.OS === 'ios') { // iOS: Open with Expo's document viewer or share
          await Sharing.shareAsync(uri, { UTI: 'application/pdf', mimeType: 'application/pdf' }); // iOS share
        } else { // Android: Open with default PDF viewer
          await FileSystem.getContentUriAsync(uri).then(contentUri => {
            //  Use Linking if you want to open directly.  Sharing gives more options.
            //  Linking.openURL(contentUri);
            return Sharing.shareAsync(contentUri, { mimeType: 'application/pdf' });
          });
        }
      } else if (fileType === 'excel') { // Handle Excel (example share)
        await Sharing.shareAsync(uri, { mimeType: 'application/vnd.ms-excel' }); // Or proper Excel mime type
      } else { // Generic handling (e.g., share)
        await Sharing.shareAsync(uri);
      }
    } catch (error) {
      console.error('Error downloading or opening file:', error);
      Alert.alert('Error', 'An error occurred during download or opening the file.');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <TouchableOpacity onPress={downloadFile} disabled={downloading} style={styles.button}>
      {downloading ? (
        <Ionicons name="cloud-download" size={32} color="gray" /> // Show a downloading indicator (e.g., grayed out icon)
      ) : (
        <Ionicons name="cloud-download" size={32} color="blue" /> // Your desired icon
      )}
    </TouchableOpacity>
  );
};

export const DownloadButtonBase64 = ({ base64Data, filename, fileType }: any) => {
  const [downloading, setDownloading] = useState(false);

  const downloadFile = async () => {
    setDownloading(true);

    try {
      // 1. Create the file from Base64 data
      const fileUri = `${FileSystem.documentDirectory}${filename}`;
      await FileSystem.writeAsStringAsync(fileUri, base64Data, { encoding: FileSystem.EncodingType.Base64 });

      // 2. Share the file (handling PDF and Excel as before)
      if (fileType === 'pdf') {
        if (Platform.OS === 'ios') {
          await Sharing.shareAsync(fileUri, { UTI: 'application/pdf', mimeType: 'application/pdf' });
        } else {
          const contentUri = await FileSystem.getContentUriAsync(fileUri);
          await Sharing.shareAsync(contentUri, { mimeType: 'application/pdf' });
        }
      } else if (fileType === 'excel') {
        await Sharing.shareAsync(fileUri, { mimeType: 'application/vnd.ms-excel' }); // Or correct mime type
      } else {
        await Sharing.shareAsync(fileUri);
      }

    } catch (error) {
      console.error('Error creating or sharing file:', error);
      Alert.alert('Error', 'An error occurred during file creation or sharing.');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <TouchableOpacity onPress={downloadFile} disabled={downloading} style={styles.button}>
      {downloading ? (
        <Ionicons name="cloud-download" size={32} color="gray" />
      ) : (
        <Ionicons name="cloud-download" size={32} color="blue" />
      )}
    </TouchableOpacity>
  );
};

const DemoDownloadButton = () => {
  // const pdfURL = pdfFile; // Replace with your PDF URL
  // const excelURL = excelFile; // Replace with your Excel URL

  // const pdfBase64 = base64Pdf; // Replace with your Base64 PDF data
  // const excelBase64 = base64Excel; // Replace with your Base64 Excel data

  return (
    <View style={styles.container}>
      { /* <DownloadButtonFile url={pdfURL} filename="my_document.pdf" fileType="pdf" />
      <DownloadButtonFile url={excelURL} filename="data.xls" fileType="excel" />
      <DownloadButtonBase64 base64Data={pdfBase64} filename="my_document.pdf" fileType="pdf" />
      <DownloadButtonBase64 base64Data={excelBase64} filename="data.xls" fileType="excel" />} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
});

export default DemoDownloadButton;