const getModuleId = (module: string) => {
  switch (module) {
    case "bast":
      return 1;
    case "invoice":
      return 2;
    case "special-payment":
      return 3;
    case "employee-claim-cc":
      return 10;
    case "corporate-integrity":
      return 13;
    case "pcard":
      return 14;
    default:
      return null;
  }
}
const createInfoData = (module: string, data: any) => {
  if (module === "bast") {
    return {
      bast_no: data.bast_no,
      contract_no: data.contract_no,
      po_no: data.po_no,
      vendor_name: data.vendor_name,
      grand_total: data.grand_total,
      id: data.id
    }
  }
  if (module === "invoice") {
    return {
      invoice_number: data.invoice_number,
      contract_no: data.contract_no,
      po_no: data.po_no,
      vendor_name: data.suplier_name,
      grand_total: data.grand_total,
      id: data.id
    }
  }
  return {
    bast_no: data.bast_no,
    contract_no: data.contract_no,
    po_no: data.po_no,
    vendor_name: data.vendor_name,
    grand_total: data.grand_total,
    id: data.id
  }
}

export const handleApproveButton = ({
  item,
  router,
  listData,
  rowSelection,
  onSuccessNavigateTo,
  module,
}: any) => {
  console.log("approve")
  console.log(listData, 'listData')
  const obj: any = {
    pathname: `/confirmation`,
    params: {
      id: item.id,
      type: "approval",
      module,
      onSuccessNavigateTo: onSuccessNavigateTo
    }
  }
  const module_id = getModuleId(module)
  if (rowSelection.length) {
    const filteredData = listData
      .filter((data: any) => rowSelection.includes(data.id))
    const dataApproval = filteredData
      .map((data: any) => ({
        "id": data?.id,
        module_id,
        "type": "approve",
      }));
    const listDataMap = filteredData.map((item: any) => {
      return createInfoData(module, item)
    })
    obj.params.data = JSON.stringify(dataApproval);
    obj.params.listData = JSON.stringify(listDataMap);
  } else {
    obj.params.data = JSON.stringify([{
      // "bast_id": item?.id,
      "id": item?.id,
      // "approval_status_id": item?.approval_status?.id,
      module_id,
      // "user_id": userData?.data?.id,
      // "vendor_code": item?.vendor_code,
      "type": "approve",
    }]);
  }
  router.push(obj)
}

export const handleRejectButton = ({
  item,
  router,
  module,
  onSuccessNavigateTo
}: any) => {
  console.log("reject")
  const module_id = getModuleId(module)
  router.push({
    pathname: `/confirmation`,
    params: {
      id: item.id,
      type: "rejection",
      data: JSON.stringify([{
        "id": item?.id,
        module_id,
        "type": "reject",
      }]),
      module,
      onSuccessNavigateTo: onSuccessNavigateTo
    }
  })
}