import axios from "axios";
// import * as SecureStore from "expo-secure-store"; // Or react-native-keychain
import * as Keychain from "react-native-keychain";
import { resetTokenKeychain, storeAccessToken } from "./auth";
import { Alert } from "react-native";
import { API_URI } from "@/constants/variables";

// Create an instance of Axios (optional but recommended for better organization)
const api = axios.create({
  baseURL: API_URI, // Your API base URL

  timeout: 30000,
  headers: {
    "Content-Type": "application/json", // Set the default content type
    accept: "application/json",
    "access-control-allow-origin": "*",
    "cache-control": "no-cache",
  },
});

api.defaults.baseURL = API_URI;

api.interceptors.request.use(
  async (config) => {
    console.log("axios interceptor request started");
    // try {
    //   const token = await SecureStore.getItemAsync('jwtToken'); // Get JWT from secure storage
    //   if (token) {
    //     config.headers.Authorization = `Bearer ${token}`; // Add JWT to the Authorization header
    //   }
    //   return config; // Return the modified config
    // } catch (error) {
    //   console.error('Error adding token to request:', error);
    //   return config; // Return the original config (or handle the error as needed)
    // }
    // await resetTokenKeychain();
    try {
      const credentials = await Keychain?.getGenericPassword({
        service: "ACCESS_TOKEN",
      }); // Use a service name
      console.log(credentials, 'credentials')
      if (credentials) {
        config.headers.Authorization = `Bearer ${credentials.password}`; // credentials.password contains the access token
      }
      // console.log(JSON.stringify(config), "config");
      return config;
    } catch (error) {
      console.error("Error adding token to request:", error);
      return config;
    }
  },
  (error) => {
    const originalRequest = error.config
    // console.error(originalRequest)
    console.error(error, 'error interceptor request');
    return Promise.reject(error); // Handle request errors
  }
);

api.interceptors.response.use(function (response) {
  console.log("axios interceptor response started");
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  // console.log(response.data?.access_token, 'response interceptor token');
  // console.log(response.data, 'response interceptor');
  if (response.data?.access_token) {
    storeAccessToken(response.data?.access_token);
  }
  // if (!response.data?.success) {
  //   Alert.alert(
  //     'Error', // Title
  //     "Update failed", // Message
  //     [
  //       {
  //         text: 'OK',
  //         onPress: () => { }, // You can add an action here (e.g., retry)
  //       },
  //     ],
  //     { cancelable: false } // Prevent dismissing by tapping outside (optional)
  //   )
  // }
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  console.error(error, 'error interceptor response');
  return Promise.reject(error);
});

export default api; // Export the axios instance so you can use it in your components.
