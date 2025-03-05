import { View, Text, FlatList, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
export default function HeaderTitle({title = "List"}: any) {
  return (
    <View style={styles.header}>
    <Text style={styles.title}>{title}</Text>
  </View>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#007E7A',
    minWidth: width,
    width: "100%",
    // width: "100%",
    height: 44,
    padding: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white'
  },
});