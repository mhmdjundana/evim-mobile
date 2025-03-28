import { useEffect, useState } from "react";
import { Text, View, StyleSheet, ScrollView, RefreshControl } from "react-native";
import HeaderDetail from "../DetailHeader";
import DocumentDetail from "./DocumentDetail";
import { mockData, mockHistory } from "../BastDetailMockData"
import { router, useLocalSearchParams } from "expo-router";
import api from "@/fetch/axios";
import { getBastById } from "@/fetch/bast";
import { retrieveUserData } from "@/fetch/auth";
import DocumentDetailFiles from "./DocumentDetailFiles";
import DetailTable from "./DetailTable";
import ApprovalAction from "../ApprovalAction";
import DetailHistoryNew from "../DetailHistoryNew";

export default function BastDetailNew() {
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
  console.log(data, "Data bast view")
  const [bastData, setBastData] = useState<any>([])
  // console.log(bastData?.details, "bastData")
  const [historyData, setHistoryData] = useState<any>([]);
  const [isApproveItems, setIsApproveItems] = useState<any>(false);
  const [isLoading, setIsLoading] = useState<any>(false);

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
    <ScrollView
      style={{
        // flex: 1,
        // justifyContent: "flex-start",
        // alignItems: "center",
        backgroundColor: "#fff",
        padding: 0,
        margin: 0,
        width: "100%",
      }}
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        maxWidth: '100%',
      }}
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={() => {
            router.replace({
              pathname: '/bast/detail',
              params: { id }
            })
          }}
        />
      }
    >
      <HeaderDetail title="BAST Detail" status={bastData?.approval_status?.status_name} statusColor={bastData?.approval_status?.status_color} />
      {/* <Text>{bastData?.id}</Text> */}
      <View style={{ marginTop: 15 }}></View>
      <DocumentDetail data={bastData} />
      <View style={{ marginTop: 10 }}></View>
      <DocumentDetailFiles data={bastData} />
      <View style={{ marginTop: 25 }}></View>
      <DetailTable
        data={bastData}
        setData={setBastData}
        setIsApproveItems={setIsApproveItems}
      />
      <ApprovalAction
        bastData={bastData}
        id={id}
        userData={userData}
        router={router}
        isApproveItems={isApproveItems}
      />
      <DetailHistoryNew data={historyData} />
      <View style={{ marginTop: 60 }}>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  logoTitleContainer: { display: "flex", justifyContent: "center", alignItems: "center" },
  logoTitleText: { fontSize: 15, fontWeight: "500", textAlign: "center", color: "#404040" },
});