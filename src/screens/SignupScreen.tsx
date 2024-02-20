import React, { FC } from "react";
import { useSelector } from "react-redux";
import { View, Text, StyleSheet } from "react-native";

import { AuthScreenParamList } from "../util/types";
import { Colors } from "../constants/colors";
import AuthForm from "../components/Auth/AuthForm";
import LoadingIndicator from "../components/ui/LoadingIndicator";

const SignupScreen: FC<AuthScreenParamList> = () => {
  const isLoading = useSelector((state: any) => state.ui.isLoading);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.signup}>
        <Text style={styles.signupText}>Signup</Text>
      </View>
      <AuthForm isLogin={false} />
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.screenBg,
  },
  signup: {
    borderBottomWidth: 4,
    borderBottomColor: "yellow",
    width: "80%",
    marginBottom: 20,
    padding: 10,
  },
  signupText: {
    color: "white",
    fontSize: 30,
    textAlign: "center",
  },
});
