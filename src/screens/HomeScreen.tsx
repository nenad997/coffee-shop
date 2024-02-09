import React from "react";
import { Text, View, StyleSheet, Button } from "react-native";

const HomeScreen = ({ navigation }: any) => {
  return (
    <View style={styles.screenContainer}>
      <Text>Home Screen!</Text>
      <Button
        title="Click"
        onPress={() => navigation.navigate("CoffeeDetails")}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
