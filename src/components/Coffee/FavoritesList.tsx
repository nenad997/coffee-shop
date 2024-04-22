import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { FlatList } from "react-native";

import { Coffee } from "../../util/types";
import FavoriteItem from "./FavoriteItem";
import { updateCoffeAction } from "../../store/actions/coffee-actions";

const FavoritesList: FC<{
  coffees: Coffee[];
}> = ({ coffees }) => {
  const dispatch = useDispatch();

  const unfavoriteCoffeeHandler = (id: string, coffee: Coffee) => {
    dispatch<any>(
      updateCoffeAction(
        id,
        { ...coffee, isFavorite: !coffee.isFavorite },
      ),
    );
  };

  return (
    <FlatList
      data={coffees}
      keyExtractor={item => item.id}
      renderItem={({ item }) => {
        return (
          <FavoriteItem
            item={item}
            onPress={unfavoriteCoffeeHandler.bind(null, item.id, item)}
          />
        );
      }}
    />
  );
};

export default FavoritesList;
