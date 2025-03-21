import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import DetailViewUi from "./DetailViewUi";
import { getCorporateIntegrityById } from "@/fetch/corporate-integrity";

export default function Detail() {
  const { id } = useLocalSearchParams()
  console.log("corporate-integrity id: ", id)

  const [data, setData] = useState<any>([]);
  const [bastData, setBastData] = useState<any>([])
  const [historyData, setHistoryData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<any>(false);
  
  const pathname = "/corporate-integrity/detail",
    module = 'corporate-integrity',
    module_id = 13
  const onReject = () => {
    const payload: any = [{
      id,
      module_id,
      type: "reject",
    }]
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
      id,
      module_id,
      type: "approve",
    }]
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
    getCorporateIntegrityById({ setData, id })
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
      headerTitle="Corporate Integrity Detail"
      pathname={pathname}
      isApprove={bastData?.action?.is_approve}
      isReject={bastData?.action?.is_reject}
      onApprove={onApprove}
      onReject={onReject}
    />
  );
}
