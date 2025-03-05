import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

const DetailLogo = ({title = "Invoice"}: any) => {
  return (
    <View style={styles.container}>
      {/* <View style={styles.diamond}>
        <View style={styles.triangle} />
      </View> */}
      <Image source={require('./stm-logo-detail.png')} style={{ marginBottom: 10 }} />
      {
        typeof title === "string" ?
        <Text style={styles.invoiceText}>{title}</Text>
        :
        title
      }
      {/* <Text style={styles.invoiceText}>{title}</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  diamond: {
    width: 100,
    height: 100,
    backgroundColor: '#333',
    transform: [{ rotate: '45deg' }],
  },
  triangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 50,
    borderRightWidth: 50,
    borderBottomWidth: 80,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#ffcc00',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  text: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  invoiceText: {
    color: '#404040',
    fontSize: 15,
    marginTop: 10,
    fontWeight: '500',
  },
});

export default DetailLogo;