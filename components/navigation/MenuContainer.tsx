import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import { router } from "expo-router";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import { resetTokenKeychain } from "@/fetch/auth";
import { useCompanyMapping, useGetUserData } from "@/hooks/useGetUserData";
import { menuNotification } from "@/fetch/notification";
import { Card } from "react-native-paper";

const { width, height } = Dimensions.get("window");

const modules = [
  {
    displayModuleName: "BAST",
    moduleName: "Bast",
    moduleIcon: "",
    notif: 3,
    navigateTo: "/bast",
    name: "bast"
  },
  {
    displayModuleName: "Normal Receipt",
    moduleName: "Invoice",
    moduleIcon: "",
    notif: 3,
    navigateTo: "/invoice",
    name: "invoice"
  },
  {
    displayModuleName: "Special Payment",
    moduleName: "Special Payment",
    moduleIcon: "",
    notif: 3,
    navigateTo: "/sp",
    name: "special_payment"
  },
  {
    displayModuleName: "Credit Card Settlement",
    moduleName: "Employee Claim CC",
    moduleIcon: "",
    notif: 3,
    navigateTo: "/cc",
    name: "employee_claim_cc"
  },
  {
    displayModuleName: "P Card",
    moduleName: "P Card",
    moduleIcon: "",
    notif: 3,
    navigateTo: "/pcard",
    name: "pcard"
  },
  {
    displayModuleName: "Corporate Integrity",
    moduleName: "Corporate Integrity",
    moduleIcon: "",
    notif: 3,
    navigateTo: "/ci",
    name: "corporate_integrity"
  },
];

const MenuContainer = () => {
  const { userData } = useGetUserData();
  const { companies, currentCompany, changeCompany } = useCompanyMapping();
  // console.log(userData?.data.modules, "userData")
  const [notification, setNotification] = useState<any>(null)

  const modulesFilter = modules.filter((el: any) => {
    const moduleNamePermission = userData?.data?.modules?.[el.moduleName]?.is_v === '1'
    // const moduleNamePermission = userData?.data?.modules?.[el.moduleName]
    // console.log(moduleNamePermission, "moduleNamePermission")
    return moduleNamePermission
  })
  // console.log(modulesFilter, "modulesFilter")
  const [display, setDisplay] = useState<'menu' | 'changeCompany'>('menu')

  const handleDisplay = (display: 'menu' | 'changeCompany') => {
    setDisplay(display)
  }
  const getNotification = async () => {
    const response = await menuNotification()
    console.log(response?.data?.data, 'response notification')
    // return response
    setNotification(response?.data?.data)
  }

  useEffect(() => {
    getNotification()
  }, [])

  switch (display) {
    case 'menu':
      return (
        <DisplayMenu
          userData={userData}
          notification={notification}
          setDisplay={setDisplay}
          modules={modulesFilter}
        />
      )
    case 'changeCompany':
      return (
        <DisplayChangeCompany
          companies={companies}
          currentCompany={currentCompany}
          changeCompany={changeCompany}
          setDisplay={setDisplay}
        />
      )
  }
};

const MenuItem = ({ modules, notification }: any) => {
  console.log('modules: ', modules)
  console.log('notification: ', notification)
  return (
    <View style={styles.menu}>
      {modules.map((el: any, i: number) => {
        console.log(el.name)
        return (
          <TouchableOpacity
            style={styles.menuItem}
            key={i}
            onPress={() => {
              console.log(el.navigateTo)
              router.push(el.navigateTo)
            }}
            activeOpacity={0.7}
          >
            <View style={styles.menuIcon}>
              <FontAwesome6 name="box-archive" size={20} color="#757575" />
            </View>

            <Text style={styles.menuItemText}>{el.displayModuleName}</Text>
            {notification?.[el.name] && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{notification?.[el.name]}</Text>
              </View>)}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const DisplayMenu = ({ userData, setDisplay, notification, modules }: any) => {
  const { currentCompany } = useCompanyMapping()

  return (
    <ScrollView
      style={{
        // width: width,
      }}
      contentContainerStyle={{
        // alignItems: "center",
        // justifyContent: "center",
        width: width,
        // minHeight: height,
        minHeight: "100%",
        // flex: 1
      }}
    >
      <View style={styles.container}>
        {/* <View style={[styles.header, { backgroundColor: "#e0e0e0" }]}>
          <Image
            source={require("@/assets/images/stm-logo-large.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <TouchableOpacity style={styles.closeButton}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
        </View> */}

        <View
          style={{
            width: "100%",
            marginTop: 50
          }}
        >
          {currentCompany?.company_initial === 'STM' ?
            (<TouchableOpacity
              onPress={() => setDisplay('changeCompany')}

              style={styles.companyInfo}>
              <Image
                // source={require('@/assets/images/vei-logo-large.png')}
                source={require("@/assets/images/stm-logo-large.png")}
                style={{ width: "100%", height: 100 }}
                resizeMode="contain"
              />
            </TouchableOpacity>
            )
            : currentCompany?.company_initial === 'VEI' ?
              (
                <TouchableOpacity
                  onPress={() => setDisplay('changeCompany')}

                  style={styles.companyInfo}>
                  <Image
                    // source={require('@/assets/images/vei-logo-large.png')}
                    source={require("@/assets/images/vei-logo-large.png")}
                    style={{ width: "100%", height: 100 }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              )
              : <View
                style={[styles.companyInfo, { height: 100 }]}>
              </View>
          }
        </View>

        <Card style={{
          minWidth: "50%",
          marginVertical: 16,
          alignSelf: "center",
          padding: 10,
        }}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 16,
              fontWeight: "500",
            }}
          >{userData?.data?.name}</Text>
        </Card>

        {/* <TouchableOpacity style={styles.changeCompanyButton}
          onPress={() => setDisplay('changeCompany')}
        >
          <Text style={styles.changeCompanyButtonText}>Change Company</Text>
          <View style={styles.triangle} />
        </TouchableOpacity> */}

        <MenuItem
          // modules={modulesFilter}
          modules={modules}
          notification={notification}
        />

        <TouchableOpacity style={styles.logoutButton} onPress={async () => {
          await resetTokenKeychain()
          router.replace('/login')
        }}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginBottom: 100 }}></View>
    </ScrollView>
  )
}

const DisplayChangeCompany = ({ companies, currentCompany, changeCompany, setDisplay }: any) => {
  const stmLogo = (
    <View style={[styles.companyInfo]}>
      <Image
        // source={require('@/assets/images/vei-logo-large.png')}
        source={require("@/assets/images/stm-logo-large.png")}
        style={{ width: "100%", height: 100 }}
        resizeMode="contain"
      />
    </View>
  )
  const veiLogo = (
    <View style={[styles.companyInfo]}>
      <Image
        source={require('@/assets/images/vei-logo-large.png')}
        // source={require("@/assets/images/stm-logo-large.png")}
        style={{ width: "100%", height: 100 }}
        resizeMode="contain"
      />
    </View>
  )

  const logo = currentCompany?.company_initial === 'STM' ? stmLogo : veiLogo

  return (
    <ScrollView
      style={{
        // width: width,
      }}
      contentContainerStyle={{
        // alignItems: "center",
        // justifyContent: "center",
        width: width,
        // minHeight: height,
        minHeight: "100%",
        backgroundColor: "#fff",
      }}
    >
      {/* <Card style={{
        minWidth: "20%",
        marginVertical: 16,
        alignSelf: "flex-start",
        padding: 10,
        // backgroundColor: "#fff",
        backgroundColor: "#ff4d4d",
      }}>
        <TouchableOpacity onPress={() => setDisplay('menu')}>
          <Text
            style={{
              textAlign: "center",
              fontSize: 16,
              fontWeight: "500",
              color: "#fff",
            }}
          >Back</Text>
        </TouchableOpacity>
      </Card> */}
      <View
        style={{
          width: "100%",
          paddingHorizontal: 30,
          // justifyContent: "flex-end",
          alignItems: "flex-end",
        }}
      >
        <TouchableOpacity
          onPress={() => setDisplay('menu')}
        >
          <FontAwesome6
            name="xmark"
            size={45}
            color="#757575"
            weight="bold"
          />
        </TouchableOpacity>
      </View>

      {/* <Card style={{
        minWidth: "50%",
        marginVertical: 16,
        alignSelf: "center",
        padding: 10,
      }}>
        <Text
          style={{
            textAlign: "center",
            fontSize: 16,
            fontWeight: "500",
          }}
        >Currently in:</Text>
      </Card>
      {logo} */}

      <Card style={{
        minWidth: "50%",
        marginVertical: 16,
        alignSelf: "center",
        padding: 10,
      }}>
        <Text
          style={{
            textAlign: "center",
            fontSize: 16,
            fontWeight: "500",
          }}
        >Login to:</Text>
      </Card>
      {companies.map((el: any, i: number) => {
        return (
          <Card
            style={{
              minWidth: "50%",
              marginVertical: 16,
              alignSelf: "center",
              // padding: 10,
              // backgroundColor: "#fff",
              backgroundColor: currentCompany?.company_initial === el.company_initial ? "#ccc" : "#fff",
            }}
            key={i}
          >
            <TouchableOpacity
              key={el.company_code}
              onPress={() => {
                changeCompany(el)
                setDisplay('menu')
              }}
            >
              {
                el.company_initial === 'STM' ?
                  stmLogo
                  :
                  el.company_initial === 'VEI' ?
                    veiLogo : null
              }
            </TouchableOpacity>
          </Card>
        )
      })}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    minHeight: "100%",
    backgroundColor: "#fff", // Set your desired background color
    // padding: 20, // Adjust padding as needed
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    width: "100%",
  },
  logo: {
    width: 100, // Adjust logo size as needed
    height: 50,
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
  companyInfo: {
    alignItems: "center",
    marginBottom: 20,
  },
  companyName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333", // Dark gray color
  },
  changeCompanyButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007bff", // Blue color
    padding: 10,
    borderRadius: 5,
    marginBottom: 30,
  },
  changeCompanyButtonText: {
    color: "white",
    marginRight: 5,
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderTopWidth: 8,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "white",
  },
  menu: {
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 15,
    // borderBottomWidth: 1,
    // borderBottomColor: "#eee",
    marginBottom: 10,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "#e0e0e0",
    // backgroundColor: "gray",
  },
  menuIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
    // backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
  menuItemText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
    flex: 1, // Allow text to expand
  },
  badge: {
    backgroundColor: "red",
    borderRadius: 50,
    width: 25,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
    // padding: "auto",
    // paddingHorizontal: 8,
    // paddingVertical: 3,
  },
  badgeText: {
    color: "white",
    fontSize: 15,
    fontWeight: "800",
  },
  logoutButton: {
    backgroundColor: "#545454", // Red color
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    alignSelf: "center",
    width: "80%",
  },
  logoutButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default MenuContainer;
