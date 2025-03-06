import { useState } from "react";
import { Alert, View } from "react-native";
import ForgotPasswordUi from "./ForgotPasswordUi";
import { forgotPassword } from "@/fetch/auth";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleResetPassword = async () => {
    console.log("handle reset password start")
    try {
      const res: any = await forgotPassword(email);
      console.log(res)
      if (res?.data?.info === "success") {
        Alert.alert("Success", res?.data?.message)
      } else if (!res?.data?.success) {
        Alert.alert("Error", res?.data?.message)
      } else {
        Alert.alert("Error", "Failed request to reset password")
      }
    } catch (error: any) {
      console.error("Reset Password Error auth/forgot-password", error.status);
      Alert.alert("Error", "Failed request to reset password")
    }
    console.log("handle reset password end")
  }
  
  return (
    <ForgotPasswordUi
      email={email}
      setEmail={setEmail}
      handleResetPassword={handleResetPassword}
    />
  )
}