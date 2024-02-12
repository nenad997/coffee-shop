import React, { FC, useLayoutEffect } from "react";
import { Text, View, StyleSheet } from "react-native";

import { ScreenParamList } from "../util/types";

const CoffeeDetailsScreen: FC<ScreenParamList> = ({ route, navigation }) => {
  useLayoutEffect(() => {
    const timer = setTimeout(() => {
      if (route.params) {
        navigation.setOptions({
          title: `${route.params.title} - ${route.params.addition}`,
        });
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [route, navigation]);

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
