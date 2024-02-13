import React, { FC } from "react";
import { View, Image, Text, StyleSheet } from "react-native";

import { IconProps } from "../../util/types";
import { Colors } from "../../constants/colors";

const iconPaths: any = {
  home: require("../../assets/icon-img/home.png"),
  cart: require("../../assets/icon-img/cart.png"),
  favorite: require("../../assets/icon-img/favorite.png"),
  auth: require("../../assets/icon-img/auth.png"),
  search: require("../../assets/icon-img/search.png"),
  plus: require("../../assets/icon-img/plus.png"),
  star: require("../../assets/icon-img/star.png"),
  "coffee-bean": require("../../assets/icon-img/coffee-bean.png"),
  delete: require("../../assets/icon-img/delete.png"),
};

const Icon: FC<IconProps> = ({
  width = 30,
  height = 30,
  name,
  isFocused,
  tintColor = "white",
}) => {
  const imagePath = iconPaths[name!];

  if (!imagePath) {
    return <Text style={styles.text}>{"?"}</Text>;
  }

  let iconTintColor = tintColor;

  if (isFocused) {
    iconTintColor = Colors.tabItem;
  }

  return (
    <Image
      style={[styles.image, { width, height, tintColor: iconTintColor }]}
      source={imagePath}
    />
  );
};

export default Icon;

const styles = StyleSheet.create({
  // imageContainer: {
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  image: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 28,
  },
});
