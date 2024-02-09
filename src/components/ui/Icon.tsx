import React, { FC } from "react";
import { View, Image, Text } from "react-native";

interface IconProps {
  width?: number;
  height?: number;
  name?: string;
  isFocused?: boolean;
  tintColor?: string;
}

const Icon: FC<IconProps> = ({
  width = 30,
  height = 30,
  name,
  isFocused
}) => {
  if (!name) {
    return (
      <View>
        <Text>X</Text>
      </View>
    );
  }

  let imagePath;

  switch (name) {
    case "home": {
      imagePath = require("../../assets/icon-img/home.png");
      break;
    }
    case "cart": {
      imagePath = require("../../assets/icon-img/cart.png");
      break;
    }
    case "favorite": {
      imagePath = require("../../assets/icon-img/favorite.png");
      break;
    }
    case "auth": {
      imagePath = require("../../assets/icon-img/auth.png");
      break;
    }
    default: {
      imagePath = require("../../assets/icon-img/invalid.png");
      break;
    }
  }

  let tintColor = "gray";

  if(isFocused) {
    tintColor = "black"
  }

  return (
    <View>
      <Image style={{ width, height, tintColor }} source={imagePath} />
    </View>
  );
};

export default Icon;
