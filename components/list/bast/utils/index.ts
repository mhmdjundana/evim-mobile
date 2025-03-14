export const handleApproveButton = ({ item, router, listData, rowSelection }: any) => {
  console.log("approve")
  const obj: any = {
    pathname: `/confirmation`,
    params: {
      id: item.id,
      type: "approval",
      module: "bast"
    }
  }
  if (rowSelection.length) {
    const filteredData = listData
      .filter((data: any) => rowSelection.includes(data.id))
    const dataApproval = filteredData
      .map((data: any) => ({
        // "bast_id": data?.id,
        "id": data?.id,
        // "approval_status_id": data?.approval_status?.id,
        "module_id": 1,
        // "user_id": userData?.data?.id,
        // "vendor_code": data?.vendor_code,
        "type": "approve",
      }));
      const listDataMap = filteredData.map((item: any) => {
        return {
          bast_no: item.bast_no,
          contract_no: item.contract_no,
          po_no: item.po_no,
          vendor_name: item.vendor_name,
          grand_total: item.grand_total,
          id: item.id
        };
      })
    obj.params.data = JSON.stringify(dataApproval);
    obj.params.listData = JSON.stringify(listDataMap);
  } else {
    obj.params.data = JSON.stringify([{
      // "bast_id": item?.id,
      "id": item?.id,
      // "approval_status_id": item?.approval_status?.id,
      "module_id": 1,
      // "user_id": userData?.data?.id,
      // "vendor_code": item?.vendor_code,
      "type": "approve",
    }]);
  }
  router.push(obj)
}

export const handleRejectButton = ({ item, router, listData, rowSelection }: any) => {
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