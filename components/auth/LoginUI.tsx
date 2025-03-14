import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import {
  configureFonts,
  HelperText,
  List,
  MD2Colors,
  MD3Colors,
  TextInput as PaperTextInput,
  Text as PaperText,
  Button,
  Checkbox,
  TouchableRipple,
  Card,
  Icon,
} from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
// assets
import evimLoginBackground from "@/assets/images/evim-login-background.jpg";
import stmLogo from "@/assets/images/logo-stm-login.png";
import STMLogin from "@/assets/images/STMLogin.png";
import { PaperTextInputGroup } from "./PaperTextInputGroup";

const { width, height } = Dimensions.get("window");

export default function LoginUi(props: any) {
  return (
    <>
      {/* <LoginUiOld {...props} /> */}
      <LoginUiNew {...props} />
    </>
  );
}

const LoginUiNew = ({
  email,
  setEmail,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  handleLogin,
  checkTnC,
  setCheckTnC,
  isInvalidCred,
  loginMsgTitle,
  loginMsg,
  debugMsg,
  handleBlur,
  handleSubmit,
  errors,
  touched,
}: any) => {
  return (
    <View style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={[styles.container, { position: "relative" }]}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ImageBackground
          source={evimLoginBackground}
          style={[styles.background, { opacity: 0.3, position: "absolute" }]}
        ></ImageBackground>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          {/* <ImageBackground
            source={stmLogo}
            style={styles.stmLogo}
          ></ImageBackground> */}
          <ImageBackground
            source={STMLogin}
            style={{
              width: 674 / 2.5,
              height: 352 / 2.5,
              marginBottom: 20,
            }}
          ></ImageBackground>

          <LoginMessage
            isInvalidCred={isInvalidCred}
            loginMsgTitle={loginMsgTitle}
            loginMsg={loginMsg}
          />
          <View
            style={{
              maxWidth: width - 16 - 16,
              alignSelf: "center",
            }}
          >
            <View style={{ marginBottom: 15 }} />
            <PaperTextInputGroup
              title="Email"
              value={email}
              onChangeText={setEmail}
              error={errors.email}
              touched={touched.email}
            />
            <View style={{ marginBottom: 15 }} />
            <PaperTextInputGroup
              title="Password"
              value={password}
              isPassword
              onChangeText={setPassword}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              error={errors.password}
              touched={touched.password}
            />
            <TouchableOpacity
              onPress={() => {
                console.log("Forgot Password?");
                router.push("/forgot-password");
              }}
              style={styles.forgotPassword}
            >
              <PaperText variant="titleMedium">Forgot Password?</PaperText>
            </TouchableOpacity>
          </View>
          <View style={{ marginBottom: 10 }} />
          {/* <Text>error email:{errors.email}</Text>
          <Text>error password:{errors.password}</Text> */}
          <Button
            mode="contained"
            style={[
              {
                // width: width - 16,
                marginTop: 20,
                backgroundColor: "#2D2A69",
                width: 295,
                height: 40,
                borderRadius: 12,
                opacity: !checkTnC ? 0.7 : 1,
              },
            ]}
            onPress={() => {
              // handleLogin();
              handleSubmit();
            }}
            disabled={!checkTnC}
            textColor="#F8F21D"
          >
            <PaperText
              style={{
                fontSize: 16,
                color: "#F8F21D",
                fontWeight: "800",
                // backgroundColor: 'red'
              }}
            >
              Login
            </PaperText>
          </Button>
          <TouchableRipple
            onPress={() => {
              // setCheckTnC(!checkTnC)
              router.push("/tnc");
            }}
            style={{ marginTop: 10 }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingVertical: 8,
                paddingHorizontal: 16,
                maxWidth: width - 16 - 16,
              }}
            >
              <View
                // pointerEvents="box-none"
                style={{
                  margin: 8,
                }}
              >
                <Checkbox
                  color="#2D2A69"
                  status={checkTnC ? "checked" : "unchecked"}
                  onPress={() => setCheckTnC(!checkTnC)}
                />
              </View>
              <PaperText variant="bodyMedium">
                I've read and agree with the{" "}
                <PaperText variant="bodyMedium" style={{ fontWeight: "bold" }}>
                  Terms and Conditions
                </PaperText>{" "}
                and the{" "}
                <PaperText variant="bodyMedium" style={{ fontWeight: "bold" }}>
                  Privacy Policy
                </PaperText>
                .
              </PaperText>
            </View>
          </TouchableRipple>
        </View>
      </KeyboardAvoidingView>
      {/* <View>
        <Text>asdf</Text>
        <Text>asdf</Text>
        <Text>asdf</Text>
        <Text>asdf</Text>
        <Text>asdf</Text>
        <Text>asdf</Text>
        <Text>asdf</Text>
        <Text>asdf</Text>
        <Text>asdf</Text>
        <Text>asdf</Text>
        <Text>asdf</Text>
        <Text>asdf</Text>
        <Text>asdf</Text>
        <Text>asdf</Text>
        <Text>asdf</Text>
        <Text>{debugMsg}</Text>
      </View> */}
    </View>
  );
};

const LoginMessage = ({ isInvalidCred, loginMsgTitle, loginMsg }: any) => {
  // if (!loginMsgTitle && !loginMsg) return null;
  return (
    <View
      style={{
        height: 100,
        alignItems: "center",
        justifyContent: "flex-end",
      }}
    >
      {loginMsgTitle && loginMsg ? (
        <Card
          style={{
            backgroundColor: isInvalidCred ? "#FFE2E5" : "#E7F4E8",
            maxWidth: 674 / 2.5,
          }}
        >
          <Card.Content
            style={{
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
            }}
          >
            {isInvalidCred && loginMsgTitle && loginMsg ? (
              <>
                <View style={{ marginRight: 10 }}>
                  <Icon source="alert-circle" size={24} color="#FF616D" />
                </View>
                <View>
                  <PaperText
                    variant="bodyMedium"
                    style={{ fontWeight: "bold", color: "#1F2024" }}
                  >
                    Wrong Credential
                  </PaperText>
                  <PaperText variant="bodyMedium" style={{ color: "#494A50" }}>
                    Please Check your Email / Password
                  </PaperText>
                </View>
              </>
            ) : !isInvalidCred && loginMsgTitle && loginMsg ? (
              <>
                <View style={{ marginRight: 10 }}>
                  <Icon source="check-circle" size={24} color="#3AC0A0" />
                </View>
                <View>
                  <PaperText
                    variant="bodyMedium"
                    style={{ fontWeight: "bold", color: "#1F2024" }}
                  >
                    Success
                  </PaperText>
                  <PaperText variant="bodyMedium" style={{ color: "#494A50" }}>
                    You will be redirected to EVIM Mobile Approver Application
                  </PaperText>
                </View>
              </>
            ) : (
              <></>
            )}
          </Card.Content>
        </Card>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  stmLogo: {
    width: width,
    height: width * 0.3,
    marginBottom: 20,
  },
  background: {
    width: width,
    height: height,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    // paddingTop: 50,
    alignItems: "center",
    // backgroundColor: 'white',
    // padding: 16,
  },
  inner: {
    flex: 1,
  },
  container2: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    // backgroundColor: 'white',
    padding: 16,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 16,
    backgroundColor: "white",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    backgroundColor: "white",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 4,
  },
  passwordInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 8,
    backgroundColor: "white",
  },
  eyeIcon: {
    padding: 8,
    backgroundColor: "white",
  },
  forgotPassword: {
    marginBottom: 5,
    width: "auto",
  },
  loginButton: {
    backgroundColor: "#1a237e",
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginTop: 20,
    borderRadius: 4,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  loginButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
