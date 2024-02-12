import React, { FC } from "react";
import { useSelector } from "react-redux";
import { Text, View, StyleSheet, ScrollView } from "react-native";

import { ScreenParamList } from "../util/types";
import SearchForm from "../components/SearchForm";
import CoffeeList from "../components/Coffee/CoffeeList";
import { Colors } from "../constants/colors";

const HomeScreen: FC<ScreenParamList> = () => {
  const coffees = useSelector((state: any) => state.coffee.coffees);

  return (
    <ScrollView style={styles.screenContainer}>
      <View style={styles.header}>
        <Text style={styles.text}>Find the best</Text>
        <Text style={styles.text}>coffee for you</Text>
      </View>
      <SearchForm />
      <CoffeeList coffees={coffees} />
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.screenBg,
  },
  header: {
    marginVertical: 45,
    marginLeft: 20,
  },
  text: {
    color: "white",
    fontSize: 35,
  },
});
