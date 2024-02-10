import React, { FC } from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";

import Button from "../components/ui/Button";
import { ScreenParamList } from "../util/types";

const HomeScreen: FC<ScreenParamList> = () => {
  return (
    <View style={styles.screenContainer}>
      <View style={styles.header}>
        <Text style={styles.text}>Find the best</Text>
        <Text style={styles.text}>coffee for you</Text>
      </View>
      <View style={styles.searchForm}>
        <Button name="search" />
        <TextInput style={styles.input} placeholder="Find you coffee" />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "#140C05",
  },
  header: {
    margin: 45,
  },
  text: {
    color: "white",
    fontSize: 28,
  },
  input: {
    flex: 1,
    backgroundColor: "#A47D5B",
    margin: 10,
    borderRadius: 20,
  },
  searchForm: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 15
  }
});
