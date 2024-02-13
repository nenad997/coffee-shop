import React, { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { FlatList, StyleSheet, Text, Pressable } from "react-native";

import { CoffeeTypes } from "../../data/coffees";
import { Colors } from "../../constants/colors";
import { coffeeSliceActions } from "../../store/slices/coffee-slice";

const FilterForm: FC = () => {
  const dispatch = useDispatch();
  const [activeID, setActiveID] = useState<string>("t1");

  const pressNavItemHandler = (id: string, filter: string) => {
    setActiveID(id);
    dispatch(coffeeSliceActions.updateFilter(filter));
  };

  return (
    <FlatList
      style={styles.form}
      data={CoffeeTypes}
      horizontal={true}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <Pressable
          style={({ pressed }) => pressed && styles.pressed}
          onPress={pressNavItemHandler.bind(this, item.id, item.title)}
        >
          <Text
            style={[styles.text, activeID === item.id && styles.activeItem]}
          >
            {item.title}
          </Text>
        </Pressable>
      )}
    />
  );
};

export default FilterForm;

const styles = StyleSheet.create({
  form: {
    marginHorizontal: 15,
    marginTop: 30,
    marginBottom: 20,
  },
  text: {
    color: Colors.grayPrimary,
    marginHorizontal: 10,
    fontSize: 22,
  },
  pressed: {
    opacity: 0.7,
  },
  activeItem: {
    color: Colors.orangePrimary,
  },
});
