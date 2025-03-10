import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { login, retrieveEmailPassword, retriveAccessToken, storeAccessTokenHard } from "@/fetch/auth";
import { useForceRefresh } from "@/hooks/useForceRefresh";
import { router } from "expo-router";
import LoginUi from "./LoginUI";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const forceRefresh = useForceRefresh();
  const [checkTnC, setCheckTnC] = useState(true)
  const [isInvalidCred, setIsInvalidCred] = useState(false)
  const [loginMsgTitle, setLoginMsgTitle] = useState('')
  const [loginMsg, setLoginMsg] = useState('')

  const handleLogin = async () => {
    // console.log("Login");
    try {
      const res: any = await login(email, password);
      console.log(res, 'login response')
      if (res?.data?.access_token) {
        // forceRefresh();
        setTimeout(() => {
          router.replace('/menu')
        }, 2000)
        setIsInvalidCred(false)
        setLoginMsgTitle('Success')
        setLoginMsg('You will be redirected to EVIM Mobile Approver Application')
      } else if (res?.status === 401) {
        setIsInvalidCred(true)
        setLoginMsgTitle('Wrong Login Credential')
        setLoginMsg('Please check your email / password')
      }
      // const cred = await retriveAccessToken();
      //   console.log(cred, 'credential')
      // const decoded: any = jwtDecode(cred);
      //   console.log(decoded)
    } catch (error: any) {
      console.error("Login Error auth/login", error.status);
    } finally {
      console.log("Login End");
    }
    // resetKeychain()
  };
  
  useEffect(() => {
    const rl = async () => {
      const { email: emailR, password: passwordR }: any = await retrieveEmailPassword()
      setEmail(emailR)
      setPassword(passwordR)
    }
    rl()
    storeAccessTokenHard()
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
      isInvalidCred={isInvalidCred}
      loginMsgTitle={loginMsgTitle}
      loginMsg={loginMsg}
    />
  );
};

export default Login;
