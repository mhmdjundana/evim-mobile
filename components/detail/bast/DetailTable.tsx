import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { RnPicker } from '../../input/dropdown';
import { bastDetailItemDataKeys } from '../data/bastDetailData';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Or your preferred icon library
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import { displayPrice } from '@/utils/utils';

const { width } = Dimensions.get('window');

const DetailTable = ({
  data,
  setData,
  style,
  permission,
  setIsApproveItems
}: any) => {
  // console.log(data, 'DetailTable data')
  const { details } = data
  const [details2, setDetails2] = useState([])
  // const [uomList2, setUomList2] = useState([])

  useEffect(() => {
    const d: any = []
    if (details?.length) {
      for (let i = 0; i < details.length; i++) {
        const e = JSON.parse(JSON.stringify(bastDetailItemDataKeys))
        for (let j = 0; j < e.length; j++) {
          e[j].value = details[i]?.[e[j].name]
        }
        // console.log(e)
        d.push(e)
      }
      setDetails2(d)
    }
    // setUomList2(uomList?.map((item: any) => {
    //   return {
    //     ...item,
    //     label: item.uom_name,
    //     value: item.id
    //   }
    // }))
  }, [
    details,
    // uomList
  ])

  // return (
  //   <></>
  // )
  return (
    <>
      <View style={{
        // backgroundColor: 'yellow',
        paddingHorizontal: 16,
        width: '100%',
        marginBottom: 5,
        marginLeft: 5,
      }}>
        <Text style={{
          fontSize: 16,
          fontWeight: 'bold',
          color: '#404040',
        }}>Item List</Text>
      </View>
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
                {item.reason_of_rejection && <View style={styles.row}>
                  <Text style={styles.label}>Reason of Rejection</Text>
                  <Text style={styles.colon}>:</Text>
                  <Text style={styles.value}> {item.reason_of_rejection}</Text>
                </View>}
                {item.comment && <View style={styles.row}>
                  <Text style={styles.label}>Comment</Text>
                  <Text style={styles.colon}>:</Text>
                  <Text style={styles.value}> {item.comment}</Text>
                </View>}
                {
                  ((data?.action?.is_approve || data?.action?.is_reject) && data?.action?.is_approve_item) &&
                  <View style={styles.buttonContainer}>
                    {
                      data?.action?.is_approve &&
                      <TouchableOpacity
                        style={[
                          styles.approveButton,
                          styles.approvalButton,
                          {
                            // opacity: item?.checking_status === '1' ? 0.5 : 1,
                            backgroundColor: item?.checking_status === '1' ? '#007E7A' : 'white',
                            borderColor: '#007E7A',
                            borderWidth: 3
                          }]}
                        onPress={() => {
                          console.log("approve")
                          setData((prev: any) => {
                            return {
                              ...prev,
                              details: prev.details?.map((item: any, i: number) => {
                                if (i === idx) {
                                  return {
                                    ...item,
                                    checking_status: '1'
                                  }
                                } else {
                                  return item
                                }
                              })
                            }
                          })
                          setIsApproveItems(true)
                        }}
                        disabled={item?.checking_status === '1'}
                      >
                        <FontAwesome6
                          name="check"
                          size={24}
                          color={item?.checking_status === '1' ? 'white' : '#007E7A'}
                        />
                      </TouchableOpacity>
                    }
                    {
                      data?.action?.is_reject &&
                      <TouchableOpacity
                        style={[
                          styles.rejectButton,
                          styles.approvalButton,
                          {
                            // opacity: item?.checking_status === '2' ? 0.5 : 1,
                            backgroundColor: item?.checking_status === '2' ? '#E53935' : 'white',
                            borderColor: '#E53935',
                            borderWidth: 3
                          }]}
                        onPress={() => {
                          console.log("reject")
                          setData((prev: any) => {
                            return {
                              ...prev,
                              details: prev.details?.map((item: any, i: number) => {
                                if (i === idx) {
                                  return {
                                    ...item,
                                    checking_status: '2'
                                  }
                                } else {
                                  return item
                                }
                              })
                            }
                          })
                          setIsApproveItems(true)
                        }}
                        disabled={item?.checking_status === '2'}
                      >
                        <FontAwesome6
                          name="xmark"
                          size={24}
                          color={item?.checking_status === '2' ? 'white' : '#E53935'}
                        />
                      </TouchableOpacity>
                    }
                  </View>
                }
              </View>
            )
          })
        }
      </View>
    </>
  )
  return (
    <View style={[styles.container, style]}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={true}>
        <View>
          <View style={styles.header}>
            {/* <Text style={[styles.headerCell, styles.action]}>Action</Text> */}
            <Text style={[styles.headerCell, styles.number]}>#</Text>
            {
              (data?.action?.is_approve || data?.action?.is_reject) &&
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
                (data?.action?.is_approve || data?.action?.is_reject) && (
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
                // permission.uom_name ?
                //   <View style={[styles.uom]}>
                //     <RnPicker
                //       options={
                //         //   [
                //         //   { label: 'Unit', value: 'unit' },
                //         //   { label: 'Month', value: 'month' },
                //         //   { label: 'Hour', value: 'hour' },
                //         //   { label: 'Day', value: 'day' },
                //         // ]
                //         uomList2
                //       }
                //       value={item.uom?.id}
                //       setValue={(value: any) => {
                //         setData((prev: any) => {
                //           return {
                //             ...prev,
                //             details: prev.details?.map((item: any, i: number) => {
                //               if (i === idx) {
                //                 return {
                //                   ...item,
                //                   uom: uomList2.find((item: any) => item.value === value)
                //                 }
                //               } else {
                //                 return item
                //               }
                //             })
                //           }
                //         })
                //       }}
                //     />
                //   </View>
                //   // <TextInput style={[styles.editCell, styles.uom]} defaultValue={item.uom?.uom_name} />
                //   :
                //   <Text style={[styles.cell, styles.uom]}>{item.uom?.uom_name}</Text>
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