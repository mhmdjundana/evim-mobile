import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const HeaderDetail = ({
  title = "Header Detail",
  // status = "Completed",
  status = "",
  statusColor = "#00ff00"
}: any) => {
  const { width } = Dimensions.get('window');

  return (
    <View style={[styles.container, { width }]}>
      <Text style={styles.title}>{title}</Text>
      {
        status && (
          <View style={[styles.statusContainer, { backgroundColor: statusColor }]} >
            <Text style={styles.statusText}>{status}</Text>
          </View>
        )
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#007E7A', // Teal color
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  statusContainer: {
    backgroundColor: '#3F51B5', // Indigo color
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  statusText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default HeaderDetail;