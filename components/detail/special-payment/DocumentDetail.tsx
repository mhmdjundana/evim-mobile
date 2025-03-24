import { displayPrice, displayStringArray } from '@/utils/utils';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { downloadFile } from '../utils/downloadFile';

const { width } = Dimensions.get('window');

const DocumentDetail = (props: any) => {
  const { data, module } = props; // Destructure data from props
  const [downloading, setDownloading] = useState(false);

  const allDoc = {
    title: "All Document",
    value: data?.special_payment_number ? data?.special_payment_number + ".pdf" : "",
    col: 1,
  }
  const bastDetailData = [
    {
      title: "Special Payment Number",
      value: data?.referenceNumber,
    },
    {
      title: "SAP Company Number",
      value: data?.company ? `${data?.company?.company_initial} ${data?.company?.company_code}` : "",
    },
    {
      title: "Mineral / Geothermal",
      value: data?.subcompany_code === "001" ? "Mineral" : data?.subcompany_code === "002" ? "Geothermal" : "",
    },
    {
      title: "Description",
      value: data?.justification,
    },
    {
      title: "Vendor Detail",
      value: data?.vendor_code,
    },
    {
      title: "Vendor Name",
      value: data?.vendor?.vendor_name,
    },
    {
      title: "Currency",
      value: data?.currency_id,
    },
    {
      title: "Payment Amount",
      value: data?.payment_amount && displayPrice(data?.payment_amount),
    },
    {
      title: "VAT Applicable",
      value: data?.is_vat === "1" ? "Yes" : data?.is_vat === "0" ? "No" : "",
    },
    {
      title: "Amount of VAT",
      value: data?.vat_amount && displayPrice(data?.vat_amount),
    },
    {
      title: "Amount of WHT",
      value: data?.amount_of_wht && displayPrice(data?.amount_of_wht),
    },
    {
      title: "WHT",
      value: data?.wht_no,
    },
    {
      title: "Net Payment",
      value: data?.net_payment && displayPrice(data?.net_payment),
    },
    {
      title: "GL",
      value: data?.gl_no,
    },
    {
      title: "WBS",
      value: data?.wbs_no,
    },
    {
      title: "Cost Center",
      value: data?.cost_center_id,
    },
    {
      title: "Requested By",
      value: data?.requested_by,
    },
    {
      title: "Reference Number",
      value: data?.referenceNumber,
    },
    {
      title: "FV60",
      value: data?.fv60,
    },
    {
      title: "Paid Date",
      value: data?.paid_date,
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
                onPress={() => downloadFile({ setDownloading, id: data.id, value: "all", name: allDoc?.value, module })}
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
