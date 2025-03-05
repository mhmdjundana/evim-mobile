import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
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


const DocumentDetailBastSapEdit = (props: any) => {
  const { data } = props; // Destructure data from props

  const bastDetailData = [
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
    for (let i = 0; i < data.length;) {
      if (data[i]?.col || data[i + 1]?.col || !data[i + 1]) {
        const a = (
          <View key={i}>
            <Text style={styles.label}>{data[i].title}</Text>
            <Text style={styles.value}>{data[i].value ? data[i].value : "-"}</Text>
          </View>
        )
        arr.push(a)
        i += 1
      } else {
        const a = (
          <View style={styles.row} key={i}>
            <View style={[styles.columnLeft, { position: 'relative' }]}>
              <Text style={styles.label}>{data[i].title}</Text>
              <Text style={styles.value}>{data[i].value ? data[i].value : "-"}</Text>
            </View>
            <View style={styles.columnRight}>
              <Text style={styles.label}>{data[i + 1].title}</Text>
              <Text style={styles.value}>{data[i + 1].value ? data[i + 1].value : "-"}</Text>
            </View>
          </View>
        )
        arr.push(a)
        i = i + 2
      }
    }
    return arr
  };

  const AA = loopData(bastDetailData)

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* <View>
        <FontAwesome name="file-lines" size={30} color="#900" />
        <FontAwesome5 name="file-lines" size={30} color="#900" />
        <FontAwesome6 name="file-lines" size={30} color="#900" />
        <Ionicons name="file-lines" size={30} color="#900" />
        <MaterialIcons name="file-lines" size={30} color="#900" />
        <Entypo name="file-lines" size={30} color="#900" />
        <AntDesign name="file-lines" size={30} color="#900" />
        <EvilIcons name="file-lines" size={30} color="#900" />
        <Feather name="file-lines" size={30} color="#900" />
        <FontAwesome name="heart" size={20} color="red" />
        <FontAwesome name="bars" size={40} color="blue" />
        <FontAwesome name="house" size={40} />
      </View> */}
      {
        AA?.map((a: any) => a)
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
    justifyContent: 'space-between',
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

export default DocumentDetailBastSapEdit;
