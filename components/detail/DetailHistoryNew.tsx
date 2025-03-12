import { displayDateWithTime } from '@/utils/utils';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HistoryItem = ({ created_at, vendor, user, process, read_status, comment }: any) => (
  <View style={styles.itemContainer}>
    <View style={{
      flexDirection: 'row',
      alignItems: "flex-start",
      gap: 15,
      justifyContent: 'space-between',
      // backgroundColor: 'red',
      maxWidth: "100%"
    }}>
      <Text style={styles.date}>{displayDateWithTime(created_at)}</Text>
      <Text style={styles.name}>{user?.name}</Text>
    </View>
    <Text style={styles.company}>{vendor?.vendor_name}</Text>
    <Text style={styles.process}>Process: {process}</Text>
    <Text style={styles.activity}>Activity: {read_status}</Text>
    <Text style={styles.activity}>Comment: {comment}</Text>
  </View>
);

const HistoryScreen = ({ data }: any) => {
  // console.log(data, 'history data')
  const historyData = [
    {
      date: '6 Jan 2025 14:00',
      name: 'Hendry',
      company: 'PT. Senyum Untuk Negeri',
      process: 'Paid Completed',
      activity: 'Approved',
    },
    {
      date: '5 Jan 2025 14:00',
      name: 'Emily',
      company: 'PT. Senyum Untuk Negeri',
      process: 'Input Miro',
      activity: 'Updated',
    },
    {
      date: '4 Jan 2025 14:00',
      name: 'Genevieve',
      company: 'PT. Senyum Untuk Negeri',
      process: 'Approved By Payment Approver',
      activity: 'Approved',
    },
    {
      date: '3 Jan 2025 14:00',
      name: 'Francis',
      company: 'PT. Senyum Untuk Negeri',
      process: 'Approved By Tax Admin',
      activity: 'Approved',
    },
    {
      date: '2 Jan 2025 14:00',
      name: 'Emily',
      company: 'PT. Senyum Untuk Negeri',
      process: 'Approved By Account Payables',
      activity: 'Updated',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <Text style={styles.title}>History</Text>
      </View>
      {data.map((item: any, index: any) => (
        <HistoryItem key={index} {...item} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#1E293B', // Dark background color

    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#494a50',
    // marginBottom: 20,
    textAlign: 'center',
  },
  itemContainer: {
    backgroundColor: '#F8F9FE', // Slightly lighter background for items
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    maxWidth: '100%'
  },
  date: {
    fontSize: 16,
    color: '#494a50',
    fontWeight: 'bold',
    // marginBottom: 5,
    flex: 1
  },
  name: {
    fontSize: 16,
    color: '#494a50',
    textAlign: 'right',
    // marginTop: -20, // Adjust to align with date
    // marginBottom: 10,
    flex: 1,
  },
  company: {
    fontSize: 14,
    color: '#494a50',
    marginBottom: 5,
  },
  process: {
    fontSize: 14,
    color: '#494a50',
    marginBottom: 5,
  },
  activity: {
    fontSize: 14,
    color: '#494a50',
  },
});

export default HistoryScreen;