import React, { FC } from "react";
import { Text, View, StyleSheet } from "react-native";

import { ScreenParamList } from "../util/types";

const AuthScreen: FC<ScreenParamList> = () => {
  return (
    <View style={styles.screenContainer}>
      <Text>Auth Screen!</Text>
    </View>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
