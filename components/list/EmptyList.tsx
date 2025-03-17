import { Text, View } from "react-native"

export const EmptyList = () => {
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', height: 200 }}>
      <Text style={{ textAlign: 'center' }}>No Data</Text>
    </View>
  )
}