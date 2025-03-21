import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { getInvoiceById } from "@/fetch/invoice";
import DetailViewUi from "./DetailViewUi";

export default function Detail() {
  const { id } = useLocalSearchParams()
  console.log("invoice id: ", id)

  const [data, setData] = useState<any>([]);
  const [bastData, setBastData] = useState<any>([])
  const [historyData, setHistoryData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<any>(false);
  // console.log(data, "Data bast view")
  // console.log(bastData, "bastData")
  
  const pathname = "/invoice/detail",
    module = 'invoice',
    module_id = 2
  const onReject = () => {
    const payload: any = [{
      // "bast_id": data?.id,
      id,
      // "approval_status_id": data?.approval_status?.id,
      module_id,
      type: "reject",
      // "user_id": userData?.data?.id,
      // "vendor_code": data?.vendor_code
    }]
    // if (isApproveItems) {
    //   payload[0].item = data?.details?.map((item: any) => ({
    //     id: item?.id,
    //     checking_status: item?.checking_status
    //   }))
    // }
    router.push({
      pathname: `/confirmation`,
      params: {
        id: id,
        data: JSON.stringify(payload),
        module,
        type: "rejection",
        onSuccessNavigateTo: JSON.stringify({
          pathname: pathname,
          params: { id: id }
        })
      }
    })
  }
  const onApprove = () => {
    const payload: any = [{
      // "bast_id": data?.id,
      id,
      // "approval_status_id": data?.approval_status?.id,
      module_id,
      type: "approve",
      // "user_id": userData?.data?.id,
      // "vendor_code": data?.vendor_code
    }]
    // if (isApproveItems) {
    //   payload[0].item = data?.details?.map((item: any) => ({
    //     id: item?.id,
    //     checking_status: item?.checking_status
    //   }))
    // }
    router.push({
      pathname: `/confirmation`,
      params: {
        id: id,
        data: JSON.stringify(payload),
        module,
        type: "approval",
        onSuccessNavigateTo: JSON.stringify({
          pathname: pathname,
          params: { id: id }
        })
      }
    })
  }

  useEffect(() => {
    getInvoiceById({ setData, id })
  }, [])
  useEffect(() => {
    if (data?.data?.id) {
      setBastData(data?.data)
      setHistoryData(data?.history)
    }
  }, [data?.data?.id])

  return (
    <DetailViewUi
      data={bastData}
      historyData={historyData}
      isLoading={isLoading}
      id={id}
      headerTitle="Normal Receipt Detail"
      pathname={pathname}
      isApprove={bastData?.action?.is_approve}
      isReject={bastData?.action?.is_reject}
      onApprove={onApprove}
      onReject={onReject}
    />
  );
}
