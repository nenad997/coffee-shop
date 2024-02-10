import React from "react";
import { View, Pressable, StyleSheet } from "react-native";

import Icon from "./Icon";

const Button = ({ name, onPress }: any) => {
  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => pressed && styles.pressed}
        onPress={onPress}
      >
        <Icon name={name} />
      </Pressable>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    height: "auto",
    padding: 7,
  },
  pressed: {
    opacity: 0.7,
  },
});
