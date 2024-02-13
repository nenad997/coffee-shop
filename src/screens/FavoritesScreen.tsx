import React, { FC } from "react";
import { Text, View, StyleSheet } from "react-native";

import { Coffee, ScreenParamList } from "../util/types";
import FavoritesList from "../components/Coffee/FavoritesList";
import { Colors } from "../constants/colors";
import Button from "../components/ui/Button";

const FavoritesScreen: FC<ScreenParamList> = ({ navigation }) => {
  const coffees: Coffee[] = [];

  if (!coffees || coffees.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>
          No favorite coffees, start adding some...
        </Text>
        <Button
          style={styles.button}
          onPress={() => navigation.navigate("Home")}
        >
          Explore our coffees
        </Button>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <FavoritesList coffees={coffees} />
    </View>
  );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: Colors.screenBg,
  },
  fallbackContainer: {
    backgroundColor: Colors.screenBg,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
  button: {
    marginTop: 20,
    backgroundColor: Colors.inputBg,
    padding: 10,
    borderRadius: 20,
  },
});
