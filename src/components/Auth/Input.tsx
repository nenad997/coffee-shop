import React, { FC } from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";

const Input: FC<{
  label: string;
  config: any;
}> = ({ label, config }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.textInput}
        placeholderTextColor="black"
        {...config}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 15,
    paddingVertical: 3,
    gap: 10,
  },
  label: {
    color: "whitesmoke",
    fontSize: 25,
    letterSpacing: 1,
  },
  textInput: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 8
  },
});
