import { Text, View } from "react-native"
import { ActionButton } from "../button/ActionButton"
import { usePathname, useLocalSearchParams } from "expo-router";

export default function ApprovalAction({
  bastData,
  id,
  userData,
  router,
  isApproveItems
}: any) {
  const pathname = usePathname();
  // console.log(pathname, "pathname")
  // console.log(params, "params")
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          width: "95%",
          marginTop: 5,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "700",
            textAlign: "center",
            color: "#404040",
            padding: 3,
            marginLeft: 5
          }}
        >Approval Action</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          width: "95%",
          // backgroundColor: "gray",
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 10,
          marginBottom: 5
        }}
      >
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
              return (
                <View
                  style={{
                    marginVertical: 5, flexDirection: "row", justifyContent: "flex-end", width: "100%",
                  }}
                >
                  {bastData?.action?.is_reject && <ActionButton
                    type="reject"
                    onPress={() => {
                      const payload: any = [{
                        // "bast_id": bastData?.id,
                        "id": bastData?.id,
                        // "approval_status_id": bastData?.approval_status?.id,
                        "module_id": 1,
                        type: "reject",
                        // "user_id": userData?.data?.id,
                        // "vendor_code": bastData?.vendor_code
                      }]
                      if (isApproveItems) {
                        payload[0].item = bastData?.details?.map((item: any) => ({
                          id: item?.id,
                          checking_status: item?.checking_status
                        }))
                      }
                      router.push({
                        pathname: `/confirmation`,
                        params: {
                          id: id,
                          data: JSON.stringify(payload),
                          module: "bast",
                          type: "rejection",
                          onSuccessNavigateTo: JSON.stringify({
                            pathname: pathname,
                            params: { id: id }
                          })
                        }
                      })
                    }}
                  />}
                  {(bastData?.action?.is_approve && !bastData?.details.some((item: any) => item?.checking_status === '2')) && <ActionButton
                    type="approve"
                    onPress={() => {
                      const payload: any = [{
                        // "bast_id": bastData?.id,
                        "id": bastData?.id,
                        // "approval_status_id": bastData?.approval_status?.id,
                        "module_id": 1,
                        type: "approve",
                        // "user_id": userData?.data?.id,
                        // "vendor_code": bastData?.vendor_code
                      }]
                      if (isApproveItems) {
                        payload[0].item = bastData?.details?.map((item: any) => ({
                          id: item?.id,
                          checking_status: item?.checking_status
                        }))
                      }
                      router.push({
                        pathname: `/confirmation`,
                        params: {
                          id: id,
                          // type: "approval",
                          data: JSON.stringify(payload),
                          module: "bast",
                          type: "approval",
                          onSuccessNavigateTo: JSON.stringify({
                            pathname: pathname,
                            params: { id: id }
                          })
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
      </View>
    </>
  )
}
