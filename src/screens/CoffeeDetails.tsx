import React, { FC } from "react";
import { Text, View, StyleSheet } from "react-native";

import { ScreenParamList } from "../util/types";

const CoffeeDetailsScreen: FC<ScreenParamList> = () => {
  return (
    <View style={styles.screenContainer}>
      <Text>Coffee details Screen!</Text>
    </View>
  );
};

export default CoffeeDetailsScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
