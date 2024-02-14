import React, { FC } from "react";
import { useDispatch } from "react-redux";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  ImageBackground,
} from "react-native";

import PressableIcon from "../ui/PressableIcon";
import { Coffee } from "../../util/types";
import { updateCoffeAction } from "../../store/actions/coffee-actions";

const FavoritesList: FC<{
  coffees: Coffee[];
}> = ({ coffees }) => {
  const dispatch = useDispatch();

  const unfavoriteCoffeeHandler = (id: string, coffee: Coffee) => {
    dispatch<any>(
      updateCoffeAction(id, { ...coffee, isFavorite: !coffee.isFavorite }),
    );
  };

  return (
    <FlatList
      data={coffees}
      keyExtractor={item => item.id}
      renderItem={({ item }) => {
        return (
          <View style={styles.item}>
            <ImageBackground
              source={{ uri: item.imageUri }}
              style={styles.image}
              imageStyle={{ borderRadius: 20 }}
            >
              <Text style={styles.text}>
                {item.title} - {item.addition}
              </Text>
              <PressableIcon
                name="delete"
                onPress={unfavoriteCoffeeHandler.bind(null, item.id, item)}
                config={{
                  tintColor: "red",
                }}
              />
            </ImageBackground>
          </View>
        );
      }}
    />
  );
};

export default FavoritesList;

const styles = StyleSheet.create({
  item: {
    marginVertical: 10,
  },
  image: {
    width: "100%",
    height: 220,
    justifyContent: "space-evenly",
    alignItems: "center",
    gap: 10,
  },
  text: {
    color: "white",
    fontSize: 35,
    textAlign: "center",
  },
  button: {
    backgroundColor: "red",
    padding: 7,
    borderRadius: 10,
  },
});
