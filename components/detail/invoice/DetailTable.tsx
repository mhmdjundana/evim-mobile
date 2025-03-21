import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { bastDetailItemDataKeys } from '../data/bastDetailData';
// import detail from '@/app/bast/detail';
// import { RnPicker } from '../../input/dropdown';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Or your preferred icon library
// import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import { displayPrice } from '@/utils/utils';

const { width } = Dimensions.get('window');

const DetailTable = ({
  data,
}: any) => {
  // console.log(data, 'DetailTableNew data')
  const { details } = data
  console.log(details, 'DetailTableNew data')
  const [details2, setDetails2] = useState([])

  useEffect(() => {
    const d: any = []
    if (details?.length) {
      for (let i = 0; i < details.length; i++) {
        const e = JSON.parse(JSON.stringify(bastDetailItemDataKeys))
        for (let j = 0; j < e.length; j++) {
          e[j].value = details[i]?.[e[j].name]
        }
        console.log(e)
        d.push(e)
      }
      setDetails2(d)
    }
  }, [
    details,
  ])

  return (
    <View style={[{
      // backgroundColor: 'yellow',
      paddingHorizontal: 16,
      width: '100%'
    }]}>
      {
        details?.map((item: any, idx: number) => {
          return (
            <View style={styles.card} key={idx}>
              <View style={styles.row}>
                <Text style={styles.label}>Description</Text>
                <Text style={styles.colon}>:</Text>
                <Text style={styles.value}> {item.description}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>UOM</Text>
                <Text style={styles.colon}>:</Text>
                <Text style={styles.value}> {item.uom?.uom_name}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>QTY</Text>
                <Text style={styles.colon}>:</Text>
                <Text style={styles.value}> {displayPrice(item.qty)}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Currency</Text>
                <Text style={styles.colon}>:</Text>
                <Text style={styles.value}> {item.currency?.currency_name}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Unit Price</Text>
                <Text style={styles.colon}>:</Text>
                <Text style={styles.value}> {displayPrice(item.unit_price)}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Total Value</Text>
                <Text style={styles.colon}>:</Text>
                <Text style={styles.value}> {displayPrice(item.total_value)}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Is Reimbursement</Text>
                <Text style={styles.colon}>:</Text>
                <Text style={styles.value}> {item.is_reimbursement === "0" ? 'No' : item.is_reimbursement === "1" ? 'Yes' : '-'}</Text>
              </View>
              {/* <View style={styles.row}>
                <Text style={styles.label}>Reason of Rejection</Text>
                <Text style={styles.colon}>:</Text>
                <Text style={styles.value}> {item.reason_of_rejection}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Comment</Text>
                <Text style={styles.colon}>:</Text>
                <Text style={styles.value}> {item.comment}</Text>
              </View> */}
            </View>
          )
        })
      }
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    width: width - 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginHorizontal: "auto",
  },
  header: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 5,
    marginBottom: 5,
  },
  headerCell: {
    fontWeight: 'bold',
    fontSize: 14,
    // flex: 1,
    textAlign: 'center',
    // paddingHorizontal: 5,
  },
  row: {
    flexDirection: 'row',
    // borderBottomWidth: 1,
    // borderBottomColor: '#ccc',
    // paddingVertical: 10,
    alignItems: 'center',
    // backgroundColor: '#666',
    width: "100%"
  },
  cell: {
    fontSize: 14,
    // flex: 1,
    textAlign: 'center',
    // paddingHorizontal: 5,
  },
  editCell: {
    fontSize: 14,
    // flex: 1,
    textAlign: 'center',
    // paddingHorizontal: 5,
    // borderBottomWidth: 1,
    // borderBottomColor: '#aaa',
    // paddingVertical: 2,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 2,
    borderRadius: 5,
    width: 100,
  },
  editDescriptionContainer: {
    fontSize: 14,
    // flex: 1,
    paddingHorizontal: 5,
    paddingVertical: 2,
    width: 200
  },
  editText: {
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  actionContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
  },
  action: {
    width: 100,
  },
  number: {
    width: 50,
    // backgroundColor: '#666',
  },
  description: {
    width: 200,
  },
  uom: {
    width: 150,
    // backgroundColor: '#666',
  },
  qty: {
    width: 100,
  },
  currency: {
    width: 100,
  },
  unitPrice: {
    width: 100,
  },
  totalValue: {
    width: 100,
  },
  isReimbursement: {
    width: 150,
    // backgroundColor: '#666',
  },
  reasonOfRejection: {
    width: 100,
  },
  comment: {
    width: 100,
  },
  card: {
    borderRadius: 10,
    width: "100%",
    alignSelf: "center",
    backgroundColor: "#F8F9FE", // White background
    padding: 16, // Padding inside the card
    marginBottom: 16, // Margin between cards
    elevation: 1, // For Android shadow
    shadowColor: "#000", // For iOS shadow
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    alignItems: "flex-start", // Vertically center items
  },
  label: {
    color: "#494A50",
    width: "40%",
    fontWeight: "800",
    fontSize: 14,
  },
  colon: {
    color: "#494A50",
    fontWeight: "800",
    fontSize: 16,
    marginRight: 5,
  },
  value: {
    // flex: 1,
    // backgroundColor: 'red',
    maxWidth: "60%",
    color: "#494A50",
    fontSize: 16,
  },
  statusContainer: {
    alignItems: "center",
    marginVertical: 5,
  },
  statusButton: {
    padding: 8,
    borderRadius: 12,
    minWidth: 100,
    alignItems: "center",
  },
  review: {
    backgroundColor: "#2196F3",
  },
  approved: {
    backgroundColor: "#4CAF50",
  },
  statusText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    // backgroundColor: 'yellow',
    width: '100%',
    paddingHorizontal: 40
  },
  approvalButton: {
    padding: 'auto',
    borderRadius: 30,
    // flex: 1,
    marginHorizontal: 5,
    alignItems: "center",
    justifyContent: 'center',
    height: 30,
    width: 100,
  },
  approveButton: {
    backgroundColor: "#007E7A",
  },
  rejectButton: {
    backgroundColor: "#E53935",
  },
  buttonText: {
    color: "#EAF2FF",
    fontWeight: "700",
    fontSize: 14,
  },
  itemDetailContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 10,
    alignItems: "center",
  },
});

export default DetailTable;