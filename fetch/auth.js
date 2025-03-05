import * as Keychain from "react-native-keychain";
import api from "@/fetch/axios";
import { jwtDecode } from "jwt-decode";

export const login = async (email, password) => {
  await saveEmailPassword(email, password)
  try {
    const response = await api.post("login", {
      email,
      password,
    });
    // console.log("Login Response Status:", response.status);
    if (response.data.access_token) {
      // console.log(typeof response.data.access_token);
      const accessToken = response.data.access_token;
      try {
        await storeAccessToken(accessToken);
        // const decoded = jwtDecode(accessToken);
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
  }
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
    // await Keychain.setGenericPassword("john", "doe", {
    //   service: "john",
    // });
  } catch (error) {
    console.error("Error storing tokens:", error);
  }
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
      "password": "1234567"
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
