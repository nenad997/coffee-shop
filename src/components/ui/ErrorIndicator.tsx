import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { View, Button, Text, StyleSheet } from "react-native";

import { Colors } from "../../constants/colors";
import { getCoffees } from "../../store/actions/coffee-actions";

const ErrorIndicator: FC<{
  message: string;
}> = ({ message }) => {
  const dispatch = useDispatch();

  const reloadAppHandler = () => {
    dispatch<any>(getCoffees());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
      <View style={styles.button}>
        <Button title="Reload" onPress={reloadAppHandler} />
      </View>
    </View>
  );
};

export default ErrorIndicator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.screenBg,
  },
  text: {
    color: "red",
    textAlign: "center",
    fontSize: 20,
    marginVertical: 25,
  },
  button: {
    width: 100,
    alignSelf: "center",
  },
});
