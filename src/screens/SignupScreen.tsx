import React, { FC } from "react";
import { View, Text, StyleSheet } from "react-native";

import { AuthScreenParamList } from "../util/types";

const SignupScreen: FC<AuthScreenParamList> = () => {
  return (
    <View style={styles.container}>
      <Text>Signup screen!</Text>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
