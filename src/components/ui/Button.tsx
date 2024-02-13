import React, { FC } from "react";
import { Text, Pressable, StyleSheet } from "react-native";

const Button: FC<{
  children: React.ReactNode;
  onPress: () => void;
  style?: any;
}> = ({ children, onPress, style }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        { ...style },
        pressed && styles.pressed,
      ]}
      onPress={onPress}
    >
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    textAlign: "center",
    color: "white",
    fontSize: 25,
  },
  pressed: {
    opacity: 0.7,
  },
});
