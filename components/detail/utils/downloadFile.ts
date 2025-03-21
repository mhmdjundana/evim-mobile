import { downLoadPdfExcelBase64 } from '@/fetch/downloadFile';
import * as Sharing from 'expo-sharing';
import { Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Linking from 'expo-linking';

const downloadFile = async ({
  setDownloading,
  id,
  value,
  name,
  module
}: any) => {
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
    const base64Data = await downLoadPdfExcelBase64({ id: id, filename: value, module });

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

    const fileUri = `${FileSystem.documentDirectory}${name ? name : value}`;
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

export {
  downloadFile
}