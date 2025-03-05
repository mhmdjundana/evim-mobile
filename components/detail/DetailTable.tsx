import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Or your preferred icon library
import { RnPicker } from '../input/dropdown';

const { width } = Dimensions.get('window');

const DetailTable = ({ data, setData, style, uomList, permission }: any) => {
  // console.log(data)
  const { details } = data

  uomList = uomList?.map((item: any) => {
    return {
      ...item,
      label: item.uom_name,
      value: item.id
    }
  })

  // return (
  //   <></>
  // )
  return (
    <View style={[styles.container, style]}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={true}>
        <View>
          <View style={styles.header}>
            {/* <Text style={[styles.headerCell, styles.action]}>Action</Text> */}
            <Text style={[styles.headerCell, styles.number]}>#</Text>
            {
              permission.action &&
              <Text style={[styles.headerCell, styles.action]}>Action</Text>
            }
            <Text style={[styles.headerCell, styles.description]}>Description</Text>
            <Text style={[styles.headerCell, styles.uom]}>UOM</Text>
            <Text style={[styles.headerCell, styles.qty]}>QTY</Text>
            <Text style={[styles.headerCell, styles.currency]}>Currency</Text>
            <Text style={[styles.headerCell, styles.unitPrice]}>Unit Price</Text>
            <Text style={[styles.headerCell, styles.totalValue]}>Total Value</Text>
            <Text style={[styles.headerCell, styles.isReimbursement]}>Is Reimbursement</Text>
            {/* <Text style={[styles.headerCell, styles.reasonOfRejection]}>Reason of Rejection</Text> */}
            {/* <Text style={[styles.headerCell, styles.comment]}>Comment</Text> */}
          </View>
          {details?.map((item: any, idx: number) => (
            <View style={styles.row} key={item.id}>
              {/* <View style={[styles.actionContainer, styles.action]}>
                <Icon name="check" size={20} color="#228B22" />
                <Icon name="close" size={20} color="#DC143C" />
              </View> */}
              <Text style={[styles.cell, styles.number]}>{idx + 1}</Text>
              {
                permission.action && (
                  <View style={[styles.actionContainer]}>
                    <TouchableOpacity onPress={() => {
                      console.log("approve")
                    }}>
                      <Icon name="check" size={20} color="#228B22" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                      console.log("reject")
                    }}>
                      <Icon name="close" size={20} color="#DC143C" />
                    </TouchableOpacity>
                  </View>
                )
              }
              {
                permission.description ?
                  <View
                    style={[
                      styles.editDescriptionContainer,
                    ]}
                  >

                    <TextInput
                      style={[styles.editText]}
                      defaultValue={item.description}
                      onChangeText={(value: any) => {
                        setData((prev: any) => {
                          return {
                            ...prev,
                            details: prev.details?.map((item: any, i: number) => {
                              if (i === idx) {
                                return {
                                  ...item,
                                  description: value
                                }
                              } else {
                                return item
                              }
                            })
                          }
                        })
                      }}
                    />
                  </View>
                  :
                  <Text style={[styles.cell, styles.description]}>{item.description}</Text>
              }
              {
                permission.uom_name ?
                  <View style={[styles.uom]}>
                    <RnPicker
                      options={
                        //   [
                        //   { label: 'Unit', value: 'unit' },
                        //   { label: 'Month', value: 'month' },
                        //   { label: 'Hour', value: 'hour' },
                        //   { label: 'Day', value: 'day' },
                        // ]
                        uomList
                      }
                      value={item.uom?.id}
                      setValue={(value: any) => {
                        setData((prev: any) => {
                          return {
                            ...prev,
                            details: prev.details?.map((item: any, i: number) => {
                              if (i === idx) {
                                return {
                                  ...item,
                                  uom: uomList.find((item: any) => item.value === value)
                                }
                              } else {
                                return item
                              }
                            })
                          }
                        })
                      }}
                    />
                  </View>
                  // <TextInput style={[styles.editCell, styles.uom]} defaultValue={item.uom?.uom_name} />
                  :
                  <Text style={[styles.cell, styles.uom]}>{item.uom?.uom_name}</Text>
              }
              {/* <Text style={[styles.cell, styles.uom]}>{item.uom?.uom_name}</Text> */}
              <Text style={[styles.cell, styles.qty]}>{item.qty}</Text>
              <Text style={[styles.cell, styles.currency]}>{item.currency?.currency_code}</Text>
              <Text style={[styles.cell, styles.unitPrice]}>{item.unit_price}</Text>
              <Text style={[styles.cell, styles.totalValue]}>{item.total_value}</Text>
              {

                permission.is_reimbursement ?
                  <View style={[styles.isReimbursement]}>
                    <RnPicker
                      options={[
                        { label: 'Yes', value: '1' },
                        { label: 'No', value: '0' },
                      ]}
                      value={item.is_reimbursement}
                      setValue={(value: any) => {
                        setData((prev: any) => {
                          return {
                            ...prev,
                            details: prev.details?.map((item: any, i: number) => {
                              if (i === idx) {
                                return {
                                  ...item,
                                  is_reimbursement: value
                                }
                              } else {
                                return item
                              }
                            })
                          }
                        })
                      }}
                    />
                  </View>
                  :
                  <Text style={[styles.cell, styles.isReimbursement]}>{item.is_reimbursement === "0" ? 'No' : item.is_reimbursement === "1" ? 'Yes' : '-'}</Text>
              }
              {/* <Text style={[styles.cell, styles.reasonOfRejection]}>{item.reason}</Text> */}
              {/* <Text style={[styles.cell, styles.comment]}>{item.comment}</Text> */}
            </View>
          ))}
        </View>
      </ScrollView >
    </View >
  );
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
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
    alignItems: 'center',
    // backgroundColor: '#666',
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
});

export default DetailTable;