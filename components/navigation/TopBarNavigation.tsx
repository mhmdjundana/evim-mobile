import { Image, StyleSheet, Text, View } from "react-native";
import { IconButton } from "react-native-paper";
import { useGetUserData } from '@/hooks/useGetUserData';
import { router } from "expo-router";

export default function TopBarNavigation() {
  const { userData } = useGetUserData();
  // console.log(userData?.data?.email, "userData")

  return (
    <View style={[styles.container]}>
      <Image
        source={require("@/assets/images/stm-logo-large.png")}
        style={{
          width: 120, // Adjust logo size as needed
          height: 65,
          // backgroundColor: "red",
        }}
        resizeMode="contain"
      />
      {/* <IconButton
          icon="close"
          size={30}
          onPress={() => { }}
        /> */}
      {/* <Text>{userData?.data?.email}</Text> */}
      <IconButton
        icon="menu"
        size={44}
        onPress={() => {
          router.push('/menu')
        }}
      />
    </View>);
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 65,
    backgroundColor: "#F8F9FE",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // marginBottom: 10,
    // add shadow at bottom
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    marginBottom: 2,
  },
})