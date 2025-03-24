import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity, Platform, Alert } from 'react-native';
import { downloadFile } from '../utils/downloadFile';

const { width } = Dimensions.get('window');

const DocumentDetailFile = (props: any) => {
  const { data, module } = props; // Destructure data from props
  const [downloading, setDownloading] = useState(false);

  const bast_id = data.id
  const [bastDetailData, setBastDetailData] = useState([
    { title: "Supporting Doc", value: '', flag: 'suporting_doc', text: 'Supporting Doc.pdf' },
    { title: 'Reference File', value: '', flag: 'referenceFile', text: 'Reference File.pdf' },
    { title: 'Payment Advice', value: '', flag: 'paymentAdvice', text: 'Payment Advice.pdf' },
    { title: 'Special Payment', value: '', flag: 'special_payment', text: 'Special Payment.pdf' },
  ])

  useEffect(() => {
    const newData: any = []
    for (let i = 0; i < bastDetailData.length; i++) {
      if (bastDetailData[i].flag === 'special_payment') {
        newData.push({
          ...bastDetailData[i],
          value: "special_payment"
        })
        continue
      }
      const val = data?.[bastDetailData[i].flag] ? data?.[bastDetailData[i].flag] : ""
      newData.push({ ...bastDetailData[i], value: val })
    }
    setBastDetailData(newData)
  }, [data])

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
                    value: item.value,
                    module,
                    name: item.text
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

export default DocumentDetailFile;
