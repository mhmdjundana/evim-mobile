import { View } from "react-native"
import { ActionButton } from "../button/ActionButton"

export default function ApprovalAction({
  bastData,
  id,
  userData,
  router
}: any) {
  return (
    <>
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
    </>
  )
}
