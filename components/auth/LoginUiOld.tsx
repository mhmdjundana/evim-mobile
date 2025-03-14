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

const LoginUiOld = ({
  email,
  setEmail,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  handleLogin,
}: any) => {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <ImageBackground
            source={stmLogo}
            style={styles.stmLogo}
          ></ImageBackground>
          <ImageBackground
            source={evimLoginBackground}
            style={styles.background}
          >
            <View style={styles.container2}>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
              <View style={styles.inputContainer}>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={styles.passwordInput}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity
                    style={styles.eyeIcon}
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <FontAwesome
                      name={showPassword ? "eye-slash" : "eye"}
                      size={20}
                      color="gray"
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleLogin}
              >
                <Text style={styles.loginButtonText}>Login</Text>
              </TouchableOpacity>
            </View>
            </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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