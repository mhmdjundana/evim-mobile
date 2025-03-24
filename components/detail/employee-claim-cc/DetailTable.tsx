import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { bastDetailItemDataKeys } from '../data/bastDetailData';
// import detail from '@/app/bast/detail';
// import { RnPicker } from '../../input/dropdown';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Or your preferred icon library
// import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import { displayPrice } from '@/utils/utils';
import { FontAwesome6 } from '@expo/vector-icons';
import { downloadFile } from '../utils/downloadFile';

const { width } = Dimensions.get('window');

const DetailTable = ({
  data,
}: any) => {
  const { claim_details } = data
  // console.log(claim_details, 'DetailTable data')
  const [details2, setDetails2] = useState([])

  useEffect(() => {
    const d: any = []
    if (claim_details?.length) {
      for (let i = 0; i < claim_details.length; i++) {
        const e = JSON.parse(JSON.stringify(bastDetailItemDataKeys))
        for (let j = 0; j < e.length; j++) {
          e[j].value = claim_details[i]?.[e[j].name]
        }
        // console.log(e)
        d.push(e)
      }
      setDetails2(d)
    }
  }, [
    claim_details,
  ])

  return (
    <View style={[{
      // backgroundColor: 'yellow',
      paddingHorizontal: 16,
      width: '100%'
    }]}>
      {
        claim_details?.map((item: any, idx: number) => {
          return (
            <View style={styles.card} key={idx}>
              <View style={styles.row}>
                <Text style={styles.label}>Date</Text>
                <Text style={styles.colon}>:</Text>
                <Text style={styles.value}>{item.date_detail}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Type of Expense</Text>
                <Text style={styles.colon}>:</Text>
                <Text style={styles.value}>{item.typeofexpense?.type_code}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Detail Expenditure</Text>
                <Text style={styles.colon}>:</Text>
                <Text style={styles.value}>{item.justification}</Text>
              </View>
              {item.wbs && <View style={styles.row}>
                <Text style={styles.label}>WBS (STM)</Text>
                <Text style={styles.colon}>:</Text>
                <Text style={styles.value}>{item.wbs && `${item.wbs.wbs_code} - ${item.wbs.wbs_name}`}</Text>
              </View>}
              {item.costcenter && <View style={styles.row}>
                <Text style={styles.label}>Cost Center (VEI)</Text>
                <Text style={styles.colon}>:</Text>
                <Text style={styles.value}>{item.costcenter && `${item.costcenter.code} - ${item.costcenter.name}`}</Text>
              </View>}
              <View style={[styles.row]}>
                <Text style={styles.label}>Cost Element</Text>
                <Text style={styles.colon}>:</Text>
                <Text style={styles.value}>{item.costelement ? `${item.costelement.gl_code} - ${item.costelement.gl_name}` : '-'}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Currency</Text>
                <Text style={styles.colon}>:</Text>
                <Text style={styles.value}>{item.currency_id}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Amount</Text>
                <Text style={styles.colon}>:</Text>
                <Text style={styles.value}>{item.amount}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Currency Rate</Text>
                <Text style={styles.colon}>:</Text>
                <Text style={styles.value}>{item.currency_rate}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Amount in IDR</Text>
                <Text style={styles.colon}>:</Text>
                <Text style={styles.value}>{item.amount_idr}</Text>
              </View>
              {item.reject_reason && <View style={styles.row}>
                <Text style={styles.label}>Reason of Rejection</Text>
                <Text style={styles.colon}>:</Text>
                <Text style={styles.value}>{item.reject_reason}</Text>
              </View>}
              <View style={styles.row}>
                <Text style={styles.label}>Missing Receipt</Text>
                <Text style={styles.colon}>:</Text>
                <Text style={styles.value}>{item.missing_receipts === "1" ? 'Yes' : item.missing_receipts === "0" ? 'No' : '-'}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>File</Text>
                <Text style={styles.colon}>:</Text>
                <TouchableOpacity onPress={() => {
                  if (item.attachFile) {
                    // download attachFile
                    downloadFile({
                      setDownloading: () => { },
                      id: data?.id,
                      value: item.attachFile,
                      name: item.attachFile,
                      module: 'employee-claim-cc'
                    })
                  }
                }}>
                  <Text style={styles.valueFile}>{item.attachFile ? "Receipt.pdf" : "-"}</Text>
                </TouchableOpacity>
              </View>
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
                        // setData((prev: any) => {
                        //   return {
                        //     ...prev,
                        //     details: prev.details?.map((item: any, i: number) => {
                        //       if (i === idx) {
                        //         return {
                        //           ...item,
                        //           checking_status: '1'
                        //         }
                        //       } else {
                        //         return item
                        //       }
                        //     })
                        //   }
                        // })
                        // setIsApproveItems(true)
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
                        // setData((prev: any) => {
                        //   return {
                        //     ...prev,
                        //     details: prev.details?.map((item: any, i: number) => {
                        //       if (i === idx) {
                        //         return {
                        //           ...item,
                        //           checking_status: '2'
                        //         }
                        //       } else {
                        //         return item
                        //       }
                        //     })
                        //   }
                        // })
                        // setIsApproveItems(true)
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
    alignItems: 'flex-start',
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
    maxWidth: "60%",
    color: "#494A50",
    fontSize: 16,
  },
  valueFile: {
    // flex: 1,
    maxWidth: "100%",
    color: "blue",
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