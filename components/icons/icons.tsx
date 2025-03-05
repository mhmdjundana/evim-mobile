import { Text, View, ScrollView, StyleSheet, Dimensions } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Feather from 'react-native-vector-icons/Feather'

const { width } = Dimensions.get('window');

const IconDemo = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={[styles.row, { marginBottom: 40, }]}>
        <FontAwesome6 name="file-lines" size={20} color="#757575" />
        <FontAwesome6 name="file-arrow-down" size={20} color="#757575" />
        <FontAwesome6 name="pen-to-square" size={20} color="#757575" />
        <FontAwesome6 name="folder" size={20} color="#757575" />
        <FontAwesome6 name="box" size={20} color="#757575" />
        <FontAwesome6 name="box-archive" size={20} color="#757575" />
        <FontAwesome5 name="folder" size={20} color="#757575" />
        <FontAwesome name="folder" size={20} color="#757575" />
      </View>
      <View>
        <FontAwesome name="box-archive" size={30} color="#900" />
        <FontAwesome5 name="box-archive" size={30} color="#900" />
        <FontAwesome6 name="box-archive" size={30} color="#900" />
        <Ionicons name="file-edit" size={30} color="#900" />
        <MaterialIcons name="file-edit" size={30} color="#900" />
        <Entypo name="file-edit" size={30} color="#900" />
        <AntDesign name="file-edit" size={30} color="#900" />
        <EvilIcons name="file-edit" size={30} color="#900" />
        <Feather name="file-edit" size={30} color="#900" />
        <FontAwesome name="heart" size={20} color="red" />
        <FontAwesome name="bars" size={40} color="blue" />
        <FontAwesome name="house" size={40} />
      </View>

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
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
    // marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  columnLeft: {
    flex: 1,
    marginRight: 8,
  },
  columnRight: {
    flex: 1,
    marginLeft: 8,
  },
  label: {
    fontSize: 14,
    color: '#555',
    marginTop: 8,
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#404040',
  },
});

export default IconDemo;