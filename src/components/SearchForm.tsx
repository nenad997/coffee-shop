import React, { FC } from "react";
import { View, TextInput, StyleSheet } from "react-native";

import Button from "./ui/Button";

const SearchForm: FC = () => {
  return (
    <View style={styles.searchForm}>
      <Button name="search" />
      <TextInput style={styles.input} placeholder="Find you coffee" />
    </View>
  );
};

export default SearchForm;

const styles = StyleSheet.create({
  searchForm: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 15,
  },
  input: {
    flex: 1,
    backgroundColor: "#A47D5B",
    margin: 10,
    borderRadius: 20,
  },
});
