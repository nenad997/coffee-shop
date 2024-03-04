import React, { FC, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { FlatList, StyleSheet } from "react-native";

import { CoffeeTypes } from "../../data/coffees";
import FilterItem from "./FilterItem";
import { coffeeSliceActions } from "../../store/slices/coffee-slice";

const FilterForm: FC = () => {
  const dispatch = useDispatch();
  const [activeID, setActiveID] = useState<string>("t1");

  const pressNavItemHandler = (id: string, filter: string) => {
    setActiveID(id);
    dispatch(coffeeSliceActions.filterCoffees(filter));
  };

  useEffect(() => {
    dispatch(coffeeSliceActions.filterCoffees("Cappuccino"));
  }, [dispatch]);

  return (
    <FlatList
      style={styles.form}
      data={CoffeeTypes}
      horizontal={true}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <FilterItem
          item={item}
          isItemActive={activeID === item.id}
          onPress={pressNavItemHandler}
        />
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
});
