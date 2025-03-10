import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { login, retrieveEmailPassword, retriveAccessToken } from "@/fetch/auth";
// import { useForceRefresh } from "@/hooks/useForceRefresh";
import { router } from "expo-router";
import LoginUi from "./LoginUI";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  // const forceRefresh = useForceRefresh();
  const [checkTnC, setCheckTnC] = useState(false)

  const handleLogin = async () => {
    // console.log("Login");
    try {
      const res: any = await login(email, password);
      // console.log(res.data?.access_token)
      if (res.data?.access_token) {
        // forceRefresh();
        // router.replace('/menu')
      }
      const cred = await retriveAccessToken();
      //   console.log(cred, 'credential')
      const decoded: any = jwtDecode(cred);
      //   console.log(decoded)
    } catch (error) {
      console.error("Login Error", error);
    }
    // resetKeychain()
    console.log("Login End");
  };
  
  useEffect(() => {
    const rl = async () => {
      const { email: emailR, password: passwordR }: any = await retrieveEmailPassword()
      setEmail(emailR)
      setPassword(passwordR)
    }
    rl()
  }, [])

  return (
    <LoginUi
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      showPassword={showPassword}
      setShowPassword={setShowPassword}
      handleLogin={handleLogin}
      checkTnC={checkTnC}
      setCheckTnC={setCheckTnC}
    />
  );
};

export default Login;
