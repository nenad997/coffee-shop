import React, { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { TextInput, View, StyleSheet, Alert } from "react-native";

import { Colors } from "../../constants/colors";
import PressableIcon from "../ui/PressableIcon";
import { coffeeSliceActions } from "../../store/slices/coffee-slice";

const SearchForm: FC = () => {
  const [enteredText, setEnteredText] = useState("");
  const dispatch = useDispatch();

  const changeTextHandler = (text: string) => {
    setEnteredText(text);
  };

  const filterCoffeesHandler = () => {
    if (!enteredText) {
      Alert.alert("Invalid input", "Please enter a coffee!");
      return;
    }

    dispatch(coffeeSliceActions.filterCoffees(enteredText));
  };

  return (
    <View style={styles.form}>
      <View style={styles.searchButton}>
        <PressableIcon name="search" onPress={filterCoffeesHandler} />
      </View>
      <TextInput
        placeholderTextColor="gray"
        style={styles.input}
        placeholder="Find Your Coffee..."
        onChangeText={changeTextHandler}
        value={enteredText}
      />
    </View>
  );
};

export default SearchForm;

const styles = StyleSheet.create({
  form: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 5,
  },
  input: {
    flex: 1,
    backgroundColor: Colors.inputBg,
    color: "white",
    borderRadius: 10,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    padding: 10,
  },
  searchButton: {
    backgroundColor: Colors.inputBg,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    padding: 10,
  },
});
