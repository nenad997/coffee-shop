import React, { FC } from "react";
import { Text, View, StyleSheet } from "react-native";

import { ScreenParamList } from "../util/types";

const FavoritesScreen: FC<ScreenParamList> = () => {
  return (
    <View style={styles.screenContainer}>
      <Text>Favorites Screen!</Text>
    </View>
  );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
