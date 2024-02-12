import React, { FC, useState } from "react";
import { FlatList, StyleSheet, Text, Pressable } from "react-native";

import { CoffeeTypes } from "../../data/coffees";
import { Colors } from "../../constants/colors";

const FilterForm: FC = () => {
  const [activeID, setActiveID] = useState<string>("t1");

  const pressItemHandler = (id: string, filter: string) => {
    setActiveID(id);
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
          onPress={pressItemHandler.bind(this, item.id, item.coffeeType)}
        >
          <Text
            style={[styles.text, activeID === item.id && styles.activeItem]}
          >
            {item.coffeeType}
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
