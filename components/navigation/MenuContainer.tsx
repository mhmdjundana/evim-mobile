import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { router } from "expo-router";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'
import { resetTokenKeychain } from "@/fetch/auth";
import { useCompanyMapping, useGetUserData } from "@/hooks/useGetUserData";
import { menuNotification } from "@/fetch/notification";

const modules = [
  {
    moduleName: "Bast",
    moduleIcon: "",
    notif: 3,
    navigateTo: "/bast",
    name: "bast"
  },
  {
    moduleName: "Invoice",
    moduleIcon: "",
    notif: 3,
    navigateTo: "/invoice",
    name: "invoice"
  },
  {
    moduleName: "Special Payment",
    moduleIcon: "",
    notif: 3,
    navigateTo: "/sp",
    name: "special_payment"
  },
  {
    moduleName: "Employee Claim CC",
    moduleIcon: "",
    notif: 3,
    navigateTo: "/cc",
    name: "employee_claim_cc"
  },
  {
    moduleName: "P Card",
    moduleIcon: "",
    notif: 3,
    navigateTo: "/pcard",
    name: "pcard"
  },
  {
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
          setDisplay={setDisplay} />
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
  console.log('asdf', notification)
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

            <Text style={styles.menuItemText}>{el.moduleName}</Text>
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

const DisplayMenu = ({ userData, setDisplay, notification }: any) => {
  return (
    <ScrollView style={{ width: "100%" }}>
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

        <View style={styles.companyInfo}>
          <Image
            // source={require('@/assets/images/vei-logo-large.png')}
            source={require("@/assets/images/stm-logo-large.png")}
            style={{ width: "100%", height: 100 }}
            resizeMode="contain"
          />
        </View>

        <View>
          <Text>{userData?.data?.email}</Text>
        </View>

        <TouchableOpacity style={styles.changeCompanyButton}
          onPress={() => setDisplay('changeCompany')}
        >
          <Text style={styles.changeCompanyButtonText}>Change Company</Text>
          <View style={styles.triangle} />
        </TouchableOpacity>

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
    <View>
      <TouchableOpacity onPress={() => setDisplay('menu')}>
        <Text>Back</Text>
      </TouchableOpacity>

      <Text>Current Company:</Text>
      {logo}

      <Text>Choose Company:</Text>
      {companies.map((el: any) => {
        return (
          <TouchableOpacity
            key={el.company_code}
            onPress={() => {
              changeCompany(el)
              setDisplay('menu')
            }}
          >
            {el.company_initial === 'STM' ?
              stmLogo
              :
              veiLogo
            }
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    paddingVertical: 10,
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
    backgroundColor: "#dc3545", // Red color
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  logoutButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default MenuContainer;
