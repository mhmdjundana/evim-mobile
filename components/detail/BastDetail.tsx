import { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import HeaderDetail from "./DetailHeader";
import DetailLogo from "./DetailLogo";
import DetailTable from "./DetailTable";
import DetailHistory from "./DetailHistory";
import DocumentDetail from "./DocumentDetail";
import { mockData, mockHistory } from "./BastDetailMockData"
import { ActionButton } from "../button/ActionButton";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import api from "@/fetch/axios";
import { getBastById } from "@/fetch/bast";
import { retrieveUserData } from "@/fetch/auth";
import DocumentDetailBastSapEditFiles from "./DocumentDetailBastSapEditFiles";

export default function BastDetail() {
  // const navigation = useNavigation()
  const { id } = useLocalSearchParams()
  // console.log(navigation, "navigation")
  console.log(id, "id")
  const [userData, setUserData] = useState<any>([])
  // console.log(userData, "userData")
  // console.log(userData?.data?.id, "userData id")
  // console.log(userData?.data?.name, "userData name")
  // console.log(userData?.data?.modules, "modules permission")

  const logoTitle = (
    <View style={styles.logoTitleContainer}>
      <Text style={styles.logoTitleText}>BERITA ACARA SERAH TERIMA</Text>
      <Text style={styles.logoTitleText}>GOODS / SERVICES RECEIPT NOTE</Text>
    </View>
  )
  const [data, setData] = useState<any>([]);
  // console.log(data, "Data bast view")
  const [bastData, setBastData] = useState<any>([])
  console.log(bastData, "bastData")
  const [historyData, setHistoryData] = useState<any>([]);

  // const getDataById = async () => {
  //   const ids = id || 367
  //   const res = await api.get(`bast/show-list/${ids}`)
  //   // console.log(res.data.data, "data bast")
  //   setData(res.data.data)
  // }

  useEffect(() => {
    // getDataById()
    getBastById({ setData, id })
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
    <View style={{ backgroundColor: 'white' }}>
      <HeaderDetail title="BAST Detail" status={bastData?.approval_status?.status_name} statusColor={bastData?.approval_status?.status_color} />
      <Text>{bastData?.id}</Text>
      <View style={{ marginTop: 15 }}></View>
      <DetailLogo title={logoTitle} />
      <View style={{ marginTop: 10 }}></View>
      <DocumentDetail data={bastData} />
      <View style={{ marginTop: 10 }}></View>
      <DocumentDetailBastSapEditFiles data={bastData} />
      <View style={{ marginTop: 25 }}></View>
      <DetailTable data={bastData} permission={{
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
      {
        // true && (
        // (userData?.data?.modules?.Bast?.is_e === "1" ) && (
        (bastData?.action?.is_edit) && (
          <View style={{ marginVertical: 5, flexDirection: "row", justifyContent: "flex-end", width: "100%", }}>
            <ActionButton type="editAdminAp" onPress={() => router.push({ pathname: `/bast/form`, params: { id: id } })} />
          </View>
        )
      }
      {
        // true && (
        // false && (
        // (userData?.data?.modules?.Bast?.is_a === "1" ) && (
        (bastData?.action?.is_approve || bastData?.action?.is_reject) && (
          () => {
            const params = {
              id: id,
              // type: "approval",
              data: JSON.stringify([{
                // "bast_id": bastData?.id,
                "id": bastData?.id,
                // "approval_status_id": bastData?.approval_status?.id,
                "module_id": 1,
                // "user_id": userData?.data?.id,
                // "vendor_code": bastData?.vendor_code
              }]),
              module: "bast"
            }
            return (
              <View style={{ marginVertical: 5, flexDirection: "row", justifyContent: "flex-end", width: "100%", }}>
                {bastData?.action?.is_reject && <ActionButton
                  type="reject"
                  onPress={() => {
                    router.push({
                      pathname: `/confirmation`,
                      params: {
                        id: id,
                        // type: "approval",
                        data: JSON.stringify([{
                          // "bast_id": bastData?.id,
                          "id": bastData?.id,
                          // "approval_status_id": bastData?.approval_status?.id,
                          "module_id": 1,
                          type: "reject",
                          // "user_id": userData?.data?.id,
                          // "vendor_code": bastData?.vendor_code
                        }]),
                        module: "bast",
                        type: "rejection",
                      }
                    })
                  }}
                />}
                {bastData?.action?.is_approve && <ActionButton
                  type="approve"
                  onPress={() => {
                    router.push({
                      pathname: `/confirmation`,
                      params: {
                        id: id,
                        // type: "approval",
                        data: JSON.stringify([{
                          // "bast_id": bastData?.id,
                          "id": bastData?.id,
                          // "approval_status_id": bastData?.approval_status?.id,
                          "module_id": 1,
                          type: "approve",
                          // "user_id": userData?.data?.id,
                          // "vendor_code": bastData?.vendor_code
                        }]),
                        module: "bast",
                        type: "approval",
                      }
                    })
                  }}
                />
                }
              </View>
            )
          }
        )()
      }
      <DetailHistory data={historyData} />
      <View style={{ marginTop: 60 }}>
      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  logoTitleContainer: { display: "flex", justifyContent: "center", alignItems: "center" },
  logoTitleText: { fontSize: 15, fontWeight: "500", textAlign: "center", color: "#404040" },
});