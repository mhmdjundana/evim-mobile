import { Text, View } from "react-native"
import { ActionButton } from "../button/ActionButton"
import { usePathname, useLocalSearchParams } from "expo-router";

export default function ApprovalActionInvoice({
  data,
  id,
  router,
  isApproveItems,
  isEdit = false, // (data?.action?.is_edit)
  
  isApprove = false, // (data?.action?.is_approve
  // (data?.action?.is_approve && !data?.details.some((item: any) => item?.checking_status === '2')) 
  isReject = false, // (data?.action?.is_reject)
  onReject = () => { },
  onApprove = () => { },
}: any) {
  const pathname = usePathname();
  // console.log(pathname, "pathname")
  // console.log(params, "params")
  return (
    <View
      style={{
        marginVertical: 5,
        flexDirection: "row",
        justifyContent: "flex-end",
        width: "100%",
      }}
    >
      {
        // isEdit && (
        //   <View style={{ marginVertical: 5, flexDirection: "row", justifyContent: "flex-end", width: "100%", }}>
        //     <ActionButton
        //       type="editAdminAp" onPress={() => router.push({ pathname: `/bast/form`, params: { id: id } })} />
        //   </View>
        // )
      }
      {
        isReject &&
        <ActionButton
          type="reject"
          onPress={onReject}
        // onPress={() => {
        //   const payload: any = [{
        //     // "bast_id": data?.id,
        //     "id": data?.id,
        //     // "approval_status_id": data?.approval_status?.id,
        //     "module_id": 1,
        //     type: "reject",
        //     // "user_id": userData?.data?.id,
        //     // "vendor_code": data?.vendor_code
        //   }]
        //   if (isApproveItems) {
        //     payload[0].item = data?.details?.map((item: any) => ({
        //       id: item?.id,
        //       checking_status: item?.checking_status
        //     }))
        //   }
        //   router.push({
        //     pathname: `/confirmation`,
        //     params: {
        //       id: id,
        //       data: JSON.stringify(payload),
        //       module: "bast",
        //       type: "rejection",
        //       onSuccessNavigateTo: JSON.stringify({
        //         pathname: pathname,
        //         params: { id: id }
        //       })
        //     }
        //   })
        // }}
        />
      }
      {isApprove && <ActionButton
        type="approve"
        onPress={onApprove}
      // onPress={() => {
      //   const payload: any = [{
      //     // "bast_id": data?.id,
      //     "id": data?.id,
      //     // "approval_status_id": data?.approval_status?.id,
      //     "module_id": 1,
      //     type: "approve",
      //     // "user_id": userData?.data?.id,
      //     // "vendor_code": data?.vendor_code
      //   }]
      //   if (isApproveItems) {
      //     payload[0].item = data?.details?.map((item: any) => ({
      //       id: item?.id,
      //       checking_status: item?.checking_status
      //     }))
      //   }
      //   router.push({
      //     pathname: `/confirmation`,
      //     params: {
      //       id: id,
      //       data: JSON.stringify(payload),
      //       module: "bast",
      //       type: "approval",
      //       onSuccessNavigateTo: JSON.stringify({
      //         pathname: pathname,
      //         params: { id: id }
      //       })
      //     }
      //   })
      // }}
      />
      }
    </View>
  )
}
