import { displayDate } from '@/utils/utils';
import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';

const { width } = Dimensions.get('window');
const columnWidths = {
  date: 100,
  vendor: 150,
  user: 120,
  process: 120,
  activity: 120,
  comment: 200,
};

const DetailHistory = ({ data }: any) => {
  // console.log(data, "data history")
  return (
    <View style={styles.container}>
      <View></View>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>History</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator>
        <View>
          <View style={styles.tableHeaderRow}>
            <Text style={[styles.headerCell, { width: columnWidths.date }]}>Date</Text>
            <Text style={[styles.headerCell, { width: columnWidths.vendor }]}>Vendor Name</Text>
            <Text style={[styles.headerCell, { width: columnWidths.user }]}>User</Text>
            <Text style={[styles.headerCell, { width: columnWidths.process }]}>Process</Text>
            <Text style={[styles.headerCell, { width: columnWidths.activity }]}>Activity</Text>
            <Text style={[styles.headerCell, { width: columnWidths.comment }]}>Comment</Text>
          </View>
          {
            data?.map((item: any, idx: number) => (
              <View style={styles.tableDataRow} key={idx}>
                <Text style={[styles.dataCell, { width: columnWidths.date }]}>{displayDate(item.created_at)}</Text>
                <Text style={[styles.dataCell, { width: columnWidths.vendor }]}>{item.vendor?.vendor_name}</Text>
                <Text style={[styles.dataCell, { width: columnWidths.user }]}>{item.user?.name}</Text>
                <Text style={[styles.dataCell, { width: columnWidths.process }]}>{item.process}</Text>
                <Text style={[styles.dataCell, { width: columnWidths.activity }]}>{item.read_status}</Text>
                <Text style={[styles.dataCell, { width: columnWidths.comment }]}>{item.comment}</Text>
              </View>
            ))
          }
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ccc',
    // padding: 5,
    width: width - 10,
    marginHorizontal: "auto",
  },
  headerContainer: {
    backgroundColor: '#008080',
    paddingVertical: 5,
    // borderRadius: 20,
    // borderTopEndRadius: 20,
    // borderTopStartRadius: 20,
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  tableHeaderRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#f0f0f0',
    paddingVertical: 8,
  },
  tableDataRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerCell: {
    fontWeight: 'bold',
    textAlign: 'left',
    paddingHorizontal: 10,
    fontSize: 14,
  },
  dataCell: {
    textAlign: 'left',
    paddingHorizontal: 10,
    fontSize: 14,
  },
});

export default DetailHistory;
