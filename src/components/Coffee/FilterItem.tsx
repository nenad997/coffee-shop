import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";

import { Colors } from "../../constants/colors";

const FilterItem: React.FC<{
  onPress: (id: string, title: string) => void;
  item: {
    id: string;
    title: string;
  };
  isItemActive: boolean;
}> = ({ item, onPress, isItemActive }) => {
  return (
    <Pressable
      style={({ pressed }) => pressed && styles.pressed}
      onPress={onPress.bind(this, item.id, item.title)}
    >
      <Text style={[styles.text, isItemActive && styles.activeItem]}>
        {item.title}
      </Text>
    </Pressable>
  );
};

export default FilterItem;

const styles = StyleSheet.create({
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
