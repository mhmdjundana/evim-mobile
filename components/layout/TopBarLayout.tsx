import { Text, View, Dimensions } from "react-native";
import TopBarNavigation from "../navigation/TopBarNavigation";

const { height } = Dimensions.get('window');

export default function TopBarLayout({ children }: any) {
  return (
    <View style={{
      height: height,
      width: "100%",
      // backgroundColor: "green",
      padding: 0,
      margin: 0
    }}>
      <TopBarNavigation />
      {children}
    </View>
  )
}
