import React, { FC, Fragment } from "react";
import { useSelector } from "react-redux";
import { FlatList, StyleSheet, View, Text } from "react-native";

import CoffeeItem from "./CoffeeItem";
import FilterForm from "./FilterForm";
import { Coffee } from "../../util/types";
import SearchForm from "./SearchForm";

const CoffeeList: FC = () => {
  const { filteredCoffees, filter } = useSelector((state: any) => state.coffee);

  // const shownCoffees = coffees.filter(
  //   (coffee: Coffee) => coffee.title === filter,
  // );

  let listContent = (
    <FlatList
      style={styles.list}
      horizontal={true}
      data={filteredCoffees}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <CoffeeItem item={item} />}
    />
  );

  if (!filteredCoffees || filteredCoffees.length === 0) {
    listContent = (
      <View style={styles.container}>
        <Text style={styles.fallbackText}>No {filter} coffees</Text>
      </View>
    );
  }

  return (
    <Fragment>
      <SearchForm />
      <FilterForm />
      {listContent}
    </Fragment>
  );
};

export default CoffeeList;

const styles = StyleSheet.create({
  list: {
    margin: 15,
  },
  container: {
    marginTop: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    color: "white",
    fontSize: 20,
  },
});
