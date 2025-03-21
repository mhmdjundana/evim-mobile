import { displayStringArray } from '@/utils/utils';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { downloadFile } from '../utils/downloadFile';

const { width } = Dimensions.get('window');

const DocumentDetail = (props: any) => {
  const { data } = props; // Destructure data from props
  const [downloading, setDownloading] = useState(false);

  const allDoc = {
    title: "All Document",
    value: data?.doc_no ? data?.doc_no + ".pdf" : "-",
    col: 1,
  }
  const bastDetailData = [
    {
      title: "BAST No.",
      value: data?.bast_no,
    },
    {
      title: "Goods or Services",
      value: data?.good_or_services === '1' ? "Goods" : data?.good_or_services === '2' ? "Services" : "-",
    },
    {
      title: "Mineral or Geothermal",
      value: data?.company_sub_id === "1" ? "Mineral" : data?.company_sub_id === "2" ? "Geothermal" : "-",
    },
    {
      title: "Contract/BPO No",
      value: data?.contract_no,
    },
    {
      title: "Contract SAP",
      value: data?.contract_sap,
    },
    {
      title: "PO No.",
      value: data?.po_no,
    },
    {
      title: "MIGO / SES No",
      value: data?.migo_or_ses,
    },
    {
      title: "House Bank",
      value: data?.house_bank,
    },
    {
      title: "Account ID",
      value: data?.account_id,
    },
    {
      title: "Payment Method",
      value: data?.payment_method,
    },
    {
      title: "GL No",
      value: data?.gl_no && displayStringArray(data?.gl_no),
    },
    {
      title: "WBS No",
      value: data?.wbs_no && displayStringArray(data?.wbs_no),
    },
    {
      title: "Cost Center No.",
      value: data?.coscenter_no && displayStringArray(data?.coscenter_no),
    },
    {
      title: "SAP Invoice (MIRO)",
      value: data?.sap_invoice_miro,
    },
    {
      title: "Invoice Date",
      value: data?.invoice_date,
    },
    {
      title: "Supplier Name",
      value: data?.suplier_name,
    },
    {
      title: "Vendor Code",
      value: data?.vendor_code,
    },
    {
      title: "Vendor Type",
      value: data?.vendor_type,
    },
    {
      title: "Department",
      value: data?.department?.name,
    },
    {
      title: "Invoice Number",
      value: data?.invoice_number,
    },
    {
      title: "Invoice Description",
      value: data?.description_invoice,
    },
    {
      title: "Paid Date",
      value: data?.payment_date,
    },
    {
      title: "Notes",
      value: data?.notes,
    },
  ]

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {
        allDoc?.value && (
          <View style={styles.row}>
          <View style={styles.columnLeft}>
            <Text style={styles.label}>{allDoc.title}</Text>
          </View>
          <View style={styles.middle}>
            <Text style={styles.label}>:</Text>
          </View>
          <View style={styles.columnRight}>
            <TouchableOpacity
              onPress={() => downloadFile({ setDownloading, id: data.id, value: "all", name: allDoc?.value, module: 'invoice' })}
              disabled={downloading}
            >
              <Text style={styles.valueAllDoc}>{allDoc.value}</Text>
            </TouchableOpacity>
          </View>
        </View>
        )
      }
      {bastDetailData.map((item, index) => (
        <View key={index} style={styles.row}>
          <View style={styles.columnLeft}>
            <Text style={styles.label}>{item.title}</Text>
          </View>
          <View style={styles.middle}>
            <Text style={styles.label}>:</Text>
          </View>
          <View style={styles.columnRight}>
            <Text style={styles.value}>{item.value}</Text>
          </View>
        </View>
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
    paddingHorizontal: 18,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    maxWidth: width - (18 * 2),
    borderBottomWidth: 3,
    borderColor: "#F8F9FE",
  },
  columnLeft: {
    // backgroundColor: 'red',
    width: 130,
    marginRight: 4,
    padding: 0,
  },
  middle: {
    // backgroundColor: 'gray'
    marginRight: 4,
  },
  columnRight: {
    // backgroundColor: 'red',
    flex: 1,
    padding: 0,
  },
  label: {
    // backgroundColor: 'green',
    fontSize: 16,
    fontWeight: '900',
    color: '#494A50',
    padding: 0,
  },
  value: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#494A50',
  },
  valueAllDoc: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#0024FF',
  },
});

export default DocumentDetail;
