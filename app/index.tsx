import { StyleSheet, View, ScrollView, Dimensions } from "react-native";
import React, { useState } from "react";
import Login from "@/components/auth/login";
import BastList from "@/components/list/bast/BastList";
import { resetTokenKeychain, retriveAccessToken } from "@/fetch/auth";
import TopBarNavigation from "@/components/navigation/TopBarNavigation";
import DemoUi from "@/components/demo";
import Menu from "./menu";
import IconDemo from "@/components/icons/icons";

const { height } = Dimensions.get('window');

const ScrollDiv = () => {
  return (
    <View style={[
      styles.scrollViewContainer,
      styles.scrollViewContentContainer
    ]}>
      {/* <TopBarNavigation /> */}
      {/* <ScrollView
        style={styles.scrollViewContainer}
        contentContainerStyle={styles.scrollViewContentContainer}
      > */}

      {/* <ApproveButton /> */}
      {/* <FormDemo /> */}
      {/* <TestForm /> */}
      {/* <FilterBast /> */}
      {/* <FilterInvoice /> */}
      {/* <FilterSpecialPayment /> */}
      {/* <FilterCC /> */}
      {/* <TestList /> */}
      {/* <Menu /> */}
      {/* <RejectionConfirmation /> */}
      {/* <ApprovalConfirmation /> */}

      {/* <IconDemo /> */}

      <Menu />
      {/* <BastDetail /> */}
      {/* <BastList /> */}
      {/* <BastForm /> */}

      {/* <DropDownPickerExample />
      <DropdownSelectListExample /> */}
      {/* <ListPage /> */}
      {/* <InvoiceList /> */}

      {/* <DemoUi name="rnpaper" /> */}

      {/* </ScrollView> */}
    </View>
  );
};

export default function Index() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkAuth = async () => {
    const token = await retriveAccessToken();
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }
  checkAuth()

  // resetTokenKeychain()
  return (
    <View style={{
      flex: 1,
      margin: 0,
      padding: 0,
      // backgroundColor: "white",
      // minHeight: height + 200,
    }}>
      {
        !isLoggedIn ? (
          <Login />
        ) : (
          <ScrollDiv />
        )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: "teal",
    // height: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  scrollViewContainer: {
    backgroundColor: "white",
    padding: 0,
    margin: 0,
    // paddingTop: 30,
  },
  scrollViewContentContainer: {
    // flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    height: height
  },
  closeButton: {
    backgroundColor: "#eee", // Light gray background
    borderRadius: 10, // Rounded corners
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
  },
});
