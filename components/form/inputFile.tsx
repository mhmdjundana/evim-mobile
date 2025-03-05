import React from 'react';
import { View, Button } from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';

export const FileUploadComponent = () => {

  const handleCameraLaunch = async (isCamera: boolean) => {
    const options: any = {
      mediaType: isCamera ? 'photo' : 'video',
    };

    try {
      const response = await launchCamera(options);
      console.log('pickedFile', response);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const uploadFileOnPressHandler = async () => {
    try {
      const pickedFile = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.allFiles],
      });
      console.log('pickedFile', pickedFile);

      await RNFS.readFile(pickedFile.uri, 'base64').then(data => {
        console.log('base64', data);
      });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log(err);
      } else {
        console.log(err);
        throw err;
      }
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Button title="Camera" onPress={async () => {
        handleCameraLaunch(true);
      }} />
      <Button title="Video" onPress={async () => {
        handleCameraLaunch(false);
      }} />
      <Button title="Gallary" onPress={async () => {
        uploadFileOnPressHandler();
      }} />
    </View>
  );
};