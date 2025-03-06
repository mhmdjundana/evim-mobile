import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';

const { width } = Dimensions.get('window');

const DocumentDetailNew = (props: any) => {
  const { data } = props; // Destructure data from props

  const bastDetailData = [
    {
      title: "All Document",
      value: data?.doc_no ? data?.doc_no + ".pdf" : "-",
      col: 1,
    },
    {
      title: "BAST No.",
      value: data?.bast_no,
    },
    {
      title: "Posting Date",
      value: data?.posting_date,
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
      title: "PO Type",
      value: data?.is_po_onthespot === "1" ? "Spot PO" : data?.is_po_onthespot === "0" ? "Contract/BPO" : "-",
    },
    {
      title: "Requested By",
      value: data?.requested_by,
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
      title: "Posting Date",
      value: data?.posting_date,
    },
    {
      title: "Delivery Note",
      value: data?.delivery_note,
    },
    {
      title: "Supplier Name",
      value: data?.suplier_name,
    },
    {
      title: "Bill of Lading (if any)",
      value: data?.bill_of_leading,
    },
    {
      title: "Airway Bill (if any)",
      value: data?.airway_bill,
    },
    {
      title: "Notes",
      value: data?.notes,
    },

  ]

  const loopData = (data: any) => {
    const arr = []
    // return arr
    return data.map((item: any) => (
      <View style={[styles.row]}>
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
    ));
  };

  const AA = loopData(bastDetailData)

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {
        AA.map((a: any) => a)
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
});

export default DocumentDetailNew;
