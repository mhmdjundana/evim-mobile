export const handleApproveButton = ({ item, router }: any) => {
  console.log("approve")
  router.push({
    pathname: `/confirmation`,
    params: {
      id: item.id,
      type: "approval",
      data: JSON.stringify([{
        // "bast_id": item?.id,
        "id": item?.id,
        // "approval_status_id": item?.approval_status?.id,
        "module_id": 1,
        // "user_id": userData?.data?.id,
        // "vendor_code": item?.vendor_code,
        "type": "approve"
      }]),
      module: "bast"
    }
  })
}

export const handleRejectButton = ({ item, router }: any) => {
  console.log("reject")
  router.push({
    pathname: `/confirmation`,
    params: {
      id: item.id,
      type: "rejection",
      data: JSON.stringify([{
        // "bast_id": item?.id,
        "id": item?.id,
        // "approval_status_id": item?.approval_status?.id,
        "module_id": 1,
        // "user_id": userData?.data?.id,
        // "vendor_code": item?.vendor_code,
        "type": "reject",
      }]),
      module: "bast"
    }
  })
}