import * as Keychain from "react-native-keychain";
import api from "@/fetch/axios";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { API_URI_WEB, API_URI } from "@/constants/variables";

export const login = async (email, password) => {
  console.log("login start")
  await saveEmailPassword(email, password)
  try {
    const response = await api.post("login", {
      email,
      password,
    });
    // const response = await axios({
    //   method: "POST",
    //   url: API_URI + "login",
    //   data: {
    //     email,
    //     password,
    //   },
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //     "Access-Control-Allow-Origin": "*",
    //   },
    // })
    console.log("Login Response Status:", response.status);
    if (response.data.access_token) {
      // console.log(typeof response.data.access_token);
      const accessToken = response.data.access_token;
      try {
        await storeAccessToken(accessToken);
        const decoded = jwtDecode(accessToken);
        await setCurrentCompanyKeychain(decoded.data?.mapping[0]);
        // console.log(decoded.data.modules)
        // await SecureStore.setItemAsync("accessToken", accessToken);
        // await SecureStore.setItemAsync('userData', JSON.stringify(decoded.data));
        return response;
      } catch (error) {
        console.error("Login Error:", error.message);
        return error;
        // throw new Error(error)
      }
    }
  } catch (error) {
    console.error("Login Request Error", error.status);
    return error;
    // return new Error(error);
    // throw new Error(error)
  } finally {
    console.log("login end")
  }
};

export const forgotPassword = async (email) => {
  try {
    const response = await axios({
      method: "POST",
      url: API_URI_WEB + "password/email?email=" + email,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
    // console.log(response, 'respose forgot password')
    return response
  } catch (error) {
    console.error("Error request forgot password:", error);
  }
  return null
};

export const relogin = async () => {
  try {
    const { email, password } = await retrieveEmailPassword()
    const response = await login(email, password)
    return response
  } catch (error) {
    console.error("ReLogin Error", error);
    return error;
  }
}

export const saveEmailPassword = async (email, password) => {
  try {
    await Keychain.setGenericPassword("email", email, {
      service: "email",
    });
    await Keychain.setGenericPassword("password", password, {
      service: "password",
    });
  } catch (error) {
    console.error("Error storing email and password:", error);
  }
};

export const storeAccessToken = async (accessToken) => {
  try {
    // console.log(accessToken, 'access token')
    await Keychain.setGenericPassword("accessToken", accessToken, {
      service: "ACCESS_TOKEN",
    });
  } catch (error) {
    console.error("Error storing tokens:", error);
  }
};
export const storeAccessTokenHard = async (accessToken) => {
  // try {
  //   // console.log(accessToken, 'access token')
  //   await Keychain.setGenericPassword("accessToken", "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vZXZpbWRldmJhY2tlbmQuc3VtYmF3YXRpbXVybWluaW5nLmNvbS9tb2JpbGUvbG9naW4iLCJpYXQiOjE3NDE1MDUxMzAsImV4cCI6MTc0MTUwODczMCwibmJmIjoxNzQxNTA1MTMwLCJqdGkiOiJmYzRqRGpXdFBhQlpJckZkIiwic3ViIjoiMzA0IiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyIsIm1lc3NhZ2UiOiJIaSBDb250cmFjdCBJbnNwZWN0b3IgRklOQU5DRSwgd2VsY29tZSB0byBob21lIiwiZGF0YSI6eyJpZCI6MzA0LCJ0eXBlX2lkIjoiMSIsIm5hbWUiOiJDb250cmFjdCBJbnNwZWN0b3IgRklOQU5DRSIsImVtYWlsIjoiY2lmaUBtYWlsLmNvbSIsImlzX3ZlcmlmaWVkIjoiMSIsIm1hcHBpbmciOlt7ImlzX2RlZmF1bHQiOiIxIiwiY29tcGFueV9jb2RlIjoiMTQ5MiIsImNvbXBhbnlfaW5pdGlhbCI6IlNUTSJ9XSwicm9sZXMiOlt7ImlkIjoyMCwidGl0bGUiOiJDb250cmFjdCBJbnNwZWN0b3IiLCJkZXNjcmlwdGlvbiI6IkNvbnRyYWN0IEluc3BlY3RvciJ9XSwibW9kdWxlcyI6eyJCYXN0Ijp7ImlzX3YiOiIxIn0sIkludm9pY2UiOnsiaXNfdiI6IjEifSwiU3BlY2lhbCBQYXltZW50Ijp7ImlzX3YiOiIxIn0sIkVtcGxveWVlIENsYWltIE5vbiBDQyI6eyJpc192IjoiMSJ9LCJNYXN0ZXIgRGF0YSI6eyJpc192IjoiMCJ9LCJVc2VyIE1hbmFnZW1lbnQiOnsiaXNfdiI6IjAifSwiV29ya2Zsb3ciOnsiaXNfdiI6IjEifSwiRGFzaGJvYXJkIjp7ImlzX3YiOiIxIn0sIlJlcG9ydGluZyI6eyJpc192IjoiMCJ9LCJFbXBsb3llZSBDbGFpbSBDQyI6eyJpc192IjoiMCJ9LCJSS0FCIjp7ImlzX3YiOiIwIn19LCJlbXBsb3llZSI6eyJpZCI6MzI0LCJjb21wYW55X2NvZGUiOiIxNDkyIiwiY29tcGFueV9zdWJfaWQiOm51bGwsInBheXJvbGxfaWQiOiI5OSIsInBheXJvbGxfbmFtZSI6IkNvbnRyYWN0IEluc3BlY3RvciBGSU5BTkNFIiwiZGlyZWN0X21hbmFnZXIiOiJSb3kiLCJkZXBhcnRtZW50X2NvZGUiOiIyIiwicG9zaXRpb24iOm51bGwsImVtYWlsIjoiY2lmaUBtYWlsLmNvbSIsImJhbmtfYWNjIjpudWxsLCJiYW5rX25hbWUiOm51bGwsImJhbmtfYnIiOm51bGwsImJhbmtfY3VzdCI6bnVsbCwiYWRkcmVzcyI6bnVsbCwiY3JlYXRlZF9ieSI6bnVsbCwidXBkYXRlZF9ieSI6bnVsbCwiZGVsZXRlZF9hdCI6bnVsbCwiY3JlYXRlZF9hdCI6IjIwMjQtMDUtMTRUMDk6MDY6MDkuNzg3MDAwWiIsInVwZGF0ZWRfYXQiOiIyMDI0LTA1LTE0VDA5OjA2OjA5Ljc4NzAwMFoiLCJhc3NpZ24iOm51bGwsImFzc2lnbl9kaXJlY3RfbWFuYWdlciI6bnVsbCwibWFwcGluZyI6bnVsbCwiZGVwYXJ0bWVudCI6eyJpZCI6MiwiY29tcGFueV9jb2RlIjoiMTQ5MiIsIm5hbWUiOiJGaW5hbmNlIiwiZGVzY3JpcHRpb24iOiJTdW1iYXdhIFRpbXVyIE1pbmluZyIsImNyZWF0ZWRfYnkiOm51bGwsInVwZGF0ZWRfYnkiOm51bGwsImRlbGV0ZWRfYXQiOm51bGwsImNyZWF0ZWRfYXQiOiIyMDIzLTExLTI0VDIxOjE5OjQ5Ljg3MDAwMFoiLCJ1cGRhdGVkX2F0IjoiMjAyMy0xMS0yNFQyMToxOTo0OS44NzAwMDBaIn19LCJ2ZW5kb3IiOm51bGx9fQ.wJlUsI9aR9BJP0q9wsb0m5ZpprliQEdxE8rIA_QwQmA", {
  //     service: "ACCESS_TOKEN",
  //   });
  // } catch (error) {
  //   console.error("Error storing tokens:", error);
  // }
};

export const retriveAccessToken = async () => {
  try {
    const credentials = await Keychain?.getGenericPassword({
      service: "ACCESS_TOKEN",
    });
    // const john = await Keychain.getGenericPassword({
    //   service: "john",
    // });
    // console.log(credentials.password)
    // console.log(john)
    if (credentials?.password) {
      return credentials.password;
    } else {
      return ''
    }
  } catch (error) {
    console.error("Error retrieve access token:", error);
    return ''
  }
};

export const retrieveUserData = async () => {
  const token = await retriveAccessToken();
  // console.log(token, 'token')
  if (token) {
    const decoded = jwtDecode(token);
    return decoded;
  }
  return {};
};

export const setCurrentCompanyKeychain = async (company) => {
  await Keychain.setGenericPassword("currentCompany", JSON.stringify(company), {
    service: "currentCompany",
  });
};

export const getCurrentCompanyKeychain = async () => {
  const credentials = await Keychain?.getGenericPassword({
    service: "currentCompany",
  });
  if (credentials?.password) {
    return JSON.parse(credentials.password);
  } else {
    return null;
  }
};

export const resetKeychain = async () => {
  await Keychain.resetGenericPassword({ service: "ACCESS_TOKEN" });
  await Keychain.resetGenericPassword({ service: "email" });
  await Keychain.resetGenericPassword({ service: "password" });
  await Keychain.resetGenericPassword({ service: "accessToken" });
};
export const resetTokenKeychain = async () => {
  try {
    await Keychain.resetGenericPassword({ service: "ACCESS_TOKEN" });
  } catch (error) {
    console.error("Error reset token keychain:", error);
  }
};

// resetTokenKeychain()
// resetKeychain()
export const retrieveEmailPassword = async () => {
  try {
    return {
      // "email": "upton.sap@mail.com",
      // "email": "sapfi@mail.com",
      // "email": "ci@mail.com",
      "email": "cifi@mail.com",
      // "email": "albert.ap@mail.com",
      "password": "12345678"
    }
    const emailCredentials = await Keychain.getGenericPassword({
      service: "email",
    });
    const passwordCredentials = await Keychain.getGenericPassword({
      service: "password",
    });
    // if (!emailCredentials) {
    //   return {
    //     "email": "upton.sap@mail.com",
    //     "password": "12345678"
    //   }
    // }
    console.log(emailCredentials, passwordCredentials, 'credentials')
    return { email: emailCredentials.password, password: passwordCredentials.password };
  } catch (error) {
    console.error("Error retrieving email and password:", error);
  }
};