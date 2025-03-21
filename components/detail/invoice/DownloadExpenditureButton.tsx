import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native"
import { downloadFile } from "../utils/downloadFile";

export const DownloadExpenditureButton = ({ id }: { id: number }) => {
  const [downloading, setDownloading] = useState(false);
  
  return (
    <View
      style={{
        width: '100%',
        padding: 'auto',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <TouchableOpacity
        style={{
          backgroundColor: '#6FB9FF',
          paddingHorizontal: 20,
          paddingVertical: 15,
          borderRadius: 25,
          marginTop: 15,
        }}
        onPress={() => {
          downloadFile({
            setDownloading,
            id,
            value: 'expenditureExcel',
            name: 'Summary of Contract Expenditure.xlsx',
            module: 'invoice'
          })
        }}
      >
        <Text
          style={{
            color: '#fff',
            textAlign: 'center',
            fontSize: 18,
            fontWeight: '800'
          }}
        >
          DOWNLOAD SUMMARY EXPENDITURE
        </Text>
      </TouchableOpacity>
    </View>
  )
}