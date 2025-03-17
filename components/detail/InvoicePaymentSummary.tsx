import { displayPrice } from '@/utils/utils';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const InvoicePaymentSummary = ({ data }: any) => {
  console.log(data, 'data')

  const [taxable, setTaxable] = useState(0)

  useEffect(() => {
    const taxable = data?.details?.reduce((a: any, b: any) => {
      if (b.is_reimbursement !== "1") {
        return a + parseFloat(b?.total_value);
      } else {
        return a + 0;
      }
    }, 0);
    setTaxable(taxable)
  }, [data?.details])

  return (
    <View style={styles.container}>
      {/* Subtotal */}
      <View style={styles.row}>
        <Text style={styles.label}>SUBTOTAL</Text>
        <Text style={styles.amount}>{data?.contract?.currency} {displayPrice(data?.grand_total)}</Text>
      </View>

      {/* VAT Amount */}
      {
        data?.vat_amount && (
          <View style={[styles.card, styles.cardMargin]}>
            <View style={styles.row}>
              <Text style={styles.label}>VAT Amount</Text>
              <Text style={styles.amount}>{data?.contract?.currency} {displayPrice(data?.vat_amount)}</Text>
            </View>
            <Text style={styles.subLabel}>({data?.vat?.wht_code}) {data?.vat?.wht_rate}</Text>
          </View>
        )
      }

      {/* WHT Amount */}
      {
        data?.wht_amount && (
          <View style={[styles.card, styles.cardMargin]}>
            <View style={styles.row}>
              <Text style={styles.label}>WHT Amount</Text>
              <Text style={styles.amount}>{data?.contract?.currency} {displayPrice(data?.wht_amount)}</Text>
            </View>
            <Text style={styles.subLabel}>({data?.wht?.wht_code}) {data?.wht?.wht_rate}</Text>
          </View>
        )
      }

      {/* BASE WHT */}
      <View style={[styles.card, styles.cardMargin]}>
        <View style={styles.row}>
          <Text style={styles.label}>BASE WHT</Text>
          <View style={styles.baseWhtContainer}>
            <Text style={styles.amount}>{displayPrice(taxable?.toFixed(2))}</Text>
            {data?.wht?.wht_rate && (
              <>
                <Text style={styles.multiplySign}>X</Text>
                <Text style={styles.amount}>{data?.wht?.wht_rate} %</Text>
              </>
            )}
          </View>
        </View>
      </View>

      {/* Other Adjustment 1 */}
      {
        data?.other_expense?.map((item: any) => (
          <View style={[styles.card, styles.cardMargin]}>
            <View style={styles.row}>
              <Text style={styles.label}>Other Adjustment</Text>
              <Text style={styles.amount}>{data?.contract?.currency} {displayPrice(item?.amount)}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.subLabel}>Description</Text>
              <Text style={styles.detailText}>{item?.expense_desc}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.subLabel}>Debit / Credit</Text>
              <Text style={styles.detailText}>{item?.debit_or_credit === "D" ? "Debit" : "Credit"}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.subLabel}>{item.gl_no}</Text>
              <Text style={styles.detailText}>{item.wbs_no ? item.wbs_no : item.coscenter_no ? item.coscenter_no : ""}</Text>
            </View>
          </View>
        ))
      }

      {/* Net Payment */}
      <View style={[styles.card, styles.cardMargin, styles.netPaymentCard]}>
        <View style={styles.row}>
          <Text style={styles.netPaymentLabel}>NET PAYMENT</Text>
          <Text style={styles.netPaymentAmount}>{data?.contract?.currency} {displayPrice(data?.net_payment)}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f5f5f5',
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  cardMargin: {
    marginTop: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  subLabel: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  amount: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  baseWhtContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  multiplySign: {
    fontSize: 14,
    color: '#333',
    marginHorizontal: 8,
  },
  detailText: {
    fontSize: 13,
    color: '#333',
    textAlign: 'right',
  },
  netPaymentCard: {
    backgroundColor: 'white',
  },
  netPaymentLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  netPaymentAmount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default InvoicePaymentSummary;