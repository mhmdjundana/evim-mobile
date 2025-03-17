import { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import HeaderDetail from "./DetailHeader";
import DetailLogo from "./DetailLogo";
import DetailTable from "./DetailTable";
import DocumentDetail from "./DocumentDetail";
import { mockData, mockHistory } from "./BastDetailMockData"
import { ActionButton } from "../button/ActionButton";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import api from "@/fetch/axios";
import { getBastById } from "@/fetch/bast";
import { retrieveUserData } from "@/fetch/auth";
import DocumentDetailBastSapEditFiles from "./DocumentDetailBastSapEditFiles";
import DocumentDetailNew from "./DocumentDetailnew";
import DocumentDetailBastSapEditFilesNew from "./DocumentDetailBastSapEditFilesNew";
import DetailTableNew from "./DetailTableNew";
import ApprovalAction from "./ApprovalAction";
import DetailHistory from "./DetailHistory";
import DetailHistoryNew from "./DetailHistoryNew";
import { getInvoiceById } from "@/fetch/invoice";
import DocumentDetailInvoice from "./DocumentDetailInvoice";
import DocumentDetailInvoiceFile from "./DocumentDetailInvoiceFile";
import DetailTableInvoice from "./DetailTableInvoice";
import InvoicePaymentSummary from "./InvoicePaymentSummary";
import InvoiceTaxSimulation from "./InvoiceTaxSimulation";

export default function DetailInvoiceNew() {
  // const navigation = useNavigation()
  const { id } = useLocalSearchParams()
  // console.log(navigation, "navigation")
  console.log(id, "id")
  const [userData, setUserData] = useState<any>([])
  // console.log(userData, "userData")
  // console.log(userData?.data?.id, "userData id")
  // console.log(userData?.data?.name, "userData name")
  // console.log(userData?.data?.modules, "modules permission")

  const [data, setData] = useState<any>([]);
  // console.log(data, "Data bast view")
  const [bastData, setBastData] = useState<any>([])
  // console.log(bastData, "bastData")
  const [historyData, setHistoryData] = useState<any>([]);

  // const getDataById = async () => {
  //   const ids = id || 367
  //   const res = await api.get(`bast/show-list/${ids}`)
  //   // console.log(res.data.data, "data bast")
  //   setData(res.data.data)
  // }

  useEffect(() => {
    // getDataById()
    getInvoiceById({ setData, id })
    retrieveUserData().then((res: any) => {
      // console.log(res?.modules, "res user data")
      setUserData(res)
    })
  }, [])
  useEffect(() => {
    if (data?.data?.id) {
      setBastData(data?.data)
      setHistoryData(data?.history)
    }
  }, [data?.data?.id])

  return (
    <View style={{
      backgroundColor: 'white',
      maxWidth: "100%",
    }}>
      <HeaderDetail
        title="Normal Receipt Detail"
        status={bastData?.approval_status?.status_name}
        statusColor={bastData?.approval_status?.status_color}
      />
      <Text>{bastData?.id}</Text>
      <View style={{ marginTop: 15 }}></View>
      <DocumentDetailInvoice data={bastData} />
      <View style={{ marginTop: 10 }}></View>
      <DocumentDetailInvoiceFile data={bastData} />
      <View style={{ marginTop: 25 }}></View>
      <DetailTableInvoice data={bastData} permission={{
        description: false,
        uom_name: false,
        qty: false,
        currency_code: false,
        unit_price: false,
        total_value: false,
        is_reimbursement: false,
        reason: false,
        comment: false,
        // action: true,
      }} />
      <InvoicePaymentSummary data={bastData} />
      <InvoiceTaxSimulation data={bastData} />
      <ApprovalAction bastData={bastData} id={id} userData={userData} router={router} />
      <DetailHistoryNew data={historyData} />
      <View style={{ marginTop: 60 }}>
      </View>
    </View >
  );
}
