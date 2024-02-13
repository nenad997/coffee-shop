import React, { FC } from "react";
import { View, Text, StyleSheet } from "react-native";

import { AuthScreenParamList } from "../util/types";

const LoginScreen: FC<AuthScreenParamList> = () => {
  return (
    <View>
      <Text>Login screen!</Text>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
