import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { downloadFile } from '../utils/downloadFile';

const TaxFakturCard = ({
  data,
  id
}: any) => {
  const [downloading, setDownloading] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>TAX</Text>
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.row}>
            <Text style={styles.label}>No. Faktur</Text>
            <Text style={styles.separator}>:</Text>
            <Text style={styles.value}>{data?.faktur_no}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Date Faktur</Text>
            <Text style={styles.separator}>:</Text>
            <Text style={styles.value}>{data?.faktur_date}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Status Approval</Text>
            <Text style={styles.separator}>:</Text>
            <View style={styles.valueContainer}>
              <Text style={styles.value}>{data?.statusApprovalTax}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>DPP</Text>
            <Text style={styles.separator}>:</Text>
            <Text style={styles.value}>{data?.jumlahDpp}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>PPN</Text>
            <Text style={styles.separator}>:</Text>
            <Text style={styles.value}>{data?.jumlahPpn}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Address</Text>
            <Text style={styles.separator}>:</Text>
            <View style={styles.valueContainer}>
              <Text style={styles.value}>{data?.faktur_address}</Text>
            </View>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.button}
        onPress={() => {
          console.log(data?.faktur_file)
          downloadFile({
            setDownloading,
            id,
            value: data?.faktur_file,
            name: 'Faktur Pajak.pdf',
            module: 'invoice'
          })
        }}
      >
        <Text style={styles.buttonText}>View Faktur Pajak</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    // backgroundColor: '#4f4f4f',
    borderRadius: 8,
    // maxWidth: 350,
    width: "100%",
    alignSelf: 'center',
  },
  card: {
    backgroundColor: '#F8F9FE',
    borderRadius: 16,
    overflow: 'hidden',
  },
  headerContainer: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerText: {
    fontSize: 18,
    fontWeight: '800',
    color: "#494A50"
  },
  contentContainer: {
    padding: 12,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  label: {
    width: 110,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#494A50',
  },
  separator: {
    paddingHorizontal: 8,
  },
  valueContainer: {
    flex: 1,
  },
  value: {
    color: '#494A50',
    flex: 1,
    fontSize: 14,
    fontWeight: '400',
  },
  button: {
    backgroundColor: '#74b9ff',
    padding: 10,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '800',
    fontSize: 16,
  },
});

export default TaxFakturCard;