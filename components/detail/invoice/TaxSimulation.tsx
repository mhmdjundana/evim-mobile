import { displayPrice, displayStringArray } from '@/utils/utils';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TaxSimulation = ({ data }: any) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>TAX SIMULATION</Text>
      </View>

      <View style={styles.container2}>
        {/* DPP Section */}
        <View style={styles.card}>
          <View style={styles.titleRow}>
            <Text style={styles.sectionTitle}>DPP</Text>
            <Text style={styles.amount}>{data?.contract?.currency} {displayPrice(data?.grand_total)}</Text>
          </View>

          <View style={styles.row}>
            {
              data?.gl_no &&
              <Text style={styles.label}>GL No.</Text>
            }
            {
              data?.wbs_no ?
                <Text style={styles.label}>WBS No.</Text>
                : data?.coscenter_no ? <Text style={styles.label}>Cost Center No.</Text> : null
            }
          </View>

          <View style={styles.row}>
            {
              data?.gl_no &&
              <Text style={styles.value}>{displayStringArray(data?.gl_no)}</Text>
            }
            {
              data?.wbs_no ?
                <Text style={styles.value2}>{displayStringArray(data?.wbs_no)}</Text>
                : data?.coscenter_no ? <Text style={styles.value}>{displayStringArray(data?.coscenter_no)}</Text> : null
            }
          </View>

          <View style={styles.row}>
            {
              data?.gl &&
              <Text style={styles.description}>{data?.gl?.reduce((acc: any, item: any, index: any) => acc + item?.gl_account + (index < data?.gl?.length - 1 ? ', ' : ''), '')}</Text>
            }
            {
              data?.wbs?.length ?
                <Text style={styles.description2}>{data?.wbs?.reduce((acc: any, item: any, index: any) => acc + item?.wbs_name + (index < data?.wbs?.length - 1 ? ', ' : ''), '')}</Text>
                : data?.coscenter?.length ? <Text style={styles.description2}>{data?.coscenter?.reduce((acc: any, item: any, index: any) => acc + item?.coscenter_name + (index < data?.coscenter?.length - 1 ? ', ' : ''), '')}</Text> : null
            }
          </View>

          {/* <View style={styles.row}>
            <Text style={styles.longCode}>5000100004500010000450010000450001000004</Text>
            <Text style={styles.longCode2}>R001408.R001408.R001408.R001408.R001408</Text>
          </View>

          <View style={[styles.row]}>
            <Text style={[styles.description]}>Consultants/Management and something and</Text>
            <Text style={[styles.description2]}>Project Hu'u - Top WBS something something</Text>
          </View> */}
        </View>

        {/* VAT Section */}
        {
          data?.vat_amount && (
            <View style={styles.card}>
              <View style={styles.titleRow}>
                <Text style={styles.sectionTitle}>VAT</Text>
                <Text style={styles.amount}>{data?.contract?.currency} {displayPrice(data?.vat_amount)}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>GL No.</Text>
                <Text style={styles.percentage}>{data?.vat?.wht_rate} %</Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.value}>{data?.vat?.gl_account}</Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.description}>{data?.vat?.gl?.gl_name}</Text>
              </View>
            </View>
          )
        }

        {/* WHT Section */}
        {
          data?.wht_amount && (
            <View style={styles.card}>
              <View style={styles.titleRow}>
                <Text style={styles.sectionTitle}>WHT</Text>
                <Text style={styles.amount}>{data?.contract?.currency} {displayPrice(data?.wht_amount)}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>GL No.</Text>
                <Text style={styles.percentage}>{data?.wht?.wht_rate} %</Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.value}>{data?.wht?.gl_account}</Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.description}>{data?.wht?.gl?.gl_name}</Text>
              </View>
            </View>
          )
        }

        {/* Other Adjustment Section */}
        {
          data?.other_expense?.map((item: any, index: any) => {
            return (
              <View style={styles.card} key={index}>
                <View style={styles.titleRow}>
                  <Text style={styles.sectionTitle}>Other Adjustment</Text>
                  <Text style={styles.amount}>{data?.contract?.currency} {displayPrice(item?.amount)}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Debit / Credit</Text>
                  <Text style={styles.value2}>{item?.debit_or_credit === "D" ? "Debit" : "Credit"}</Text>
                </View>
                <View style={styles.row}>
                  {
                    item?.gl_no ? <Text style={styles.label}>GL No.</Text> : null
                  }
                  {
                    item?.wbs_no ?
                      <Text style={styles.label}>WBS No.</Text>
                      : item?.coscenter_no ? <Text style={styles.label}>Cost Center No.</Text> : null
                  }
                </View>
                <View style={styles.row}>
                  <Text style={styles.value}>{item?.gl_no}</Text>
                  {
                    item?.wbs_no ?
                      <Text style={styles.value2}>{item?.wbs_no}</Text>
                      : item?.coscenter_no ? <Text style={styles.value2}>{item?.coscenter_no}</Text> : null
                  }
                </View>
                <View style={styles.row}>
                  <Text style={styles.description}>{item?.gl?.gl_name}</Text>
                  {
                    item?.wbs_no ?
                      <Text style={styles.description2}>{item?.wbs?.wbs_name}</Text>
                      : item?.coscenter_no ? <Text style={styles.description2}>{item?.coscenter?.coscenter_name}</Text> : null
                  }
                </View>
              </View>
            )
          })
        }
        {/* <View style={styles.card}>
          <View style={styles.titleRow}>
            <Text style={styles.sectionTitle}>Other Adjustment</Text>
            <Text style={styles.amount}>USD 10,00</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>GL No.</Text>
            <Text style={styles.label}>WBS No.</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.value}>5000100004</Text>
            <Text style={styles.value2}>R001408</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.description}>Consultants/Manageme</Text>
            <Text style={styles.description2}>Project Hu'u - Top WBS</Text>
          </View>
        </View> */}

        {/* NET PAYMENT Section */}
        <View style={styles.totalCard}>
          <View style={styles.titleRow}>
            <Text style={styles.totalTitle}>NET PAYMENT</Text>
            <Text style={styles.totalAmount}>{data?.contract?.currency} {displayPrice(data?.net_payment)}</Text>
          </View>
        </View>
        {/* DIFFERENCE Section */}
        <View style={styles.totalCard}>
          <View style={styles.titleRow}>
            <Text style={styles.totalTitle}>DIFFERENCE</Text>
            <Text style={styles.totalAmount}>{
              displayPrice(
                (
                  parseFloat(data?.grand_total)
                  + parseFloat(data?.vat_amount || 0)
                  - parseFloat(data?.wht_amount || 0)
                  + data?.other_expense?.reduce((acc: any, item: any) => {
                    const amount = item?.debit_or_credit === "D" ? parseFloat(item?.amount) : -parseFloat(item?.amount)
                    return acc + amount
                  }, 0) - parseFloat(data?.net_payment)).toFixed(2))
            }</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    width: '100%',
  },
  container2: {
    flex: 1,
    backgroundColor: '#1E88E5',
    paddingBottom: 10,
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
  },
  header: {
    backgroundColor: '#1E88E5',
    paddingVertical: 12,
    alignItems: 'center',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: 'white',
    marginHorizontal: 10,
    marginTop: 10,
    borderRadius: 8,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  amount: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
    gap: 10,
  },
  label: {
    fontSize: 16,
    color: '#666',
    fontWeight: '700',
  },
  percentage: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  value: {
    fontSize: 16,
    color: '#333',
    flexWrap: 'wrap',
    flex: 1,
  },
  value2: {
    fontSize: 16,
    color: '#333',
    flexWrap: 'wrap',
    flex: 1,
    textAlign: 'right',
  },
  description: {
    fontSize: 16,
    color: '#444',
    flex: 1,
    flexWrap: 'wrap',
  },
  description2: {
    fontSize: 16,
    color: '#444',
    flex: 1,
    flexWrap: 'wrap',
    textAlign: 'right',
  },
  longCode: {
    fontSize: 16,
    color: '#333',
    flex: 1,
    flexWrap: 'wrap',
  },
  longCode2: {
    fontSize: 16,
    color: '#333',
    flex: 1,
    flexWrap: 'wrap',
    textAlign: 'right',
  },
  totalCard: {
    backgroundColor: 'white',
    marginHorizontal: 10,
    marginTop: 10,
    borderRadius: 8,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  totalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default TaxSimulation;