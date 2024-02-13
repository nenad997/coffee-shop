import React, { FC } from "react";
import { Text, View, StyleSheet } from "react-native";

import { ScreenParamList } from "../util/types";

const ProfileScreen: FC<ScreenParamList> = () => {
  return (
    <View style={styles.screenContainer}>
      <Text>Profile Screen!</Text>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
