import React, { FC } from "react";
import { Pressable, StyleSheet } from "react-native";

import { CustomButtonProps } from "../../util/types";
import Icon from "./Icon";

const PressableIcon: FC<CustomButtonProps> = ({ name, onPress }) => {
  return (
    <Pressable
      style={({ pressed }) => pressed && styles.pressed}
      onPress={onPress}
    >
      <Icon name={name} />
    </Pressable>
  );
};

export default PressableIcon;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.7,
  },
});
