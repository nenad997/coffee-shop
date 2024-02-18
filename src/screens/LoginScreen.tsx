import React, { FC } from "react";
import { View, Text, StyleSheet } from "react-native";

import { AuthScreenParamList } from "../util/types";
import { Colors } from "../constants/colors";
import AuthForm from "../components/Auth/AuthForm";

const LoginScreen: FC<AuthScreenParamList> = () => {
  return (
    <View style={styles.container}>
      <View style={styles.login}>
        <Text style={styles.loginText}>Login</Text>
      </View>
      <AuthForm isLogin={true} />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.authBg,
  },
  login: {
    borderBottomWidth: 4,
    borderBottomColor: "yellow",
    width: "80%",
    marginBottom: 20,
    padding: 10,
  },
  loginText: {
    color: "white",
    fontSize: 30,
    textAlign: "center",
  },
});
