import React, { FC } from "react";
import { FlatList, StyleSheet } from "react-native";

import { CoffeeListProps } from "../../util/types";
import CoffeeItem from "./CoffeeItem";

const CoffeeList: FC<CoffeeListProps> = ({ coffees }) => {
  return (
    <FlatList
      style={styles.list}
      horizontal={true}
      data={coffees}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <CoffeeItem item={item} />}
    />
  );
};

export default CoffeeList;

const styles = StyleSheet.create({
  list: {
    margin: 15,
  },
});
