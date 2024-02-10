import React, { FC } from "react";
import { View, Image, Text, StyleSheet } from "react-native";

import { IconProps } from "../../util/types";

const iconPaths: any = {
  home: require("../../assets/icon-img/home.png"),
  cart: require("../../assets/icon-img/cart.png"),
  favorite: require("../../assets/icon-img/favorite.png"),
  auth: require("../../assets/icon-img/auth.png"),
};

const Icon: FC<IconProps> = ({ width = 30, height = 30, name, isFocused }) => {
  const imagePath = iconPaths[name!];

  if (!imagePath) {
    return (
      <View style={styles.imageContainer}>
        <Text style={styles.text}>{"?"}</Text>
      </View>
    );
  }

  let tintColor = "gray";

  if (isFocused) {
    tintColor = "black";
  }

  return (
    <View style={styles.imageContainer}>
      {imagePath && (
        <Image
          style={[styles.image, { width, height, tintColor }]}
          source={imagePath}
        />
      )}
    </View>
  );
};

export default Icon;

const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 28,
  },
});
