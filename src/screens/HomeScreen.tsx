import React, { FC } from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";

import SearchForm from "../components/SearchForm";
import { ScreenParamList } from "../util/types";

const HomeScreen: FC<ScreenParamList> = () => {
  return (
    <View style={styles.screenContainer}>
      <View style={styles.header}>
        <Text style={styles.text}>Find the best</Text>
        <Text style={styles.text}>coffee for you</Text>
      </View>
      <SearchForm />
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
});
