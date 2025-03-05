import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';

const { width } = Dimensions.get('window');

// const InvoiceDetails = () => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>All Document</Text>
//       <Text style={styles.fileName}>STMM_Rob_00065_USD_200.000.000.pdf</Text>

//       <View style={styles.row}>
//         <Text style={styles.label}>BAST No.</Text>
//         <Text style={styles.value}>00065</Text>
//       </View>

//       <View style={styles.row}>
//         <Text style={styles.label}>Posting Date</Text>
//         <Text style={styles.value}>2024-06-24</Text>
//       </View>

//       <View style={styles.row}>
//         <Text style={styles.label}>Goods or Services</Text>
//         <Text style={styles.value}>Mineral</Text>
//       </View>

//       <View style={styles.row}>
//         <Text style={styles.label}>Contract/BPO No.</Text>
//         <Text style={styles.value}>TEST-EMAIL-0001</Text>
//       </View>

//       <View style={styles.row}>
//         <Text style={styles.label}>SAP Contract</Text>
//         <Text style={styles.value}>12736498712340</Text>
//       </View>

//       <View style={styles.row}>
//         <Text style={styles.label}>Invoice Number</Text>
//         <Text style={styles.value}>15/12/2024/STM</Text>
//       </View>

//       <View style={styles.row}>
//         <Text style={styles.label}>Invoice Description</Text>
//         <Text style={styles.value}>*description</Text>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1, // Make the container take up full height
//     paddingHorizontal: 16, // Add horizontal padding for better spacing
//     width: width, // Set width to device width
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 8,
//   },
//   fileName: {
//     fontSize: 16,
//     marginBottom: 16,
//   },
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 8,
//   },
//   label: {
//     fontWeight: 'bold',
//   },
//   value: {
//     marginLeft: 8,
//   },
// });

// export default InvoiceDetails;

const DocumentDetail = (props: any) => {
  const { data } = props; // Destructure data from props

  const bastDetailData = [
    {
      title: "All Document",
      value: data?.doc_no ? data?.doc_no + ".pdf" : "-",
      col: 1,
    },
    {
      title: "BAST No.",
      value: data?.bast_no,
    },
    {
      title: "Posting Date",
      value: data?.posting_date,
    },
    {
      title: "Goods or Services",
      value: data?.good_or_services === '1' ? "Goods" : data?.good_or_services === '2' ? "Services" : "-",
    },
    {
      title: "Mineral or Geothermal",
      value: data?.company_sub_id === "1" ? "Mineral" : data?.company_sub_id === "2" ? "Geothermal" : "-",
    },
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
            <View style={styles.columnLeft}>
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
    // return data.map((item: any) => (
    //   <View style={styles.row}>
    //     <View style={styles.columnLeft}>
    //       <Text style={styles.label}>BAST No.</Text>
    //       <Text style={styles.value}>{item.bast_no}</Text>
    //     </View>
    //     <View style={styles.columnRight}>
    //       <Text style={styles.label}>Posting Date</Text>
    //       <Text style={styles.value}>{item.posting_date}</Text>
    //     </View>
    //   </View>
    // ));
  };

  const AA = loopData(bastDetailData)

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {
        AA.map((a: any) => a)
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

export default DocumentDetail;

{/* <View style={styles.columnLeft}>
          <Text style={styles.label}>Special Payment Number</Text>
          <Text style={styles.value}>{data.specialPaymentNumber}</Text>

          <Text style={styles.label}>Description</Text>
          <Text style={styles.value}>{data.description}</Text>

          <Text style={styles.label}>Mineral or Geothermal</Text>
          <Text style={styles.value}>{data.mineralOrGeothermal}</Text>

          <Text style={styles.label}>Vendor Detail</Text>
          <Text style={styles.value}>{data.vendorDetail}</Text>

          <Text style={styles.label}>Currency</Text>
          <Text style={styles.value}>{data.currency}</Text>

          <Text style={styles.label}>Vat Applicable</Text>
          <Text style={styles.value}>{data.vatApplicable}</Text>

          <Text style={styles.label}>Amount Of WHT</Text>
          <Text style={styles.value}>{data.amountOfWHT}</Text>

          <Text style={styles.label}>Net Payment</Text>
          <Text style={styles.value}>{data.netPayment}</Text>
        </View>

        <View style={styles.columnRight}>
          <Text style={styles.label}>SAP Company Number</Text>
          <Text style={styles.value}>{data.sapCompanyNumber}</Text>

          <Text style={styles.label}>Vendor Name</Text>
          <Text style={styles.value}>{data.vendorName}</Text>

          <Text style={styles.label}>Payment Amount</Text>
          <Text style={styles.value}>{data.paymentAmount}</Text>

          <Text style={styles.label}>Amount Of VAT</Text>
          <Text style={styles.value}>{data.amountOfVAT}</Text>

          <Text style={styles.label}>WHT</Text>
          <Text style={styles.value}>{data.wht}</Text>

          <Text style={styles.label}>Special Payment PDF</Text>
          <Text style={styles.link}>{data.specialPaymentPDF}</Text>

          <Text style={styles.label}>Reference Number</Text>
          <Text style={styles.value}>{data.referenceNumber}</Text>

          <Text style={styles.label}>Requested By</Text>
          <Text style={styles.value}>{data.requestedBy}</Text>
        </View> */}