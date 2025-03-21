import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import DetailViewUi from "./DetailViewUi";
import { getPcardById } from "@/fetch/pcard";

export default function Detail() {
  const { id } = useLocalSearchParams()
  console.log("pcard id: ", id)

  const [data, setData] = useState<any>([]);
  const [bastData, setBastData] = useState<any>([])
  const [historyData, setHistoryData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<any>(false);
  
  const pathname = "/pcard/detail",
    module = 'pcard',
    module_id = 14
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
    getPcardById({ setData, id })
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
      headerTitle="P-Card Settlement Detail"
      pathname={pathname}
      isApprove={bastData?.action?.is_approve}
      isReject={bastData?.action?.is_reject}
      onApprove={onApprove}
      onReject={onReject}
    />
  );
}
