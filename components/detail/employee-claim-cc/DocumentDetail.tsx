import { changeUStoID, displayDate, displayPrice, displayStringArray } from '@/utils/utils';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { downloadFile } from '../utils/downloadFile';

const { width } = Dimensions.get('window');

const DocumentDetail = (props: any) => {
  const { data, module } = props; // Destructure data from props
  const [downloading, setDownloading] = useState(false);

  const allDoc = {
    title: "All Document",
    value: data?.doc_no ? data?.doc_no + ".pdf" : "-",
    col: 1,
  }
  const bastDetailData = [
    {
      title: "Company",
      value: data?.company_initial ? data?.company_initial : data?.company_code,
    },
    {
      title: "Mineral / Geothermal",
      value: data?.subcompany_code === "001" ? "Mineral" : data?.subcompany_code === "002" ? "Geothermal" : "",
    },
    {
      title: "Department",
      value: data?.department_name,
    },
    {
      title: "Employee Name",
      value: data?.employee?.payroll_name,
    },
    {
      title: "Employee ID",
      value: data?.employee_id,
    },
    {
      title: "Position",
      value: data?.position,
    },
    {
      title: "Currency",
      value: data?.currency_id,
    },
    {
      title: "Doc No",
      value: data?.employee_claim_number,
    },
    {
      title: "Doc Date",
      value: data?.doc_date && displayDate(data.doc_date),
    },
    {
      title: "Total Expense Claimed",
      value: changeUStoID(data?.total_expense_claimed),
    },
    {
      title: "Company to Pay",
      value: changeUStoID(data?.company_to_pay),
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
