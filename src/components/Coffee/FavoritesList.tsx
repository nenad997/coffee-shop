import React, { FC } from "react";
import { useDispatch } from "react-redux";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import PressableIcon from "../ui/PressableIcon";
import { Coffee } from "../../util/types";
import { coffeeSliceActions } from "../../store/slices/coffee-slice";

const FavoritesList: FC<{
  coffees: Coffee[];
}> = ({ coffees }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();

  const unfavoriteCoffeeHandler = (id: string) => {
    dispatch(coffeeSliceActions.toggleFavorite(id));
    if (coffees.length === 1) {
      navigation.navigate("Home");
    }
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
                onPress={unfavoriteCoffeeHandler.bind(null, item.id)}
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
