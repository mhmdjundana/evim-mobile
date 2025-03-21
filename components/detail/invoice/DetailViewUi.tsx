import { RefreshControl, ScrollView, View } from "react-native"
import HeaderDetail from "../DetailHeader"
import DocumentDetail from "./DocumentDetail"
import DocumentDetailInvoiceFile from "./DocumentDetailFile"
import DetailTable from "./DetailTable"
import PaymentSummary from "./PaymentSummary"
import TaxSimulation from "./TaxSimulation"
import ApprovalActionInvoice from "../ApprovalActionInvoice"
import DetailHistoryNew from "../DetailHistoryNew"
import { router } from "expo-router"
import { Text } from "react-native"
import { DownloadExpenditureButton } from "./DownloadExpenditureButton"
import TaxFakturCard from "./TaxFaktur"

export default function DetailViewUi({
  data,
  historyData,
  isLoading,
  id,
  headerTitle,
  pathname,
  isApprove,
  isReject,
  onApprove,
  onReject
}: any) {
  return (
    <ScrollView
      style={{
        backgroundColor: "#fff",
        padding: 0,
        margin: 0,
        width: "100%",
      }}
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        maxWidth: '100%'
      }}
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={() => {
            router.replace({
              pathname,
              params: { id }
            })
          }}
        />
      }
    >
      <HeaderDetail
        title={headerTitle}
        status={data?.approval_status?.status_name}
        statusColor={data?.approval_status?.status_color}
      />
      <View style={{ marginTop: 15 }}></View>
      <DocumentDetail data={data} />
      <View style={{ marginTop: 10 }}></View>
      <DocumentDetailInvoiceFile data={data} />
      <View style={{ marginTop: 25 }}></View>
      <DetailTable
        data={data}
      />
      <PaymentSummary data={data} />
      <TaxSimulation data={data} />
      <DownloadExpenditureButton id={id} />
      <TaxFakturCard data={data} id={id} />
      {/* <ApprovalActionInvoice data={data} id={id} router={router} /> */}
      <ApprovalActionInvoice
        isApprove={isApprove}
        isReject={isReject}
        onApprove={onApprove}
        onReject={onReject}
      />
      <DetailHistoryNew data={historyData} />
      <View style={{ marginTop: 15 }}></View>
    </ScrollView >
  )
}